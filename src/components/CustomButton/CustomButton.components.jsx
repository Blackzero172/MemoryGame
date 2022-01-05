import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./CustomButton.styles.css";
const CustomButton = ({ children, style, styleClass, onClick, id, action }) => {
	return (
		<button type="button" className={styleClass} style={style} onClick={onClick} id={id} action={action}>
			{children}
		</button>
	);
};
export default CustomButton;
