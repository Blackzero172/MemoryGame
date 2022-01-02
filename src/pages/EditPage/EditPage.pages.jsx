import React from "react";
import EditCard from "../../components/EditCard/EditCard.components";
import "./EditPage.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const EditPage = ({ cards }) => {
	const customCards = cards.filter((card) => card.id > 18);
	return (
		<div className="main-container">
			<CustomButton styleClass="add-btn">
				<i className="fas fa-plus"></i>
			</CustomButton>
			<div className="card-grid">
				{customCards.map((card) => {
					return <EditCard card={card} key={card.id} />;
				})}
			</div>
		</div>
	);
};
export default EditPage;
