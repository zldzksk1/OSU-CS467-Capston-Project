import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Toast, Modal, Button, Container } from 'react-bootstrap';

import {
	useRespondent, getQuiz 
} from "../../context/respondent/RespondentState";

const AlertRespondentProfile = ({ error, setShowAlert, alert, success, setShowSuccess, iv, hashKey, quizId }) => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { quiz } = respondentState;

    useEffect(() => {
			getQuiz(respondentDispatch, quizId);
    }, [respondentDispatch, quizId]);
    
    const toggleSetAlert = () => {
        setShowAlert(!alert);
        setShowSuccess(!success);
    }

    return (
        <Container>
            {error ? (
                <Row>
                    <Col md={6} className="mb-2" style={{ 'left': '60%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                        <Toast show={alert} onClose={toggleSetAlert} bg={error ? 'danger' : null}>
                            <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">{error ? 'Error' : null}</strong>
                            </Toast.Header>
                            {error ? (
                                <Toast.Body>{error}</Toast.Body>
                            ) : null}
                        </Toast>
                    </Col>
                </Row>
            ) : (
                <Modal
                    show={success}
                    onHide={toggleSetAlert}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Thank you for providing your information. Your information and results will be saved and calculated at the end of the test.</p>
                        <p>The quiz is approximately {quiz && quiz.timeLimit} minute(s) with {quiz && quiz.questions.length} question(s).</p>
                        <p>IMPORTANT! Please do not refresh the page. You will lose all saved information on your quiz and you will receive a 0.</p>
                        <p>Click 'Begin' to begin the quiz.</p>
                        <h6>Good Luck!</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant='danger'
                        >
                            <Link 
                                to={`/${iv}/takeQuiz/${hashKey}/quiz/${quizId}`}
                                style={{ color: 'white', textDecoration: 'none' }}
                            >
                                Begin
                            </Link>
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    )
}

export default AlertRespondentProfile