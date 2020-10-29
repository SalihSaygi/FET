import React from 'react'
import { useConversations } from '../../contexts/ConversationProvider'
import { useContacts } from '../../contexts/ContactProvider'
import OpenContact from './OpenContact'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

export default function Dashboard({id}) {
    const { selectedConversation } = useConversations()
    const { selectedContact } = useContacts()

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={id} />
            { selectedConversation && <OpenConversation />}
            { selectedContact && <OpenContact/> }
        </div>
    )
}