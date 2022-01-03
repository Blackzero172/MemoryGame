import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./EditCard.styles.css";
const EditCard = ({ card, onClick }) => {
	return (
		<div className="edit-card">
			<p className="card-name">Card Id: {card.id}</p>
			<div className="card-answer">
				<p>Answer:</p>
				<p>{card.answer}</p>
			</div>
			<div className="button-contain">
				<CustomButton onClick={onClick} id={card.id} action="Edit">
					<i className="fas fa-edit"></i> Edit
				</CustomButton>
				<CustomButton onClick={onClick} id={card.id} action="Delete">
					<i className="fas fa-trash"></i> Delete
				</CustomButton>
			</div>
		</div>
	);
};
export default EditCard;
