import React from 'react'
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap'

export default function AccountSetting(props) {
    return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Account Setting
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Name</h4>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Shown Username"
                                aria-label="Shown Username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="variant="primary>
                                    Save
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Body>
                        <h4>Profile Photo</h4>
                        <p>
                            Lorem
                        </p>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
    )
}
