import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, classes, onClick }) => {
	return (
		<button type="button" className={classes} onClick={onClick}>
			{children} {text}
		</button>
	);
};
export default CustomButton;
