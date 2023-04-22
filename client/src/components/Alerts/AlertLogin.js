import React from 'react';

import { Toast, Row, Col } from 'react-bootstrap';

const AlertLogin = ({ user, alert, setShowAlert }) => {
    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '60%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg='danger'>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{user.email === '' || user.password === '' ? 'Enter all fields appropriately' : 'Invalid Credentials'}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};

export default AlertLogin;
