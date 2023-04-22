import React from 'react';

import { useAuth } from '../../context/auth/AuthState';

import { Toast, Row, Col } from 'react-bootstrap';

const AlertRegister = ({ password, confirmPassword, alert, setShowAlert }) => {
    const [authState] = useAuth();
    const { error } = authState;

    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '61%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg='danger'>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{password.toString() !== confirmPassword.toString() ? 'Passwords do not match' : error}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};

export default AlertRegister;
