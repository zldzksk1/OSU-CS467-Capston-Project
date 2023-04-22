import React from 'react';
import { useAuth, clearErrors } from '../../context/auth/AuthState';
import { Toast, Row, Col } from 'react-bootstrap';

const AlertEditProfile = ({ alert, setShowAlert }) => {
    const [authState, authDispatch] = useAuth();
    const { error } = authState;

    const toggleSetAlert = () => {
        setShowAlert(!alert);
        // clearErrors(authDispatch);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '61%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg={error ? 'danger' : 'success'}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                        {error ? (<strong className="me-auto">Error</strong>) : (<strong className="me-auto">Success</strong>)}
                    </Toast.Header>
                    {error ? (
                        <Toast.Body>{error}</Toast.Body>
                    ) : (
                        <Toast.Body>Your profile has successfully been updated! You will be redirected to dashboard.</Toast.Body>
                    )}
                </Toast>
            </Col>
        </Row>
    );
};

export default AlertEditProfile;
