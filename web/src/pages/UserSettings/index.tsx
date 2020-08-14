import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'



const UserSettings = () => {

    const history = useHistory()

    const { user, updateUser } = useAuth()
    const [invalid, setInvalid] = useState(false)


    const fullName = user?.name
    const index = fullName?.indexOf(' ') as number
    const [name, setName] = useState(fullName?.slice(0, index))
    const [surname, setSurname] = useState(fullName?.slice(index + 1, fullName.length))

    const [email, setEmail] = useState(user?.email as string)
    const [bio, setBio] = useState(user?.bio || '')
    const [whatsapp, setWhatsapp] = useState(user?.whatsapp || '')
    const [avatar] = useState(user?.avatar || null)


    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [schedules, setSchedules] = useState([{ from: '10:00', to: '15:00', week_day: 1 }])



    const createSchedule = (event: any) => {
        event.preventDefault()
        const newState = [...schedules]
        newState.unshift({ from: '', to: '', week_day: 1 })
        setSchedules(newState)
    }

    const deleteSchedule = (index: number) => {
        const newState = schedules.filter((_, idx) => idx !== index)
        setSchedules(newState)
    }

    const updateSchedule = (event: any, index: number, field: string) => {
        const newState = [...schedules]
        newState[index] = { ...newState[index], [field]: event.target.value }
        setSchedules(newState)
    }




    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const error = await updateUser(email, `${name} ${surname}`, whatsapp, bio)

        if (error) {
            console.log(error)
            setInvalid(true)
        }

        api.post('/classes', {
            email,
            subject,
            cost,
            schedule: schedules
        })
            .then(res => {
                history.push('/')
            })
            .catch(err => {
                console.log(err.response.data.error)
                setInvalid(true)
            })
    }


    return (
        <div className='user-settings-page'>
            <PageHeader actualPage='Meu perfil' />

            <div className='settings-wrapper'>
                <div className='main-user-container'>
                    {avatar ? <img src={avatar} alt="User avatar" /> : <div className='avatar-field' />}
                    <p>{fullName}</p>
                </div>

                <form className='user-settings-form' onSubmit={handleFormSubmit}>

                    <fieldset className='user-settings-fieldset'>
                        <div className='fields-label'>
                            <h2>Seus dados</h2>
                        </div>
                        <div>
                            <div className="input-block-50-50-desktop">
                                <Input
                                    label='Nome'
                                    name='name'
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <Input
                                    label='Sobrenome'
                                    name='surname'
                                    value={surname}
                                    onChange={event => setSurname(event.target.value)}
                                />
                            </div>
                            <div className='input-block-60-40-desktop'>
                                <Input
                                    label='E-mail'
                                    name='email'
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                <Input
                                    label='Whatsapp'
                                    name='whatsapp'
                                    value={whatsapp}
                                    onChange={event => setWhatsapp(event.target.value)}
                                />
                            </div>
                            <Textarea
                                label='Biografia'
                                name='bio'
                                value={bio}
                                onChange={event => setBio(event.target.value)}
                            />
                        </div>

                        <div className='fields-label'>
                            <h2>Sobre a aula</h2>
                        </div>
                        <div className='input-block-60-40-desktop'>
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
                                label='Custo da sua hora por aula'
                                name='cost'
                                value={cost}
                                onChange={event => setCost(event.target.value)}
                            />
                        </div>

                        <div className='fields-label-divided'>
                            <h2>Horários disponíveis</h2>
                            <button
                                onClick={createSchedule}>
                                + Novo
                            </button>
                        </div>

                        {schedules.map((schedule, index) => (
                            <div key={index}>
                                <div className='input-block-55-45-desktop'>
                                    <Select
                                        label="Dia da semana"
                                        name="week_day"
                                        value={schedule.week_day}
                                        onChange={(event) => updateSchedule(event, index, 'week_day')}
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
                                    <div className="input-block-50-50-mobile">
                                        <Input
                                            label='Das'
                                            name='from'
                                            value={schedule.from}
                                            onChange={(event) => updateSchedule(event, index, 'from')}
                                        />
                                        <Input
                                            label='Até'
                                            name='to'
                                            value={schedule.to}
                                            onChange={(event) => updateSchedule(event, index, 'to')}
                                        />
                                    </div>
                                </div>
                                <div
                                    className='delete-hour'
                                    onClick={() => deleteSchedule(index)}
                                >
                                    <span>Excluir horário</span>
                                </div>
                            </div>
                        ))}
                        {invalid && (
                            <div className='invalid-information'>
                                <p>Ocorreu um erro salvando as novas informação.</p>
                            </div>
                        )}
                    </fieldset>

                    <footer className='form-footer'>
                        <div>
                            <img src={warningIcon} alt="Aviso importante" />
                            <p>
                                <span>Importante!</span> <br />
                                Preencha todos os dados corretamente
                            </p>
                        </div>

                        <button type='submit' className='save-button'>Salvar alterações</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default UserSettings