import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({ placeholder, type, label, inputRef }) => {
	return (
		<div className="container">
			<label htmlFor={label}>{label}</label>
			<input type={type} placeholder={placeholder} name={label} id={label} ref={inputRef} />
		</div>
	);
};
CustomInput.defaultProps = { type: "text" };
export default CustomInput;
