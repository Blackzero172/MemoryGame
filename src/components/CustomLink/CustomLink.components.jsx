import React from "react";
import { Link } from "react-router-dom";
import "./CustomLink.styles.css";
const CustomLink = ({ text, children, path, onClick }) => {
	return (
		<Link to={path} onClick={onClick}>
			{children} {text}
		</Link>
	);
};
export default CustomLink;
