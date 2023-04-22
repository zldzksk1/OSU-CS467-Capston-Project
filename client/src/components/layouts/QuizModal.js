import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import FinishedQuizQuestion from "./FinishedQuizQuestion";

const QuizModal = ({
	showModal,
	hideModal,
	confirmModal,
	quiz,
	respondent,
	answered_quiz,
}) => {
	const findAnsweredQuiz = (id) =>
		answered_quiz.questionsAnswered.find((q) => q.question_id === id);

	const [pointsData, setPointsData] = useState([]);

	const editPointsData = (id, points) => {
		const data = {
			question_id: id,
			answerGiven: findAnsweredQuiz(id).answerGiven,
			pointsGiven: points,
		};
		let updatedPointsData = [...pointsData, data];

		setPointsData(updatedPointsData);
	};

	const confirmUpdate = () => {
		let answerUpdate = answered_quiz.questionsAnswered;

		for (let p of pointsData) {
			let oldQuestion = answerUpdate.find(
				(d) => d.question_id === p.question_id
			);

			if (oldQuestion) {
				answerUpdate = answerUpdate.filter((q) => q !== oldQuestion);
			}
			answerUpdate = [...answerUpdate, p];
		}

		let quizObjUpdate = {};

		quizObjUpdate.questionsAnswered = answerUpdate;

		let notGraded = 0;
		let totalPoints = 0;
		for (let q of quizObjUpdate.questionsAnswered) {
			if (q.pointsGiven === null) {
				notGraded++;
			} else {
				totalPoints += q.pointsGiven;
			}
		}

		if (notGraded === 0) {
			quizObjUpdate.totalPointsGiven = totalPoints;
		}
		quizObjUpdate.timeTaken = answered_quiz.timeTaken;
		quizObjUpdate.quiz_id = quiz._id;
		quizObjUpdate.respondent_id = respondent._id;
		console.log(quizObjUpdate);
		confirmModal(quizObjUpdate);
	};

	return (
		quiz &&
		respondent && (
			<Modal
				show={showModal}
				onHide={hideModal}
				size="lg"
				centered
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Quiz {quiz.title} - {respondent.firstName} {respondent.lastName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Row>
							<p>
								<strong>Total Score: </strong>
								{answered_quiz.hasOwnProperty("totalPointsGiven") ? (
									<span>
										{answered_quiz.totalPointsGiven} / {quiz.totalScore} points
										(
										{(
											(answered_quiz.totalPointsGiven / quiz.totalScore) *
											100
										).toFixed(1)}{" "}
										%)
									</span>
								) : (
									<span>Needs Grading</span>
								)}
							</p>
							<p>
								<strong>Time Used: </strong>
								{answered_quiz.hasOwnProperty('timeTaken') ? (
									<span>
										{answered_quiz.timeTaken} / {quiz.timeLimit} minutes
									</span>
								) : (
									<span>N/A</span>
								)}
							</p>
						</Row>

						{quiz.questions.map((question, index) => (
							<FinishedQuizQuestion
								key={question._id}
								question={question}
								answer={findAnsweredQuiz(question._id)}
								index={index + 1}
								onEdit={editPointsData}
							/>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={hideModal}>
						Close
					</Button>
					<Button
						variant="danger"
						onClick={confirmUpdate}
						disabled={pointsData.length === 0}
					>
						Confirm Update
					</Button>
				</Modal.Footer>
			</Modal>
		)
	);
};

export default QuizModal;
