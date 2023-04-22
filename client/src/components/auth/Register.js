import React, { useState, useEffect, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth, registerUser, clearErrors } from '../../context/auth/AuthState';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import AlertRegister from '../Alerts/AlertRegister';
import RegLoginNav from '../layouts/RegLoginNav';

const Register = props => {
    const [authState, authDispatch] = useAuth();
    const { error, isAuthenticated } = authState;
    const [alert, setShowAlert] = useState(false);

    useEffect(() => {
        if(error) {
            setShowAlert(true);
        }
        if(error === 'No token, authorization denied') {
            setShowAlert(false);
            clearErrors(authDispatch);
        }
    }, [error, isAuthenticated, props.history, authDispatch]);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { firstName, lastName, organization, email, password, confirmPassword } = user;

    const onChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
        setShowAlert(false);
        clearErrors(authDispatch);
    }

    const onSubmit = event => {
        event.preventDefault();
        // if(error) setShowAlert(true);
        // if(error === 'Password of at least 8 characters is required for registering') setShowAlert(true);

        if(password.toString() !== confirmPassword.toString()) {
            setShowAlert(true);
        } else {
            registerUser(authDispatch, {
                firstName,
                lastName,
                organization,
                email,
                password
            });
            clearErrors(authDispatch);
        }
    }

    if(isAuthenticated) return <Navigate to='/' />;

    return (
        <Fragment>
            <Container>
                <RegLoginNav />
                <Row className='mt-5'>
                    <AlertRegister password={password} confirmPassword={confirmPassword} alert={alert} setShowAlert={setShowAlert} />
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                        <h1 className='shadow-sm p-3 text-center rounded' style={{ color: 'black' }}>Sign Up</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='firstName'>First Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    placeholder='First Name' 
                                    value={firstName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName' 
                                    placeholder='Last Name' 
                                    value={lastName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='Organization'>Organization</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='organization' 
                                    placeholder='Organization' 
                                    value={organization} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='email' 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='password'>Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Button variant='warning btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Sign Up</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                                <Link to='/login' style={{ color: 'black' }}>Already a Member?</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Register
