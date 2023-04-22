import React from "react";
import { Nav, Tab, Row, Col, Container } from "react-bootstrap";

const ContactUs = () => {
	return (
		<div>
			<div>
				<Container style={{ marginTop: 30, marginBottom: 15 }}>
					<span className="mb-0 h3">Frequently Asked Questions</span>
				</Container>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item
									style={{ border: "1px solid rgba(255, 195, 0, 0.5)" }}
								>
									<Nav.Link eventKey="first">
										How do I contact QuizBanana?{" "}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item
									style={{ border: "1px solid rgba(255, 195, 0, 0.5)" }}
								>
									<Nav.Link eventKey="second">How can I create quiz?</Nav.Link>
								</Nav.Item>
								<Nav.Item
									style={{ border: "1px solid rgba(255, 195, 0, 0.5)" }}
								>
									<Nav.Link eventKey="thrid">
										How do I analyze survey results?
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content
								style={{ border: "1px solid rgba(255, 195, 0, 0.5)", padding: "5px" }}
							>
								<Tab.Pane eventKey="first">
									<span style={{ fontWeight: 500 }}>Email: </span>
									<br />
									We offer 24/7 English email support for all customers! In
									order to keep your account secure, please contact us from the
									email address on file for your account.
									<br />
									<br />
									<span style={{ fontWeight: 500 }}>Phone: </span>
									<br />
									We also offer phone support Mon-Fri from 8am-5pm Pacific Time.
									<br />
									<br />
									You can find our contact information below.
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<span style={{ fontWeight: 500 }}>Creating Quiz</span>
									<br />
									Proceed to dashboard by clicking Dashboard on the top right
									corner of the website. Then click on the create quiz panel.
									Detailed instructions are listed on the page. <br />
									<br />
									<span style={{ fontWeight: 500 }}>Question Type</span>
									<br />
									We offer multiple quiz types. There are true/false, single
									choice, multiple selections, and free response. The settings
									within a question allow you to control the type of data the
									question can be. Make sure you pick the right question type
									for your quiz. <br />
									<br />
									<span style={{ fontWeight: 500 }}>Adding and Editing</span>
									<br />
									Add new questions to your quiz by inputting required fields
									and clicking Add Question button. You can edit the quiz
									anytime before you press Complete to submit the quiz. Quiz can
									be deleted from the past quizzes panel.
								</Tab.Pane>
								<Tab.Pane eventKey="thrid">
									<span style={{ fontWeight: 500 }}>
										Understanding Quiz Results
									</span>
									<br />
									View past quizzes panel will display all quizzes you have
									created. Click on one of them to see the results. You can see
									a summary view of your quiz information, statistics,
									completion status, and graph of scores. Browse or grade
									individual respondent results by clicking a specific responder
									under Ranking & Individual Results. <br />
									<br />
									<span style={{ fontWeight: 500 }}>
										Missing and Graded Responses
									</span>
									<br />
									All quiz questions will be automatically graded based on your
									quiz data except free response question type. You are able to
									grade these by clicking on the link under Ranking & Individual
									Results table. All quiz questions submitted blank will
									automatically receive 0 points.
									<br />
									<br />
									<span style={{ fontWeight: 500 }}>Sharing Quiz Results</span>
									<br />
									Unfortunately, we do not support the quiz sharing at this
									moment. We are trying our best to provide sharing service as
									soon as possible. <br />
									<br />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
			<div>
				<Container style={{ marginTop: 30, marginBottom: 15 }}>
					<span className="mb-1 h3" style={{ marginBottom: 5 }}>
						{" "}
						Contact Us{" "}
					</span>
					<br />
					<br />
					QuizBanana’s mission is to be "Earth’s most customer-centric company",
					and our Customer Service Team is an essential part of that mission.
					Through our innovative and technologies developed by our development
					team, we support customers from multiple locations around the nation.
					We consider each contact an opportunity to advocate for customers and
					provide support via phone and email. Working in a dynamic and fast
					paced environment, our team is continuously raising the bar on
					customer experience by advocating and inventing for customers, playing
					a key role in leading the way towards QuizBanana’s ultimate goal to be
					Earth’s most customer-centric company.
					<br />
					<br />
					Phone: (123) 789 - 5678
					<br />
					Email: quizbanana@quizbanana.com
				</Container>
			</div>
		</div>
	);
};

export default ContactUs;
