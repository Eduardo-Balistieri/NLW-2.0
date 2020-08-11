import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'


interface User {
    email: string
    name: string
    avatar: string
    whatsapp: string
    bio: string
}

interface AuthContextData {
    signed: boolean
    user: User | null
    signIn(email: string, password: string, rememberPassword: boolean): any
    signOut(): void
}


const AuthContext = (
    createContext<AuthContextData>({} as AuthContextData)
)

export const AuthProvider: React.FC = ({ children }) => {


    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string>('')


    useEffect(() => {
        const storagedUser = localStorage.getItem('Auth:User')
        const storagedToken = localStorage.getItem('Auth:Token')

        if (storagedUser && storagedToken) {
            api.defaults.headers['authorization'] = `Bearer ${storagedToken}`
            setUser(JSON.parse(storagedUser))
            setToken(storagedToken)
        }
    }, [])


    const signIn = (email: string, password: string, rememberPassword: boolean) => {
        api.get('/login', {
            params: {
                email,
                password
            }
        })
            .then(response => {
                const { user, token } = response.data
                api.defaults.headers['authorization'] = `Bearer ${token}`

                if (rememberPassword) {
                    localStorage.setItem('Auth:User', JSON.stringify(user))
                    localStorage.setItem('Auth:Token', token)
                }

                setUser(user)
                setToken(token)
            })
            .catch(error => {
                return error
            })
    }

    const signOut = () => {
        setUser(null)
        setToken('')

        localStorage.removeItem('Auth:User')
        localStorage.removeItem('Auth:Token')
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}
