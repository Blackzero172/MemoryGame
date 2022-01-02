import React from "react";

const CustomButton = ({ children, style, styleClass }) => {
	return (
		<button type="button" className={styleClass} style={style}>
			{children}
		</button>
	);
};
export default CustomButton;
