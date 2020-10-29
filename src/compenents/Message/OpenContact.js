import React, { useState, useCallback} from 'react'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactProvider'

export default function OpenContact(props) {
    const [requestMessage, setRequestMessage] = useState('')
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [] )
    const {sendFriendRequest, selectedContacts } = useContacts()

    function handleSubmit(e) {
        e.preventDefault()

        e.target.reset()

        sendFriendRequest(
            selectedContacts.map(contact => contact.id),
            requestMessage
        )
        setRequestMessage('')
    }

    const [modalShow, setModalShow] = useState(false);
    
    return (
        <>
          <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <ContactPopUp
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function ContactPopUp(props) {
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
    )
}
