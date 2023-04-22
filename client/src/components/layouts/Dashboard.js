import React from 'react'
import {Container, Table, OverlayTrigger, Tooltip} from 'react-bootstrap';
import{NavLink as RouterNavLink, Link } from 'react-router-dom';
import Radium,{styleRoot} from "radium";

const reSizeDash = {
	float: "left",
    width: "46%",
	height: "130px",
	margin: "2%",
	padding: "4% 0 0 0",
	border: "1px solid rgb(182, 182, 182)",
	borderRadius: "7px",
    // '@media (max-width: 1410px)': {
    //     width: "47%",
	// 	padding: "5% 0 0 0",
    //   },

	'@media (max-width: 900px)': {
    	width: "100%",
		padding: "7% 0 0 0",
      },
}

const Dashboard = () => {
    

    return (
			<div>
				<Container style={{ marginTop: 30, marginBottom: 15 }}>
					<span className="mb-0 h3">Dashboard / Access your services</span>
				</Container>
				<div className="dash-card-row">
					<div className="dash-card-cell-b">
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>
									create quiz to save to your account
								</Tooltip>
							}
						>
							<a href="/createquiz" style={reSizeDash}>
								Create Quiz
							</a>
						</OverlayTrigger>
					</div>
					<div className="dash-card-cell-b">
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>
									view all quiz info & analysis, send, or delete quiz
								</Tooltip>
							}
						>
							<a href="/quizlist" style={reSizeDash}>
								Past Quizzes
							</a>
						</OverlayTrigger>
					</div>
					{/* <div className="dash-card-cell-a" >
						<a href="#" style={reSizeDash}> Mailing List (TBD)</a>
					</div> */}
				</div>
				<div className="dash-card-row">
					<div className="dash-card-cell-b">
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>view, edit, or delete your account info</Tooltip>
							}
						>
							<a href="/account" style={reSizeDash}>
								{" "}
								Manage Account
							</a>
						</OverlayTrigger>
					</div>
					<div className="dash-card-cell-b">
						<OverlayTrigger
							placement="top"
							overlay={<Tooltip>FAQ and contact info</Tooltip>}
						>
							<a href="/contact" style={reSizeDash}>
								{" "}
								Customer Service
							</a>
						</OverlayTrigger>
					</div>
					{/* <div className="dash-card-cell-b">
						<a href="#" style={reSizeDash}>
							{" "}
							<img
								src={require("../../assets/logo_small_two.png")}
								className="img-fluid shadow-4"
							/>
						</a>
					</div> */}
				</div>
			</div>
		);
}

export default Radium(Dashboard)
