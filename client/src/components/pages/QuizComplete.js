import React from "react";
import { useLocation } from "react-router-dom";
import CalculateScore from "../utils/CalculateScore";
import { Button, Container, Row } from "react-bootstrap";
import logo from "../../assets/logo_small_two.png";

const QuizComplete = () => {
	const { state } = useLocation();
	let calculateFinished = CalculateScore(state.quiz_id, state.resp_id);
	if (calculateFinished) {
		return (
			<div className="w-75 my-5 py-5 mx-auto">
				<Row>
					<img src={logo} alt="logo" className="w-25 mb-3 mx-auto" />

					<h3 style={{ textAlign: "center" }}>
						Your quiz has been successfully submitted.
					</h3>

					<p style={{ textAlign: "center" }}>You may close this window.</p>
				</Row>
			</div>
		);
	} else {
	    return null;
	}


	
};
export default QuizComplete;
