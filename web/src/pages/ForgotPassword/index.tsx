import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import DynamicInput from '../../components/DynamicInput'
import backIcon from '../../assets/images/icons/back.svg'
import './styles.css'


const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [invalid, setInvalid] = useState(false)


    const areInputsValid = () => {
        if (!email.trim())
            return false

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isEmailValid = regex.test(String(email).toLowerCase())

        if (!isEmailValid)
            return false
        return true
    }


    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!areInputsValid()) {
            setInvalid(true)
            return
        }
    }


    return (
        <div id='forgot-password-page'>
            <div className='forgot-password-form-wrapper'>

                <Link to='/' className='back-button'>
                    <img src={backIcon} alt="Go back" />
                </Link>

                <form className='forgot-password-form' onSubmit={handleFormSubmit}>
                    <div className='main-forgot-password'>
                        <h2>Eita, esqueceu sua senha?</h2>
                        <p>Não esquenta, vamos dar um jeito nisso.</p>
                    </div>

                    <DynamicInput
                        type='text'
                        label='E-mail'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    {invalid && (
                        <div className='invalid-information'>
                            <p>Insira um e-mail válido.</p>
                        </div>
                    )}

                    <button type='submit' className='forgot-password-button'>Enviar</button>
                </form>
            </div>


            <div className='forgot-password-page-logo'>
                <div>
                    <img src={logoImg} alt='Proffy logo' />
                    <p>Sua plataforma de estudos online.</p>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword