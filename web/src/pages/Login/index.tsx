import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import purpleHeart from '../../assets/images/icons/purple-heart.svg'
import DynamicInput from '../../components/DynamicInput'
import './styles.css'

// hooks
import { useAuth } from '../../contexts/auth'


const Login = () => {

    const { signIn } = useAuth()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [invalid, setInvalid] = useState(false)
    const [rememberPassword, setRememberPassword] = useState(false)


    const areInputsValid = () => {
        if (!email.trim() || !password.trim())
            return false

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isEmailValid = regex.test(String(email).toLowerCase())

        if (!isEmailValid)
            return false
        return true
    }


    const handleLogin = (event: FormEvent) => {
        event.preventDefault()

        if (!areInputsValid()) {
            setInvalid(true)
            return
        }
        const error = signIn(email, password, rememberPassword)
        if (error) {
            console.log(error)
            setInvalid(true)
        }
    }

    return (
        <div id='login-page'>

            <div className='login-page-logo'>
                <div>
                    <img src={logoImg} alt='Proffy logo' />
                    <p>Sua plataforma de estudos online.</p>
                </div>
            </div>

            <form className='login-form-wrapper' onSubmit={handleLogin}>
                <div className='login-form'>

                    <div className='main-options-login'>
                        <h2>Fazer login</h2>
                        <Link to='/signup'>Criar uma conta</Link>
                    </div>

                    <div className='login-inputs-container'>
                        <DynamicInput
                            type='text'
                            label='E-mail'
                            onChange={event => setEmail(event.target.value)}
                        />
                        <DynamicInput
                            type='password'
                            label='Senha'
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>

                    <div className='password-options'>
                        <div className='remember-password'>
                            <input
                                type='checkbox'
                                className='checkbox'
                                onClick={() => setRememberPassword(!rememberPassword)}
                            />
                            <p>Lembrar-me</p>
                        </div>

                        <Link to='/forgot-password'>Esqueci minha senha</Link>
                    </div>

                    {invalid && (
                        <div className='invalid-information'>
                            <p>Sua conta ou senha está incorreta.</p>
                        </div>
                    )}

                    <button type='submit' className='login-button'>
                        Entrar
                    </button>
                </div>

                <footer className='desktop-footer'>
                    <p>Não tem conta ? <Link to='/signup'>Cadastre-se</Link></p>
                    <p>É de graça <img src={purpleHeart} alt="Purple heart" /></p>
                </footer>
            </form>
        </div>
    )
}

export default Login