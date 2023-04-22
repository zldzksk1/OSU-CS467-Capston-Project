import React, { Fragment, useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth, logout } from "../../context/auth/AuthState";

import { Nav, Navbar, Container } from "react-bootstrap";
import GreetContext from "../../context/NavText/GreetContext";

//https://www.codegrepper.com/code-examples/html/horizontal+line+html+react
const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 4,
			marginTop: 0,
		}}
	/>
);

const Navigation = (props) => {
	const [authState, authDispatch] = useAuth();
	const { isAuthenticated, user } = authState;
	const { greeting, setGreeting } = useContext(GreetContext);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/contact") {
			setGreeting("Customer Service");
		} else if (location.pathname === "/account") {
			setGreeting("Manage Account");
		} else if (location.pathname === "/editprofile") {
			setGreeting("Edit Profile");
		} else if (location.pathname === "/quizlist") {
			setGreeting("Quiz List");
		} else if (location.pathname.substring(0, location.pathname.lastIndexOf("/")) === "/quiz") {
			setGreeting("Quiz Stats");
		} else if (location.pathname === "/createquiz") {
			setGreeting("Create Quiz");
		} else if (location.pathname.substring(0, location.pathname.lastIndexOf("/")) === "/sendquiz") {
			setGreeting("Send Quiz");
		} else {
            setGreeting('Welcome');
        }
	}, [location, location.pathname, setGreeting, authDispatch]);

	const onLogout = () => {
		logout(authDispatch);
	};

	return (
		<Fragment>
			<Navbar>
				<Container
					className="justify-content-end"
					style={{ paddingRight: "2%", marginBottom: -10 }}
				>
					<img src={require("../../assets/logo_small_two.png")} />
				</Container>
			</Navbar>
			<Navbar style={{ paddingBottom: 0 }}>
				<Container>
					<Navbar.Brand style={{ padding: "0.3rem", fontSize: "1.4rem" }}>
						{greeting}{" "}
						{location.pathname === "/" &&
							isAuthenticated &&
							user &&
							user.firstName}{" "}
						{location.pathname === "/" &&
							isAuthenticated &&
							user &&
							user.lastName}
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text style={{ paddingRight: 20 }}>
							<span className="navFont">
								<Nav.Link href="/">Dashboard</Nav.Link>
							</span>
						</Navbar.Text>
						<Navbar.Text>
							<span className="navFont">
								<Nav.Link onClick={onLogout} to="/login">
									Logout
								</Nav.Link>
							</span>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div>
				<ColoredLine color="#FFC300" />
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
