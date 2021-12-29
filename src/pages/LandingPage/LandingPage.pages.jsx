import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import "./LandingPage.styles.css";
const LandingPage = () => {
	return (
		<div className="landing-container">
			LandingPage
			<CustomLink text="Easy" />
			<CustomLink text="Medium" />
			<CustomLink text="Hard" />
			<CustomLink text="Custom" />
		</div>
	);
};
export default LandingPage;
