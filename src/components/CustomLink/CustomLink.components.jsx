import React from "react";
import { Link } from "react-router-dom";
import "./CustomLink.styles.css";
const CustomLink = ({ text, children, path }) => {
	return (
		<Link to={path}>
			{children} {text}
		</Link>
	);
};
export default CustomLink;
