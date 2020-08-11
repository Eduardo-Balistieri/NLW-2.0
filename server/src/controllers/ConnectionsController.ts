import { Request, Response } from 'express'
import db from '../database/connection'

import jwt from 'jsonwebtoken'
import { secret } from '../config/JWT'


export default class ConnectionsController {

    async index(req: Request, res: Response) {
        const totalConnections = await db('connections').count('* as total')
        const { total } = totalConnections[0]

        return res.json({ total })
    }


    async create(req: Request, res: Response) {

        const token = req.headers['authorization']

        if (!token)
            return res.status(401).send({ error: 'No token provided.' })

        jwt.verify(token as string, secret, async (err, _) => {
            if (err)
                return res.status(500).send({ error: 'Failed to authenticate token.' })

            const { user_id } = req.body
            await db('connections').insert({ user_id })

            return res.status(201).send()
        })
    }
}