import React from 'react'
import MessagingPage from './MessagingPage'
import {ContactsProvider, useContacts} from '../../contexts/ContactProvider'
import {ConversationsProvider} from '../../contexts/ConversationProvider';
import {SocketIOProvider} from '../../contexts/SocketIOProvider';
import useLocalStorage from '../../hooks/useLocalStorage'

export default function MessageComp() {

    const [id, setId] = useLocalStorage('id')
    const [contact, setContact] = useContacts()
    const [message, setMessage] = useLocalStorage('messages')

    return (
        <div>
            <SocketIOProvider>
                <ContactsProvider>
                <ConversationsProvider>
                    <MessagingPage/>
                </ConversationsProvider>
                </ContactsProvider>
            </SocketIOProvider>
        </div>
    )
}
