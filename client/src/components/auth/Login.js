import React, { useState, useEffect, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth, loginUser, clearErrors } from '../../context/auth/AuthState';

import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import RegLoginNav from '../layouts/RegLoginNav';
import AlertLogin from '../Alerts/AlertLogin';

const Login = () => {
    const [authState, authDispatch] = useAuth();
    const { error, isAuthenticated } = authState;
    const [alert, setShowAlert] = useState(false);

    useEffect(() => {
        if(error === 'Invalid Credentials') {
            setShowAlert(true);
            clearErrors(authDispatch);
        }
    }, [error, isAuthenticated, authDispatch]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    let { email, password } = user;
    
    const onChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
        setShowAlert(false);
        clearErrors(authDispatch);
    }

    const onSubmit = event => {
        event.preventDefault();

        if(error) {
            setShowAlert(true);
            // clearErrors(authDispatch);
        } else {
            loginUser(authDispatch, {
                email,
                password
            });
        }
    }

    if(isAuthenticated) return <Navigate to='/' />;

    return (
        <Fragment>
            <Container>
                <RegLoginNav />
                <Row className='mt-5'>
                    <AlertLogin user={user} alert={alert} setShowAlert={setShowAlert} />
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                        <h1 className='shadow-sm p-3 text-center rounded' style={{ color: 'black' }}>Login</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control 
                                    type='email' 
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
                            <Button variant='warning btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Login</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                                <Link to='/register' style={{ color: 'black' }}>Not Signed Up Yet?</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Login
