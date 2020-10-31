import React, { useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const SocketIOContext = React.createContext()

export function useSocket() {
    return useContext(SocketIOContext)
}

export function SocketIOProvider({children}) {
    const [socket, setSocket] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        
        async function fetchId() {
            const req = await axios.get('/users/:id')
            id = req.user._id
            setId(id)
            return id
        }

        

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