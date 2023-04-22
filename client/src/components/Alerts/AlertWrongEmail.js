import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const AlertWrongEmail = ({ alert, setShowAlert, confirmMessage, wrongEmailArr }) => {
    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Modal
            show={alert}
            onHide={toggleSetAlert}
            backdrop="static"
            keyboard={false}
            
        >
            <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            {wrongEmailArr.map((email, index) => (
                <Modal.Body key={index}>
                    {email + confirmMessage}
                </Modal.Body>
            ))}
                <Modal.Footer>
                    <Button 
                        variant='danger'
                        onClick={toggleSetAlert}
                    >
                        OK
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default AlertWrongEmail