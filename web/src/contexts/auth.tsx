import React, { createContext, useState, useContext } from 'react'
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
    signIn(email: string, password: string): any
    signOut(): void
}


const AuthContext = (
    createContext<AuthContextData>({} as AuthContextData)
)


export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)

    const signIn = (email: string, password: string) => {
        api.get('/login', {
            params: {
                email,
                password
            }
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                return error
            })
    }

    const signOut = () => {
        setUser(null)
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
