import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'


interface User {
    id: number
    email: string
    name: string
    avatar: string
    whatsapp: string
    bio: string
}

interface AuthContextData {
    signed: boolean
    user: User | null
    token: string
    signIn(email: string, password: string, rememberPassword: boolean): Promise<string>
    signOut(): void
    updateUser(email: string, name: string, whatsapp: string, bio: string): Promise<string>
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
            api.defaults.headers['authorization'] = storagedToken
            setUser(JSON.parse(storagedUser))
            setToken(storagedToken)
        }
    }, [])


    const signIn = async (email: string, password: string, rememberPassword: boolean) => {
        const error = await api.get('/login', {
            params: {
                email,
                password
            }
        })
            .then(response => {
                const { user, token } = response.data
                api.defaults.headers['authorization'] = token

                if (rememberPassword) {
                    localStorage.setItem('Auth:User', JSON.stringify(user))
                    localStorage.setItem('Auth:Token', token)
                }
                setUser(user)
                setToken(token)
            })
            .catch(error => {
                error = error.response.data.error
                return error
            })
        return error
    }


    const signOut = () => {
        setUser(null)
        localStorage.removeItem('Auth:User')
        setToken('')
        localStorage.removeItem('Auth:Token')
    }


    const updateUser = async (email: string, name: string, whatsapp: string, bio: string) => {
        const error = await api.post('/update-user', {
            email,
            name,
            whatsapp,
            bio
        })
            .then(response => {
                const responseUser = JSON.parse(response.config.data)

                const newUser = { ...user, ...responseUser }
                localStorage.setItem('Auth:User', JSON.stringify(newUser))
                setUser(newUser)
            })
            .catch(error => {
                error = error.response.data.error
                return error
            })
        return error
    }


    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            token,
            signIn,
            signOut,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}
