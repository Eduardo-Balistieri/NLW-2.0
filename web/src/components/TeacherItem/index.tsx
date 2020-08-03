import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem = () => {

    return (
        <article className="teacher-item">
            <header>
                <img src="https://pbs.twimg.com/profile_images/1187531758100725761/fIIVPFHn_400x400.png" alt="Foto de Perfil" />
                <div>
                    <strong>Eduardo Balistieri</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, earum.
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, perferendis placeat voluptatum voluptates ipsam repellat aliquid doloribus officia unde harum explicabo, nihil quas quisquam, alias adipisci praesentium nemo facilis tempore?
            </p>

            <footer>
                <p>
                    Preço/hora <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem