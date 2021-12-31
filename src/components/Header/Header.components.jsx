import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = ({ reset }) => {
	return (
		<nav>
			<Link to="/" onClick={reset}>
				Home
			</Link>
			<Link to="/edit">Edit Cards</Link>
		</nav>
	);
};
export default Header;
