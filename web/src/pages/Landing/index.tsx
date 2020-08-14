import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './styles.css'
import api from '../../services/api'
import { useAuth } from '../../contexts/auth'


const Lading = () => {

    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections')
            .then(response => {
                const { total } = response.data
                setTotalConnections(total)
            })
    }, [])

    const { user, signOut } = useAuth()
    const avatar = user?.avatar

    return (
        <div id="page-landing">
            <header className='page-landing-header'>
                <Link to='/user-settings' className='user-info-wrapper'>
                    {avatar ? <img src={avatar} alt="User avatar" /> : <div className='alternative-profile' />}
                    <p>{user?.name}</p>
                </Link>

                <div onClick={signOut}>
                    <p>Sair</p>
                </div>
            </header>

            <div id="page-landing-content" className="container">

                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online</h2>
                </div>

                <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    {totalConnections > 1 ?
                        `Total de ${totalConnections} conexões já realizadas` :
                        `Total de ${totalConnections} conexão já realizada`
                    }
                    <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>

            </div>
        </div>
    )
}

export default Lading
