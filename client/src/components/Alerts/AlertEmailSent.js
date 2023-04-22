import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';

const AlertEmailSent = ({ alert, setShowAlert, confirmMessage }) => {
    const navigate = useNavigate();

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
            <Modal.Body>
                {confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant='danger'
                    onClick={() => navigate('/')}
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertEmailSent