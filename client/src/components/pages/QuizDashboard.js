import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Table,
	Row,
	Col,
	Button,
	Tooltip,
	OverlayTrigger,
} from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuiz } from "../../context/quiz/QuizState";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip as ChartTooltip,
	Legend,
	LinearScale,
	PointElement,
	LineElement,
} from "chart.js";
import { Doughnut, Scatter } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom";
import QuizModal from "../layouts/QuizModal";
import {
	useRespondent,
	getRespondentQuizById,
	loadRespondents,
	updateRespondentQuiz,
} from "../../context/respondent/RespondentState";

ChartJS.register(
	ArcElement,
	ChartTooltip,
	Legend,
	LinearScale,
	PointElement,
	LineElement
);

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1,
		}}
	/>
);


function QuizDashboard() {
	const navigate = useNavigate();
	const { quiz_id } = useParams();
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp_ans, respondents } = respondentState;

	const [numStatus, setNum] = useState({
		noRespond: false,
		gradNotification: false,
		dataLoad: false,
		numSent: 0,
		numTaken: 0,
		numNotTaken: 0,
		totalPoint: 0,
		timeLimit: 0,
		numQuestion: 0,
		AvgScore: 0,
		HighestScore: 0,
		LowestScore: 0,
		AverageTime: 0,
		aboveAvg: 0,
		belowAvg: 0,
		aroundAvg: 0,
	});

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, [quizDispatch, quiz_id]);
	useEffect(() => {
		loadRespondents(respondentDispatch, quiz_id);
	}, [respondentDispatch, quiz_id]);

	useEffect(() => {}, [goBack]);
	function goBack() {
		navigate("/quizlist");
	}
	const donutData = {
		labels: ["Not Completed", "Completed"],
		datasets: [
			{
				label: "Quiz Completion Chart",
				data: [numStatus.numNotTaken, numStatus.numTaken],
				backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
				hoverOffset: 10,
				hoverBorderWidth: 2,
				offset: 5,
			},
		],
	};

	const scatterData = {
		datasets: [
			{
				label: "Respondent Data",
				data:
					respondents &&
					quiz &&
					respondents.map((respondent) => ({
						x:
							(respondent.current_quiz.totalPointsGiven / quiz.totalScore) * 100,
						y: respondent.current_quiz.timeTaken,
					})),
				
				backgroundColor: "rgb(255, 99, 132)",
			},
		],
	};

	const donutOptions = {
		layout: {
			padding: 40,
			margin: 30,
		},
	};

	const scatterOptions = {
		responsive: true,
		layout: {
			padding: 5,
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					text: "Time (min)",
					display: true,
				},
				min: 0,
				max: quiz && quiz.timeLimit,
			},
			x: {
				beginAtZero: true,
				title: {
					text: "Score (%)",
					display: true,
				},
				min: 0,
				max: 100,
			},
		},
	};

	const [showModal, setShowModal] = useState(false);

	const hideModal = () => {
		setShowModal(false);
	};

	const showQuizModal = (respondent_id) => {
		getRespondentQuizById(respondentDispatch, respondent_id, quiz_id);
		setShowModal(true);
	};

	const updateQuizConfirm = (updatedRespondentQuiz) => {
		hideModal();
		console.log(updatedRespondentQuiz);

		updateRespondentQuiz(
			respondentDispatch,
			updatedRespondentQuiz.respondent_id,
			updatedRespondentQuiz.quiz_id,
			{
				questionsAnswered: updatedRespondentQuiz.questionsAnswered,
				totalPointsGiven: updatedRespondentQuiz.totalPointsGiven,
				timeTaken: updatedRespondentQuiz.timeTaken,
			}
		);
		if (error) {
			alert(error);
		} else {
			window.location.reload();
		}
	};

	function dataLoadAll() {
		if (quiz && respondents) {
			var totalScore = 0;
			var totalTime = 0;
			var high = 0;
			var low = Number.MAX_SAFE_INTEGER;
			var avgScore = 0;
			var avgTime = 0;
			var notGraded = 0;

			for (var i = 0; i < respondents.length; i++) {
				if (!respondents[i].current_quiz.hasOwnProperty('totalPointsGiven')) {
					notGraded++;
				}
				var curr_point = respondents[i].current_quiz.totalPointsGiven;
				var curr_time = respondents[i].current_quiz.timeTaken;

				if (curr_time) {
					totalTime += curr_time;
				}
				if (curr_point) {
					totalScore += curr_point;
					if (curr_point > high) {
						high = curr_point;
					}
					if (curr_point < low) {
						low = curr_point;
					}
				} else if (curr_point === 0) {
					low = 0;
				}
			}
			
			avgScore = totalScore / respondents.length;
			avgTime = totalTime / respondents.length;

			if (respondents.length === 0) {
				setNum({
					dataLoad: true,
					noRespond: true,
					numSent: quiz.totalEmailsSent === 0 ? 0 : quiz.totalEmailsSent,
					numTaken: 0,
					numNotTaken: 0,
					totalPoint: quiz.totalScore,
					titmeLimit: quiz.timeLimit,
					numQuestion: quiz.questions.length,
					averageScore: 0,
					highestScore: 0,
					lowestScore: 0,
					averageTime: 0,
				});
			} else if (notGraded > 0) {
				setNum({
					dataLoad: true,
					gradNotification: true,
					numSent: quiz.totalEmailsSent === 0 ? 0 : quiz.totalEmailsSent,
					numTaken: 0,
					numNotTaken: 0,
					totalPoint: quiz.totalScore,
					titmeLimit: quiz.timeLimit,
					numQuestion: quiz.questions.length,
					averageScore: 0,
					highestScore: 0,
					lowestScore: 0,
					averageTime: 0,
				});
			} else {
				setNum({
					dataLoad: true,
					numSent: quiz.totalEmailsSent,
					numTaken: respondents.length,
					numNotTaken: quiz.totalEmailsSent - respondents.length,
					totalPoint: quiz.totalScore,
					timeLimit: quiz.timeLimit,
					numQuestion: quiz.questions.length,
					averageScore: avgScore.toFixed(1),
					highestScore: high.toFixed(1),
					lowestScore: low.toFixed(1),
					averageTime: avgTime.toFixed(1),
				});
			}
		}
	}

	function summaryNoti(text) {
		return (
			<Container fluid>
				<h4 style={{ textAlign: "center" }}>Quiz Summary</h4>
				<h5 style={{ textAlign: "center", marginTop: "1%" }}>{text}</h5>
				<br />
				{ColoredLine("grey")}
			</Container>
		);
	}

	function infoAndChart() {
		return (
			<Container>
				<h2 style={{ textAlign: "center", paddingBottom: "5%" }}>{quiz.title}</h2>
				<Row>
					<Col lg={6}>
						<h4 style={{ textAlign: "center" }}>Quiz Information</h4>
						<Table responsive>
							<tbody>
								<tr>
									<td>Total Points</td>
									<td>{numStatus.totalPoint}</td>
								</tr>
								<tr>
									<td>Time Limit</td>
									<td>{numStatus.timeLimit}</td>
								</tr>
								<tr>
									<td>Number of Questions</td>
									<td>{numStatus.numQuestion}</td>
								</tr>
								<tr>
									<td>Quizzes Sent Out</td>
									<td>{numStatus.numSent ? numStatus.numSent : 0}</td>
								</tr>
								<tr>
									<td>Quizzes Taken</td>
									<td>{numStatus.numTaken}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col lg={6}>
						<h4 style={{ textAlign: "center" }}>Quiz Statistics</h4>
						<Table responsive>
							<tbody>
								<tr>
									<td>Average Score</td>
									<td>{numStatus.averageScore}</td>
								</tr>
								<tr>
									<td>Highest Score</td>
									<td>{numStatus.highestScore}</td>
								</tr>
								<tr>
									<td>Lowest Score</td>
									<td>{numStatus.lowestScore}</td>
								</tr>
								<tr>
									<td>Average Time (min)</td>
									<td>{numStatus.averageTime}</td>
								</tr>
							</tbody>
						</Table>
						<br />
						<br />
					</Col>
				</Row>
				<br />
				<br />
				<Row>
					<Col lg={6}>
						<h4 style={{ textAlign: "center" }}>Quiz Completion Status</h4>
						<Doughnut data={donutData} options={donutOptions} />
						<br />
						<br />
					</Col>
					<Col lg={6}>
						<h4 style={{ textAlign: "center", paddingBottom: 100 }}>
							Time Taken vs. Score
						</h4>
						<Scatter data={scatterData} options={scatterOptions} />
						<br />
						<br />
					</Col>
				</Row>
				{ColoredLine("grey")}
			</Container>
		);
	}

	function drawData() {
		if (numStatus.dataLoad === false) {
			dataLoadAll();
			return summaryNoti("Data Loading");
		}
		if (numStatus.gradNotification === true) {
			return summaryNoti("Please complete grading to generate Quiz Analysis");
		} else if (numStatus.noRespond === true) {
			return summaryNoti(
				"Not Available - No Respondents"
			);
		} else {
			return infoAndChart();
		}
	}

	return (
		<Container className="w-75">
			<br />
			<br />
			{drawData()}
			<Row>
				<h4 style={{ textAlign: "center" }}>Ranking & Individual Results</h4>
				<br />
				<br />
				{respondents && respondents.length > 0 ? (
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<OverlayTrigger
									placement="top"
									overlay={
										<Tooltip>
											Ranking is based on total points received.
										</Tooltip>
									}
								>
									<th>Ranking*</th>
								</OverlayTrigger>
								<th>Name</th>
								<th>School</th>
								<th>Email</th>
								<th>Points Received</th>
								<th>Time Used</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{respondents &&
								quiz &&
								respondents
									.sort(function (a, b) {
										return (
											(b.current_quiz.totalPointsGiven != null) -
												(a.current_quiz.totalPointsGiven != null) ||
											b.current_quiz.totalPointsGiven -
												a.current_quiz.totalPointsGiven
										);
									})
									.map((respondent, index) => (
										<tr key={respondent._id} id={respondent._id}>
											<td>{index + 1}</td>
											<td>
												{respondent.firstName} {respondent.lastName}
											</td>
											<td>{respondent.school}</td>
											<td>{respondent.email}</td>
											{respondent.current_quiz.hasOwnProperty(
												"totalPointsGiven"
											) ? (
												<td>
													{respondent.current_quiz.totalPointsGiven}/
													{quiz.totalScore} points
												</td>
											) : (
												<td style={{ color: "red" }}>Needs Grading</td>
											)}
											{respondent.current_quiz.hasOwnProperty("timeTaken") ? (
												<td>{respondent.current_quiz.timeTaken} minutes</td>
											) : (
												<td>N/A</td>
											)}
											<td>
												<a
													className="mx-3"
													href="#"
													onClick={() => showQuizModal(respondent._id)}
												>
													view/grade quiz
												</a>
											</td>
										</tr>
									))}
						</tbody>
					</Table>
				) : (
					<h5 style={{ textAlign: "center", marginTop: "1%" }}>
						Not Available - No Respondents Data{" "}
					</h5>
				)}
			</Row>
			<Row>
				<Col className="w-25 d-flex justify-content-center my-3">
					<Button
						variant="warning"
						className="mx-3 justify-content-center align-content-center"
						onClick={goBack}
					>
						Go Back
					</Button>
				</Col>
			</Row>
			{respondents && quiz && quiz_resp_ans && (
				<QuizModal
					showModal={showModal}
					confirmModal={updateQuizConfirm}
					hideModal={hideModal}
					quiz={quiz}
					answered_quiz={quiz_resp_ans}
					respondent={respondent}
				/>
			)}
		</Container>
	);
}

export default QuizDashboard;
