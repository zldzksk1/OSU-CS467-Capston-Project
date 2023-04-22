import React, { useState, Fragment } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const FinishedQuizQuestion = ({ question, answer, index, onEdit }) => {
	// console.log(question, answer, index)
	const ColoredLine = ({ color }) => (
		<hr
			style={{
				color: color,
				backgroundColor: color,
				height: 1,
			}}
		/>
	);
	const instyle = {
		marginBottom: "3px",
	};

	const [points, setPoints] = useState({});
	const [edit, setEdit] = useState(false);
	const [editDone, setEditDone] = useState(false);
	
	function handleEdit() {
		setEdit(true);
	}

	function handleUpdate() {
		onEdit(points.id, points.value);
		setEdit(false);
		setEditDone(true);
	}
	function updatePoints(e) {
		if ((e.target.valueAsNumber > Number(e.target.max)) ||  (e.target.valueAsNumber < Number(e.target.min)))  {
			alert(`You can only assign points between ${ e.target.min } and ${ e.target.max }.`);
			e.target.value = ''
		} else {

			setPoints({ id: e.target.id, value: e.target.valueAsNumber });
		
		}
	}

	
	return (
		<div>
			<Container style={instyle}>
				<ColoredLine color="grey" />
				<Form>
					<Row>
						<Col sm={4}>
							{" "}
							<span style={{ fontSize: 20 }}>
								<p style={instyle}>
									<strong>Question {index}.</strong>
								</p>
							</span>
						</Col>
						<Col sm={5}>
							<Fragment>
								{edit ? (
									<Form.Group className="d-flex">
										<Form.Control
											sm={5}
											type="number"
											// controlId="questionId"
											min={0}
											max={question.points}
											id={question._id}
											onChange={updatePoints}
										></Form.Control>
										&nbsp;&nbsp;
										<Form.Text as={Col} sm={7}>
											/ {question.points} Points
										</Form.Text>
									</Form.Group>
								) : editDone ? (<span style={instyle}>
										Points [ {points.value} / {question.points} ]
									</span>) : answer.hasOwnProperty('pointsGiven')  ? (
									<span style={instyle}>
										Points [ {answer.pointsGiven} / {question.points} ]
									</span>
								) : (
									<span style={{ color: "red" }}>Needs Grading</span>
								)}
							</Fragment>
						</Col>
						<Col sm={3} style={{ textAlign: "right" }}>
							{edit ? (
								<Button
									variant="success"
									size="sm"
									onClick={handleUpdate}
									disabled={!points}
								>
									Update
								</Button>
							) : !editDone ? (
								<Button variant="warning" size="sm" onClick={handleEdit}>
									Edit
								</Button>
							) : (<></>) }
						</Col>
					</Row>
					<Row>
						<p style={instyle}>
							<strong>{question.question}</strong>
						</p>
						<p style={instyle}>Respondent Answer(s)</p>
						<p>
							{answer.answerGiven.map((a, index) => (
								<span key={index} style={{ marginBottom: "0" }}>
									[ {a} ] <br />
								</span>
							))}
						</p>
						{question.questionType === "FR" ? (
							<p style={instyle}>Grading Guideline</p>
						) : (
							<p style={instyle}>Correct Answer(s)</p>
						)}

						<p>
							{question.answer.map((a, index) => (
								<span key={index} style={{ marginBottom: "0" }}>
									[ {a} ]<br />
								</span>
							))}
						</p>
					</Row>
				</Form>
			</Container>
		</div>
	);
};

export default FinishedQuizQuestion;
