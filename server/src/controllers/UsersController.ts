import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connection'

import { validateEmail } from '../utils/validateEmail'
import jwt from 'jsonwebtoken'
import { secret } from '../config/JWT'


const saltRounds = 10

class UsersController {

    async index(req: Request, res: Response) {

        const userInfo = req.query

        const informedEmail = userInfo.email as string
        const informedPassword = userInfo.password as string

        if (!informedEmail.trim() || !informedPassword.trim())
            return res.status(400).json({ error: 'Missing user informations' })


        const isEmailValid = validateEmail(informedEmail)
        if (!isEmailValid)
            return res.status(400).json({ error: 'Invalid e-mail' })

        const user = await db('users')
            .where({
                email: informedEmail
            })
            .select()
        if (!user.length)
            return res.status(400).json({ error: 'This user doesnt\'t exist' })


        bcrypt.compare(informedPassword, user[0].password, (err, isCorrect) => {
            if (err)
                return res.status(500).send()

            const { email, name, avatar, whatsapp, bio, id } = user[0]

            if (isCorrect) {
                const token = jwt.sign({ id }, secret)
                return res.json({
                    user: { email, name, avatar, whatsapp, bio, id },
                    token
                })
            }
            else
                return res.status(400).json({ error: 'Invalid user informations' })
        })
    }



    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        if (!name || !email || !password)
            return res.status(400).json({ error: 'Missing user informations' })


        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err)
                return res.status(500).send()

            const existentUser = await db('users').where({ email }).select()   // checking if user already exists
            if (existentUser.length)
                return res.status(400).json({ error: 'User already exists' })

            const trx = await db.transaction()

            try {
                await trx('users').insert({ name, email, password: hash })
                await trx.commit()
                return res.status(201).send()
            }
            catch (error) {
                await trx.rollback()
                res.status(400).json({ error: 'Unexpected error while creating an user' })
            }
        })
    }



    async update(req: Request, res: Response) {
        const { name, email, whatsapp, bio } = req.body

        
        if (!name.trim() || !email.trim() || !whatsapp.trim() || !bio.trim())
        return res.status(400).json({ error: 'Missing user informations' })
        
        const token = req.headers['authorization']
        if (!token)
            return res.status(401).send({ error: 'No token provided.' })

        const isEmailValid = validateEmail(email)
        if (!isEmailValid)
            return res.status(400).json({ error: 'Invalid e-mail' })


        jwt.verify(token, secret, async (err, _) => {
            if (err)
                return res.status(500).send({ error: 'Failed to authenticate token.' })

            const trx = await db.transaction()
            try {
                await trx('users')
                    .where({
                        email
                    })
                    .update({ name, email, whatsapp, bio })
                await trx.commit()
                return res.status(201).send()
            }
            catch (error) {
                await trx.rollback()
                res.status(400).json({ error: 'Unexpected error while creating an user' })
            }
        })
    }
}

export default UsersController