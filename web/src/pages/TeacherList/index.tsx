import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'


export interface Teacher {
    id: number
    name: string
    avatar: string
    bio: string
    whatsapp: string
    cost: number
    subject: string
    week_day: number,
    from: number,
    to: number,
}


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



const TeacherList = () => {

    const [teachers, setTeachers] = useState<Array<TeacherScheduleList>>([])

    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')


    const searchTeachers = async (event: FormEvent) => {
        event.preventDefault()

        if (!(subject && weekDay && time))
            return

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        })

        const teachers: Array<TeacherScheduleList> = []

        response.data.forEach((schedule: Teacher) => {

            const { avatar, bio, cost, id, name, subject, from, to, week_day } = schedule
            const index = teachers.findIndex(teacherSchedule => teacherSchedule?.id === id)

            if (index === -1) {
                const teacherInformation = { id, subject, name, avatar, bio, cost }
                const classInfo = { from, to, week_day }

                teachers.push({ ...teacherInformation, schedule: [classInfo] } as TeacherScheduleList)
            }

            else {
                const classInfo = { from, to, week_day }
                teachers[index] = {
                    ...teachers[index],
                    schedule: [...teachers[index].schedule, classInfo]
                }
            }
        })

        setTeachers(teachers)
    }


    return (
        <div id="page-teacher-list" className="container" onSubmit={searchTeachers}>
            <PageHeader actualPage='Estudar' title="Esses são os proffys disponíveis.">

                <form id="search-teachers">

                    <Select
                        label="Matéria"
                        name="subject"
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'História', label: 'História' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Português', label: 'Português' }
                        ]}
                    />
                    <Select
                        label="Dia da semana"
                        name="week_day"
                        value={weekDay}
                        onChange={event => setWeekDay(event.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-Feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />
                    <Input
                        label="Hora"
                        name="time"
                        type="time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>

            </PageHeader>

            <main>
                {!teachers.length &&
                    <div className='no-teachers-found'>
                        <p>Nenhum professor encontrado com sua pesquisa.</p>
                    </div>}

                {teachers.map((teacher: TeacherScheduleList) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}

export default TeacherList
