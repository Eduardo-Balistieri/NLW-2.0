import React, { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import DynamicInput from '../../components/DynamicInput'
import backIcon from '../../assets/images/icons/back.svg'
import './styles.css'
import api from '../../services/api'


const Signup = () => {

    const history = useHistory()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [invalid, setInvalid] = useState(false)


    const areInputsValid = () => {
        if (!name.trim() || !surname.trim() || !email.trim() || !password.trim())
            return false
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(String(email).toLowerCase())
    }


    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!areInputsValid()) {
            setInvalid(true)
            return
        }

        await api.post('/signup', {
            name: `${name} ${surname}`,
            email,
            password
        })
            .then(response => {
                history.push('/success-signup')
                setInvalid(false)
            })
            .catch(error => {
                console.log(error)
                setInvalid(true)
            })
    }


    return (
        <div id='signup-page'>
            <div className='signup-form-wrapper'>

                <Link to='/' className='signup-back-button'>
                    <img src={backIcon} alt="Go back" />
                </Link>

                <form className='signup-form' onSubmit={handleFormSubmit}>
                    <div className='main-options-signup'>
                        <h2>Cadastro</h2>
                        <p>Preencha os dados abaixo para começar.</p>
                    </div>

                    <div className='signup-inputs-container'>
                        <div className='divided-input'>
                            <DynamicInput
                                type='text'
                                label='Nome'
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            <DynamicInput
                                type='text'
                                label='Sobrenome'
                                value={surname}
                                onChange={event => setSurname(event.target.value)}
                            />
                        </div>
                        <DynamicInput
                            type='text'
                            label='E-mail'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <DynamicInput
                            type='password'
                            label='Senha'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>

                    {invalid && (
                        <div className='invalid-information'>
                            <p>Dados inválidos para cadastro.</p>
                        </div>
                    )}

                    <button type='submit' className='signup-button'>Concluir cadastro</button>
                </form>
            </div>

            <div className='signup-page-logo'>
                <div>
                    <img src={logoImg} alt='Proffy logo' />
                    <p>Sua plataforma de estudos online.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup