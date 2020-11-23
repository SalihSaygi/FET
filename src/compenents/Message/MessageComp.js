import React from 'react'
import MessagingPage from './MessagingPage'
import {ContactsProvider} from '../../contexts/ContactProvider'
import {ConversationsProvider} from '../../contexts/ConversationProvider';
import {SocketIOProvider} from '../../contexts/SocketIOProvider';

export default function MessageComp() {
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
