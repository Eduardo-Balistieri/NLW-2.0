import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'


const TeacherList = () => {

    const [teachers, setTeachers] = useState([])

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
        setTeachers(response.data)
    }


    return (
        <div id="page-teacher-list" className="container" onSubmit={searchTeachers}>
            <PageHeader title="Esses são os proffys disponíveis.">

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
                {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}

export default TeacherList
