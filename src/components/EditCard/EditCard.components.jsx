import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./EditCard.styles.css";
const EditCard = ({ card }) => {
	return (
		<div className="edit-card">
			{card.answer}
			<CustomButton>Edit</CustomButton>
		</div>
	);
};
export default EditCard;
