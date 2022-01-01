import React from "react";
import "./Spinner.styles.css";
const Spinner = ({ spinnerRef }) => {
	return (
		<div className="spinner" ref={spinnerRef}>
			<div class="color-dots">
				<div class="dot-1"></div>
				<div class="dot-2"></div>
				<div class="dot-3"></div>
			</div>
		</div>
	);
};
export default Spinner;
