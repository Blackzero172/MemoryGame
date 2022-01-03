import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({ placeholder, type, label }) => {
	return (
		<div className="container">
			<label htmlFor={label}>{label}</label>
			<input type={type} placeholder={placeholder} name={label} id={label} />
		</div>
	);
};
CustomInput.defaultProps = { type: "text" };
export default CustomInput;
