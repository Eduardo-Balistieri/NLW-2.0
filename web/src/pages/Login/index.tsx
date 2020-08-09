import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import purpleHeart from '../../assets/images/icons/purple-heart.svg'
import DynamicInput from '../../components/DynamicInput'
import './styles.css'
import api from '../../services/api'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = (event: FormEvent) => {
        event.preventDefault()

        api.get('/login', {
            params: {
                email,
                password
            }
        })
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
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
                            <input type='checkbox' className='checkbox' />
                            <p>Lembrar-me</p>
                        </div>

                        <Link to='/'>Esqueci minha senha</Link>
                    </div>

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