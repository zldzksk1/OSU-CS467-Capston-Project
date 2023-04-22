import React from "react";

const Footer = () => (
	<div className="footer">
		<p style={{margin: 0}}>
			<small>
				{" "}
				Copyright &copy; {new Date().getFullYear()}, QuizBanana. All Rights
				Reserved
			</small>
		</p>
	</div>
);

export default Footer;