import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { 
    useRespondent, 
    respondentInfo, 
    clearErrors, 
    getRespondentInfo
} from '../../context/respondent/RespondentState';

import AlertRespondentProfile from '../Alerts/AlertRespondentProfile';
import AlertQuizTaken from '../Alerts/AlertQuizTaken';

const RespondentInfo = () => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent } = respondentState;
    const { iv, hashKey, quizId } = useParams();

    const [alert, setShowAlert] = useState(false);
    const [success, setShowSuccess] = useState(false);
    const [quizTaken, setQuizTaken] = useState(false);

    const [responInfo, setResponInfo] = useState({
        firstName: '',
        lastName: '',
        school: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        if(respondent && respondent.quizzes) {
            const quiz = respondent.quizzes.find(quiz => quiz.quiz_id === quizId);
            if(quiz) {
                setQuizTaken(true);
            }
        }
    }, [respondent, quizId]);

    useEffect(() => {
        if(error) {
            setShowSuccess(false);
            setShowAlert(true);
            setTimeout(() => {
                clearErrors(respondentDispatch);
                setShowAlert(false);
            }, 5000)
        }
        getRespondentInfo(respondentDispatch, iv, hashKey, quizId);
    }, [error, respondentDispatch, iv, hashKey, quizId, success]);

    const { firstName, lastName, school, dateOfBirth } = responInfo;

    const onChange = e => {
        setResponInfo({ ...responInfo, [e.target.name]: e.target.value });

        setShowAlert(false);
        clearErrors(respondentDispatch);
    }

    const onSubmit = e => {
        e.preventDefault();

        if(!error) {
            respondentInfo(respondentDispatch, {
                firstName,
                lastName,
                school,
                dateOfBirth,
                email: respondent && respondent.email ? respondent.email : respondent
            }, iv, hashKey, quizId);

            clearErrors(respondentDispatch);

            if((respondent && respondent.firstName) || (firstName !== '' && lastName !== '' && school !== '' && dateOfBirth !== '')) {
                setShowSuccess(true);
            }
        }
    }

    return (
        <Fragment>
            <AlertRespondentProfile 
                error={error} 
                alert={alert}
                success={success}
                setShowAlert={setShowAlert}
                setShowSuccess={setShowSuccess}
                iv={iv}
                hashKey={hashKey}
                quizId={quizId}
            />
            <AlertQuizTaken 
                quizTaken={quizTaken}
                setQuizTaken={setQuizTaken}
            />
            <Container>
                <Row className='mt-1'>
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                        <h1 className='shadow-sm p-3 text-center rounded' style={{ color: 'black' }}>Register Quiz</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='firstName'>First Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    placeholder='First Name' 
                                    disabled={respondent && respondent.firstName ? true : false}
                                    value={respondent && respondent.firstName ? respondent.firstName : firstName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName' 
                                    placeholder='Last Name' 
                                    disabled={respondent && respondent.lastName ? true : false}
                                    value={respondent && respondent.lastName ? respondent.lastName : lastName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='School'>School</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='school' 
                                    placeholder='School' 
                                    disabled={respondent && respondent.school ? true : false}
                                    value={respondent && respondent.school ? respondent.school : school}  
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='dateOfBirth'>Date Of Birth</Form.Label>
                                <Form.Control 
                                    type='date' 
                                    name='dateOfBirth' 
                                    placeholder='Date of Birth'
                                    disabled={respondent && respondent.dateOfBirth ? true : false}
                                    value={respondent && respondent.dateOfBirth ? respondent.dateOfBirth : dateOfBirth} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='email'>Email</Form.Label>
                                <Form.Control
                                    type='email' 
                                    name='email' 
                                    placeholder='Email'
                                    disabled={(respondent && respondent.email) || respondent ? true : false}
                                    defaultValue={respondent && respondent.email ? respondent.email : respondent} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Button variant='warning btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Submit</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default RespondentInfo