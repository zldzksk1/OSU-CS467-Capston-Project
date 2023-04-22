import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const AlertQuizTaken = ({ quizTaken, setQuizTaken }) => {
    const toggleSetAlert = () => {
        setQuizTaken(!quizTaken);
    }
    
    return (
        <Modal
            show={quizTaken}
            onHide={toggleSetAlert}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Uh oh!</h3>
                <p>Looks like you have already taken this quiz. Please close the browser and contact the owner of the quiz to send you a new one.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant='danger'
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertQuizTaken;