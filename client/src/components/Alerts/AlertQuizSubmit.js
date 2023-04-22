import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';

const AlertQuizSubmit = ({ confirmMessage, alert, setShowAlert, submitTest }) => {
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
			<Modal.Header closeButton={!submitTest ? false : true}>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{confirmMessage}
			</Modal.Body>
            {!submitTest ? (
                <Modal.Footer>
                    <Button 
                        variant='danger'
                        onClick={() => navigate('/')}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            ) : (
                <Modal.Footer>
                    <Button variant='secondary' onClick={toggleSetAlert}>Cancel</Button>
                    <Button variant="danger" onClick={submitTest}>Confirm</Button>
                </Modal.Footer>
            )}
		</Modal>
    )
}

export default AlertQuizSubmit;