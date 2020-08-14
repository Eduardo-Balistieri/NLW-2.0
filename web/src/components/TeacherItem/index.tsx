import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'
import api from '../../services/api'
import { useAuth } from '../../contexts/auth'


interface Schedule {
    week_day: number, from: number, to: number
}

interface TeacherScheduleList {
    id: number
    name: string
    avatar: string
    bio: string
    whatsapp: string
    cost: number
    subject: string
    schedule: Array<Schedule>
}


interface TeacherItemProps {
    teacher: TeacherScheduleList
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    const weekDays = [
        { day: 'Domingo', id: 0 },
        { day: 'Segunda', id: 1 },
        { day: 'Terça', id: 2 },
        { day: 'Quarta', id: 3 },
        { day: 'Quinta', id: 4 },
        { day: 'Sexta', id: 5 },
        { day: 'Sábado', id: 6 },
    ]



    const { user } = useAuth()

    const createNewConnection = () => {
        api.post('/connections', { user_id: user?.id })
    }

    return (
        <article className="teacher-item">
            <header>
                {teacher.avatar ?
                    <img src={teacher.avatar} alt="Foto de Perfil" /> :
                    <div className='alternative-avatar' />
                }
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <section className='teacher-main-content'>
                <p>{teacher.bio}</p>

                <ul>
                    <div className='list-title'>
                        <p>Dia</p>
                        <p>Horário</p>
                    </div>

                    {weekDays.map((weekDay, index) => {

                        const responseIndex = teacher.schedule.findIndex(scheduleItem => (
                            scheduleItem.week_day === weekDay.id)
                        )

                        if (responseIndex !== -1) {
                            const { week_day, from, to } = teacher.schedule[responseIndex]
                            return (
                                <li key={index}>
                                    <div>
                                        <p className='desktop-inside-label'>Dia</p>
                                        <p>{weekDays[week_day].day}</p>

                                        <img src={backIcon} alt="Right arrow" />

                                        <p className='desktop-inside-label'>Horário</p>
                                        <p>{Math.round(from / 60)}h - {Math.round(to / 60)}h</p>
                                    </div>
                                </li>
                            )
                        }

                        else
                            return (
                                <li key={index} className='inactive-day'>
                                    <div>
                                        <p className='desktop-inside-label'>Dia</p>
                                        <p>{weekDay.day}</p>

                                        <img src={backIcon} alt="Right arrow" />

                                        <p className='desktop-inside-label'>Horário</p>
                                        <p>-</p>
                                    </div>
                                </li>
                            )
                    })}
                </ul>
            </section>

            <footer>
                <p>
                    Preço/hora <strong>R$ {teacher.cost.toFixed(2)}</strong>
                </p>

                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={createNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}`}
                >
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem