import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./Popup.styles.css";
const Popup = ({ children, confirmText, cancelText, isError, err, popRef, title, onConfirm, onCancel }) => {
	return (
		<div className={isError ? "error popup-container hidden" : "popup-container hidden"} ref={popRef}>
			<div className="window">
				<h2>{title}</h2>
				<div className="message">{isError ? err : children}</div>

				<div className="button-container">
					<CustomButton onClick={onConfirm}>{confirmText}</CustomButton>
					<CustomButton
						onClick={onCancel}
						style={cancelText === "" || !cancelText ? { display: "none" } : {}}
						styleClass="cancel"
					>
						{cancelText}
					</CustomButton>
				</div>
			</div>
		</div>
	);
};
export default Popup;
