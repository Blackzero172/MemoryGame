import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./Popup.styles.css";
const Popup = ({ children, buttonText, isError, err, popRef }) => {
	return (
		<div className={isError ? "error popup-container hidden" : "popup-container hidden"} ref={popRef}>
			<div className="window">
				<div className="message">{isError ? err : children}</div>

				<CustomButton>{buttonText}</CustomButton>
			</div>
		</div>
	);
};
export default Popup;
