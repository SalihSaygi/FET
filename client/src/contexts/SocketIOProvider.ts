import React, { useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3031/users',
    responseType: 'json'
})

const SocketIOContext = React.createContext()

export function useSocket() {
    return useContext(SocketIOContext)
}

export function SocketIOProvider({name, children}) {
    const [socket, setSocket] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        
        api
        .get('/:id')
        .then(res => res.user._id)
        

        

        const newSocket = io(
            'http://localhost:5000',
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