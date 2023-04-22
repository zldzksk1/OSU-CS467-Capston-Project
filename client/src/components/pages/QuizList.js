import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import {
	useQuizzes,
	getQuizzes,
	deleteQuiz,
} from "../../context/quiz/QuizState";
import AlertModal from "../Alerts/AlertModal";
import { Link } from "react-router-dom";

function QuizList() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;

	const [quizState, quizDispatch] = useQuizzes();
	const { quizzes } = quizState;

	useEffect(() => {
		getQuizzes(quizDispatch);
	}, [quizDispatch]);

	// delete modal
	const [id, setId] = useState();
	const [displayModal, setDisplayModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState();

	// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
	const showModal = (id) => {
		setId(id);
		setDeleteMessage("Are you sure you want to delete this quiz?");
		setDisplayModal(true);
	};

	const hideModal = () => {
		setDisplayModal(false);
	};

	const onDelete = () => {
		deleteQuiz(quizDispatch, id);
		hideModal();
	};

	return (
		<Container>
			<h3 className="my-5">Past Quizzes</h3>
			{quizzes && quizzes.length > 0 ? (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Quiz ID</th>
							<th>Quiz Title</th>
							<th>Questions</th>
							<th>Total Points</th>
							<th>Time Limit</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{quizzes &&
							quizzes.map((quiz, index) => (
								<tr key={quiz._id}>
									<td>{index + 1}</td>
									<td>{quiz._id}</td>
									<td>{quiz.title}</td>
									<td>{quiz.questions.length}</td>
									<td>{quiz.totalScore} points</td>
									<td>{quiz.timeLimit} minutes</td>
									<td>{moment(quiz.createdAt).format("YYYY-MM-DD HH:mm")}</td>
									<td align="center">
										<Link to={`/quiz/${quiz._id}`}>view</Link>
										<Link to={`/sendquiz/${quiz._id}`} className="mx-3">
											send
										</Link>
										<Link to={``} onClick={() => showModal(quiz._id)}>
											delete
										</Link>
									</td>
								</tr>
							))}
						<AlertModal
							showModal={displayModal}
							confirmModal={onDelete}
							hideModal={hideModal}
							id={id}
							message={deleteMessage}
						/>
					</tbody>
				</Table>
			) : (
				<h3>There are no quizzes to display.</h3>
			)}
		</Container>
	);
}

export default QuizList;
