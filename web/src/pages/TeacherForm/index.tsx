import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'


const TeacherForm = () => {


    const history = useHistory()


    // user informations
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    // class and cost
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    // schedule
    const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }])


    const addNewScheduleItem = () => {
        setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
    }

    
    const handleCreateClass = (event: FormEvent) => {
        event.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
            .then(() => history.push('/'))
            .catch(error => console.log(error))
    }


    const setScheduleItemValue = (key: number, field: string, value: string) => {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === key)
                return { ...scheduleItem, [field]: value }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            label="Nome completo"
                            name="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />

                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={event => setAvatar(event.target.value)}
                        />
                        <Input
                            label="Whatsapp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />
                        <Textarea
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={event => setBio(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
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
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            value={cost}
                            onChange={event => setCost(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                           <button type="button" onClick={addNewScheduleItem}> + Novo Horário </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div className="schedule-item" key={index}>
                                    <Select
                                        label="Dia da semana"
                                        name="week_day"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                                        label="Das"
                                        name="from"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}

                                    />
                                    <Input
                                        label="Até"
                                        name="to"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os campos
                         </p>

                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>

            </main>
        </div>
    )
}

export default TeacherForm