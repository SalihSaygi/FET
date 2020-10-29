import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactProvider'

export default function Contacts() {
    const { contacts } = useContacts()

    return (
        <ListGroup variant="flush">
            {contacts.map((contact, index) => (
                 <ListGroup.Item 
                 key={index}
                 action
                 >
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
} 