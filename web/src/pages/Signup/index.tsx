import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import DynamicInput from '../../components/DynamicInput'
import backIcon from '../../assets/images/icons/back.svg'
import './styles.css'


const Signup = () => {

    return (
        <div id='signup-page'>
            <div className='signup-form-wrapper'>

                <Link to='/' className='signup-back-button'>
                    <img src={backIcon} alt="Go back" />
                </Link>

                <div className='signup-form'>
                    <div className='main-options-signup'>
                        <h2>Cadastro</h2>
                        <p>Preencha os dados abaixo para começar.</p>
                    </div>

                    <div className='signup-inputs-container'>
                        <div className='divided-input'>
                            <DynamicInput
                                type='text'
                                label='Nome'
                            />
                            <DynamicInput
                                type='text'
                                label='Sobrenome'
                            />
                        </div>
                        <DynamicInput
                            type='text'
                            label='E-mail'
                        />
                        <DynamicInput
                            type='password'
                            label='Senha'
                        />
                    </div>

                    <button className='signup-button'>Concluir cadastro</button>
                </div>
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