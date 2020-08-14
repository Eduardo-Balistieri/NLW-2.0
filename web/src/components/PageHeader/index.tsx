import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import proffyLogo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import './styles.css'

interface PageHeaderProps {
    actualPage: string
    title?: string
    description?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actualPage, children }) => {

    const history = useHistory()

    return (
        <header className="page-header">
            <div className='header'>
                <div className='header-back-button' onClick={() => history.goBack()}>
                    <img src={backIcon} alt="Go back" />
                </div>

                <div className='actual-page'>
                    <p>{actualPage}</p>
                </div>

                <Link to='/' className='header-proffy-logo'>
                    <img src={proffyLogo} alt="Logo" />
                </Link>
            </div>

            {title &&
                <div className="header-content">
                    <strong>{title}</strong>
                    {description && <p>{description}</p>}

                    {children}
                </div>
            }
        </header>
    )
}

export default PageHeader