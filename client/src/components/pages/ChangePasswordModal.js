import React, { Fragment, useState, useEffect } from 'react';

import { Modal, Row, Container, Col, Form, Button } from 'react-bootstrap';
import { useAuth, clearErrors, changePassword } from '../../context/auth/AuthState';
import AlertChangePassword from '../Alerts/AlertChangePassword';

const ChangePasswordModal = ({ showModal, setShowModal }) => {
    const [authState, authDispatch] = useAuth();
    const { error, isAuthenticated } = authState;
    const [alert, setShowAlert] = useState(false);

    useEffect(() => {
        if(error) {
            setShowAlert(true);
            // clearErrors(authDispatch);
        }
    }, [error, isAuthenticated, authDispatch, alert]);

    const [userInfo, setUserInfo] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const { password, newPassword, confirmNewPassword } = userInfo;

    const onChange = event => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
        clearErrors(authDispatch);
        setShowAlert(false);
    }

    const handleClose = () => {
        setShowModal(false);
        clearErrors(authDispatch);
    };


    const onSubmit = event => {
        event.preventDefault();
        if(newPassword !== confirmNewPassword) {
            setShowAlert(true);
        } else {
            changePassword(authDispatch, { password, newPassword });
            setUserInfo({
                password: '',
                newPassword: '',
                confirmNewPassword: ''
            });
            setShowAlert(true);
        }
    };

    return (
        <Fragment>
            <Modal 
                show={showModal} 
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='mt-5'>
                            <AlertChangePassword 
                                alert={alert} 
                                setShowAlert={setShowAlert}
                                newPassword={newPassword}
                                confirmNewPassword={confirmNewPassword}
                            />
                            <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                                <Form onSubmit={onSubmit}>
                                    <Form.Group>
                                        <Form.Label htmlFor='password'>Current Password</Form.Label>
                                        <Form.Control 
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            value={password}
                                            onChange={onChange}
                                            isInvalid={!!error}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor='newPassword'>New Password</Form.Label>
                                            <Form.Control 
                                                type='password'
                                                name='newPassword'
                                                placeholder='New Password'
                                                value={newPassword}
                                                onChange={onChange}
                                                isInvalid={!!error}
                                            />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor='confirmNewPassword'>Confirm New Password</Form.Label>
                                            <Form.Control 
                                                type='password'
                                                name='confirmNewPassword'
                                                placeholder='Confirm New Password'
                                                value={confirmNewPassword}
                                                onChange={onChange}
                                                isInvalid={!!error}
                                            />
                                    </Form.Group>
                                    <Button 
                                        variant='warning btn-block' 
                                        type='submit' 
                                        style={{ 'marginTop': '2rem'}}
                                    >
                                        Save Changes
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary btn-block" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export default ChangePasswordModal;
