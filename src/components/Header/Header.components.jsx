import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/edit">Edit Cards</Link>
		</nav>
	);
};
export default Header;
