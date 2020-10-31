import React, { useState, useCallback} from 'react'
import  from '@material-ui/core/'
import { useContacts } from '../../contexts/ContactProvider'

export default function OpenContact(props) {
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [] )
    const {selectedContacts, setSelectedContacts } = useContacts()

    const [modalShow, setModalShow] = useState(false);
    
    const photoUrl = values.user._id
              ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto'

    return (
        <>
            <Navbar/>
            <div className="profileInfo">
                <img src="img_avatar.png" alt="Profile Picture">
            <div/>
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
