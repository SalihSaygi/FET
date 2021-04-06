import React, { useContext, useState, useEffect,  } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketIOProvider';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const { socketItem, idItem } = useSocket()
  const [socket, setSocket] = socketItem;
  const [id, setId] = idItem;
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [selectedContactsIndex, setSelectedContactsIndex] = useState(0)

  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}