import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import "./LandingPage.styles.css";
const LandingPage = ({ selectDiffculty }) => {
	return (
		<div className="landing-container">
			<h2>Memory Game</h2>
			<CustomLink text="Easy" path="/play" onClick={selectDiffculty} diff="Easy" />
			<CustomLink text="Medium" path="/play" onClick={selectDiffculty} diff="Medium" />
			<CustomLink text="Hard" path="/play" onClick={selectDiffculty} diff="Hard" />
		</div>
	);
};
export default LandingPage;
