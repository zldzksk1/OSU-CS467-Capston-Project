import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const AlertTimeLeft = ({ confirmMessage, alert, setShowAlert, time }) => {
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
			<Modal.Header closeButton>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{confirmMessage}
			</Modal.Body>
            {time === 5 || time === 1 ? (
                <Modal.Footer>
                    <Button variant='danger' onClick={toggleSetAlert}>OK</Button>
                </Modal.Footer>
            ) :  null}
		</Modal>
    )
}

export default AlertTimeLeft;