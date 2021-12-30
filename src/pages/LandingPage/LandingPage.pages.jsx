import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import "./LandingPage.styles.css";
const LandingPage = ({ selectDiffuclty }) => {
	return (
		<div className="landing-container">
			<h2>Memory Game</h2>
			<CustomLink text="Easy" path="/play" onClick={selectDiffuclty} diff="Easy" />
			<CustomLink text="Medium" path="/play" onClick={selectDiffuclty} diff="Medium" />
			<CustomLink text="Hard" path="/play" onClick={selectDiffuclty} diff="Hard" />
			<CustomLink text="Custom" path="/play" onClick={selectDiffuclty} diff="Custom" />
		</div>
	);
};
export default LandingPage;
