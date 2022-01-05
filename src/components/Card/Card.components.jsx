import "./Card.styles.css";
import React from "react";
const hideImg = (e) => {
	e.target.classList.add("not-found");
};
const Card = ({ card, onClick }) => {
	return (
		<div className="card" onClick={onClick} answer={card.answer}>
			<div className="front face"></div>
			<div className="back face">
				<img src={card.imageURL} alt="Card" onError={hideImg} />
				<p className="text-hidden">{card.answer}</p>
			</div>
		</div>
	);
};
export default Card;
