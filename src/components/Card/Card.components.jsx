import "./Card.styles.css";
import React from "react";
const Card = ({ card, onClick }) => {
	return (
		<div className="card" onClick={onClick} card={card}>
			<div className="front face"></div>
			<div className="back face">
				<p>{card.answer}</p>
			</div>
		</div>
	);
};
export default Card;
