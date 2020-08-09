import { Request, Response } from 'express'
import db from '../database/connection'


export default class UsersController {

    async index(req: Request, res: Response) {

        const userInfo = req.query

        const email = userInfo.email as string
        const password = userInfo.password as string

        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing user informations'
            })
        }

        const user = await db('users')
            .where({
                email: email,
                password: password
            })
            .select('name', 'email')

        if (user.length)
            return res.json(user)

        return res.status(400).json({
            error: 'Invalid user informations'
        })
    }



    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Missing user informations'
            })
        }

        const user = await db('users').where({
            email: email,
            password: password
        }).select()

        if (user.length) {
            return res.status(400).json({
                error: 'User already exists'
            })
        }


        const trx = await db.transaction()

        try {
            await trx('users').insert({ name, email, password })
            await trx.commit()
            return res.status(201).send()
        }
        catch (error) {
            await trx.rollback()

            res.status(400).json({
                error: 'Unexpected error while creating an user'
            })
        }
    }

}
