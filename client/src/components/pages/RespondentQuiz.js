import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import {
	useRespondent,
	getRespondentQuiz,
	takeQuiz,
} from "../../context/respondent/RespondentState";
import AlertQuizSubmit from '../Alerts/AlertQuizSubmit';
import AlertTimeLeft from '../Alerts/AlertTimeLeft';

const RespondentQuiz = () => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent, quiz_resp} = respondentState;
    const { iv, hashKey, quizId } = useParams();
    const navigate = useNavigate();

    const [questionsAnswered, setQuestionsAnswered] = useState([]);
    const [timeAlert, setShowTimeAlert] = useState(false);
    const [submitAlert, setShowSubmitAlert] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');

    let time = quiz_resp && quiz_resp.timeLimit;
    const [stateTimeLimit, setStateTimeLimit] = useState(2);

	const onTimeLimitChange = useCallback(() => {
		setInterval(
			() => setStateTimeLimit((stateTimeLimit) => stateTimeLimit - 1),
			60000
		);
	}, []);

    const clearTimer = () => {
        clearInterval(stateTimeLimit);
    }

    useEffect(() => {
        setStateTimeLimit(time);
    }, [time])

    useEffect(() => {
        if(error) {
            console.log(error);
        }
        getRespondentQuiz(respondentDispatch, iv, hashKey, quizId);
    }, [respondentDispatch, error, iv, hashKey, quizId]);

    useEffect(() => {
        onTimeLimitChange();
    }, [onTimeLimitChange]);

	const onChange = (e, type) => {
		const answer = { question_id: e.target.id, answerGiven: e.target.value };
		let answers;
		if (type === "radio" || type === "text") {
			if (questionsAnswered.find((ans) => ans.question_id === e.target.id)) {
				answers = [
					...questionsAnswered.filter((ans) => ans.question_id !== e.target.id),
					answer,
				];
			} else {
				answers = [...questionsAnswered, answer];
			}
		} else if (type === "checkbox") {
			const uncheck_answer = questionsAnswered.find(
				(ans) =>
					ans.question_id === e.target.id &&
					ans.answerGiven === e.target.value
			);
			if (uncheck_answer){
				answers = [...questionsAnswered.filter(
					(ans) =>
						ans !== uncheck_answer
				)]
			} else {
				answers = [...questionsAnswered, answer];
			}
		}
        setQuestionsAnswered(answers);
	};

	//https://stackoverflow.com/questions/57703415/how-to-merge-array-of-objects-if-duplicate-values-are-there-if-key-is-common-th
	const mergeQuestionIds = () => {
		const data = Object.values(
			questionsAnswered.reduce((a, { question_id, answerGiven }) => {
				a[question_id] = a[question_id] || {
					question_id,
					answerGiven: new Set(),
				};
				a[question_id].answerGiven.add(answerGiven);
				return a;
			}, {})
		).map(({ question_id, answerGiven }) => ({
			question_id,
			answerGiven: [...answerGiven]
		}));

		return data;
	};

    const timeTaken = () => {
        let totalTime = 0;

        totalTime = time - stateTimeLimit;

        if(totalTime < 0) {
            totalTime = 0;
        }

        return totalTime;
    }

    const submitTest = () => {
        const quizData = mergeQuestionIds();
        const totalTime = timeTaken();

        takeQuiz(respondentDispatch, 
            {
                timeTaken: totalTime,
                questionsAnswered: quizData
            },
            iv,
            hashKey,
            quizId
        );

        clearTimer();
        navigate('/quizComplete', { state: {quiz_id: quizId, resp_id: respondent._id}})
    }

    const alertUser = e => {
        e.preventDefault();
        return e.returnValue = '';
    };

    const onSubmit = e => {
        e.preventDefault();

        const quizData = mergeQuestionIds();
        const totalTime = timeTaken();

        if(quizData.length < quiz_resp.questions.length && totalTime !== time) {
            setConfirmMessage('You have unanswered questions left on the quiz. Are you sure you want to submit?');
            setShowSubmitAlert(true);
        } else {
            submitTest();
        }
    }

    useEffect(() => {
        if(time === 5 && stateTimeLimit === 5) {
            setShowTimeAlert(false);
        } else if((stateTimeLimit === 5 && time !== 5) || stateTimeLimit === 1) {
            setConfirmMessage(`You have ${stateTimeLimit} minute(s) remaining!`);
            setShowTimeAlert(true);
        } else if(stateTimeLimit === 0) {
            submitTest();
        }
    }, [stateTimeLimit, time]);

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser);
        window.onload = submitTest;
        return () => {
            window.removeEventListener('beforeunload', alertUser);
        }
    }, []);

    useEffect(() => {
        if(respondent && respondent.quizzes) {
            const quiz = respondent.quizzes.find(quiz => quiz.quiz_id === quizId);
            if(quiz) {
                navigate('/quizComplete', { state: {quiz_id: quizId, resp_id: respondent._id}});
            }
        }
    }, [respondent, navigate, quizId]);

    return (
        <Container>
            <AlertTimeLeft 
                confirmMessage={confirmMessage} 
                alert={timeAlert} 
                setShowAlert={setShowTimeAlert} 
                submitTest={submitTest}
                time={stateTimeLimit}
                onSubmit={onSubmit}
            />
            <AlertQuizSubmit 
                confirmMessage={confirmMessage} 
                alert={submitAlert} 
                setShowAlert={setShowSubmitAlert} 
                submitTest={submitTest}
            />
            <Container className='shadow-sm p-3 text-center rounded' style={{ display: 'block', width: '80%'}}>
                <h1>
                    {quiz_resp && quiz_resp.title}
                </h1>
                <h6>Time Limit: {stateTimeLimit} minute(s)</h6>
                <h6>Candidate ID: {respondent && respondent._id}</h6>
            </Container>
            {quiz_resp &&
                quiz_resp.questions.map((q, i) => (
                    <Row className="mt-5" key={q._id}>
                        <Col
                            lg={5}
                            md={6}
                            sm={12}
                            className="p-5 m-auto shadow-sm rounded-lg"
                        >
                            <Form onSubmit={onSubmit} id='quizForm'>
                                <Form.Group>
                                    <Form.Label htmlFor="question" style={{ 'fontSize': 20 }}>{q.question}</Form.Label>
                                </Form.Group>
                                    <Form.Group>
                                        {q.answerOptions.map((a, index) => (
                                            q.questionType === 'FR' ? (
                                                <Form.Control
                                                    key={index}
                                                    id={q._id}
                                                    type="text"
                                                    name='questionsAnswered'
                                                    placeholder='Enter Answer'
                                                    onChange={(e) => onChange(e, "text")}
                                                />
                                            ) : q.questionType === "TF" || q.questionType === "SC" ? (
                                                <Form.Check
                                                    type={"radio"}
                                                    key={index}
                                                    label={a}
                                                    value={a}
                                                    id={q._id}
                                                    name="questionsAnswered"
                                                    onChange={(e) => onChange(e, "radio")}
                                                />
                                            ) : (
                                                <Form.Check
                                                    type={"checkbox"}
                                                    key={index}
                                                    label={a}
                                                    value={a}
                                                    id={q._id}
                                                    name="questionsAnswered"
                                                    onChange={(e) => onChange(e, "checkbox")}
                                                />
                                            )
                                        ))}
                                    </Form.Group>
                                <div style={{ marginTop: "0.5rem" }}></div>
                            </Form>
                        </Col>
                    </Row>
                ))}
                <Container style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginTop: '2rem'
                    }}
                >
                    <Button
                        variant="warning btn-block"
                        type="submit"
                        onClick={onSubmit}
                        style={{ 
                            marginBottom: '2rem', 
                            width: '10rem'
                        }}
                    >
                        Complete
                    </Button>
                </Container>
        </Container>
	);
};

export default RespondentQuiz;
