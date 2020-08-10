import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import successCheckIcon from '../../assets/images/icons/success-check-icon.svg'

const SuccessSignup = () => {

    return (
        <div className='success-signup-container'>
            <div className='success-signup'>
                <div>
                    <img src={successCheckIcon} alt="Success check" />
                </div>
                <h1>Cadastro concluído</h1>
                <p>
                    Agora você faz parte da plataforma da Proffy.
                    <br />
                    Tenha uma ótima experiência.
                </p>

                <Link to='/'>Fazer login</Link>
            </div>
        </div>
    )
}

export default SuccessSignup