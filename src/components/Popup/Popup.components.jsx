import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
const Popup = ({ children, buttonText, isError, err }) => {
	return (
		<div>
			<div className="message">{children}</div>

			<CustomButton>{buttonText}</CustomButton>
		</div>
	);
};
