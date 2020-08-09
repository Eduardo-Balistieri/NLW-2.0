import React, { InputHTMLAttributes, useState } from 'react'

import './styles.css'


interface DynamicInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string
    label: string
}

const DynamicInput: React.FC<DynamicInputProps> = ({ type, label, ...rest }) => {

    const [touched, setTouched] = useState(false)

    return (
        <div className="dynamic-input-block">

            <input {...rest}
                type={type}
                onFocus={() => setTouched(true)}
            />

            <span className={touched ? 'placeholder dynamic-block-touched' : 'placeholder'}>
                {label}
            </span>

        </div>
    )
}

export default DynamicInput