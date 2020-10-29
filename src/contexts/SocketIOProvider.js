import React, { useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketIOProvider({children}) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query: { id } }
        )
        async function fetchId() {
            const req = await axios.get('/users/:id')
            req.user.messageID = newSocket
        }
        setSocket(fetchId())

        return () => newSocket.close()
    }, [])

    return (
        <SocketIOContext.Provider value={socket}>
            {children}
        </SocketIOContext.Provider>
    )
}