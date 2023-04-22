import React from "react";

import { useNavigate } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";

// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
const AlertModal = ({ showModal, hideModal, message, confirmModal, type, id }) => {
    const navigate = useNavigate();

	var showCloseButton = true;
	if (type === 'reconfirm') {
		showCloseButton = false;
	}
		
	return (
		<Modal
			show={showModal}
			onHide={hideModal}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{message}
			</Modal.Body>
			<Modal.Footer>
				{showCloseButton? (<Button variant="secondary" onClick={hideModal}>
					Close
				</Button>) : (<> </>)}
				{type === 'sendquiz' ? (
                    <Button variant="danger" onClick={() => navigate('/')}>Confirm</Button>
                ) : (
                    <Button variant="danger" onClick={() => confirmModal(id)}>Confirm</Button>
                )}
			</Modal.Footer>
		</Modal>

	);
}

export default AlertModal;
