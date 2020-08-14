import { Request, Response } from 'express'

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'
import jwt from 'jsonwebtoken'
import { secret } from '../config/JWT'



interface ScheduleItem {
    week_day: number
    from: string
    to: string
}


export default class ClassesController {

    async index(req: Request, res: Response) {
        const filters = req.query

        const week_day = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        if (!week_day.trim() || !subject.trim() || !time.trim())
            return res.status(400).json({ error: 'Missing filters to search classes' })


        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .leftJoin('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
            .leftJoin('users', 'classes.user_id', '=', 'users.id')
            .select([
                'classes.subject', 'classes.cost',
                'class_schedule.week_day', 'class_schedule.from', 'class_schedule.to',
                'users.id', 'users.name', 'users.whatsapp', 'users.avatar', 'users.bio'
            ])


        res.json(classes)
    }



    async create(req: Request, res: Response) {

        const { email, subject, cost, schedule } = req.body

        if (!email.trim() || !subject.trim() || !cost.trim())
            return res.status(400).json({ error: 'Missing information.' })

        const token = req.headers['authorization']
        if (!token)
            return res.status(401).send({ error: 'No token provided.' })

            
        jwt.verify(token as string, secret, async (err, _) => {
            if (err)
                return res.status(500).send({ error: 'Failed to authenticate token.' })

            const trx = await db.transaction()
            try {
                const user = await trx('users').where({ email }).select() // check if user exists
                if (!user)
                    res.status(401).send('This user doesn\'t exists')
                const user_id = user[0].id

                const insertedClassesIds = await trx('classes').insert({ subject, cost, user_id })

                const class_id = insertedClassesIds[0]
                const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                    return {
                        class_id,
                        week_day: scheduleItem.week_day,
                        from: convertHourToMinutes(scheduleItem.from),
                        to: convertHourToMinutes(scheduleItem.to)
                    }
                })

                await trx('class_schedule').insert(classSchedule)

                await trx.commit()
                res.status(201).send()
            }
            catch (error) {
                await trx.rollback()
                res.status(400).json({ error: 'Unexpected error while creating new class' })
            }
        })
    }

}