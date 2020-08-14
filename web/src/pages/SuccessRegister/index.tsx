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
                <h1>Cadastro salvo!</h1>
                <p>
                    Tudo certo, seu cadastro está na nossa lista de professores.
                    <br />
                    Agora é só ficar de olho no seu WhatsApp.
                </p>

                <Link to='/study'>Acessar</Link>
            </div>
        </div>
    )
}

export default SuccessSignup