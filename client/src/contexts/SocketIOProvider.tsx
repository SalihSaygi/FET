import React, { ReactNode, useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3031/users',
    responseType: 'json'
})

const SocketIOContext = React.createContext(null)

export function useSocket() {
    return useContext(SocketIOContext)
}

interface Props {
    name: string,
    children: ReactNode
}

export const SocketIOProvider: React.FC<Props> = ({}) => {
    const [socket, setSocket] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        
        api.get('/:id')
        .then(res => res.data.user._id)
        
        const newSocket = io(
            'http://localhost:3050',
            { query: { id } }
        )

        setSocket(newSocket)

        return () => newSocket.close()
    }, [])

    return (
        <SocketIOContext.Provider value={{ socket: [socket, setSocket], id: [id, setId] }}>
            {children}
        </SocketIOContext.Provider>
    )
}