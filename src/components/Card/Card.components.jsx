import "./Card.styles.css";
import React, { useRef } from "react";

const Card = ({ card, onClick }) => {
	const hideText = () => {
		altRef.current.classList.add("not-found");
	};
	const hideImg = (e) => {
		e.target.classList.add("not-found");
	};
	const altRef = useRef();
	return (
		<div className="card" onClick={onClick} answer={card.answer}>
			<div className="front face">{card.answer}</div>
			<div className="back face">
				<img src={card.imageURL} alt="Card" onError={hideImg} onLoad={hideText} />
				<p className="text-hidden" ref={altRef}>
					{card.answer}
				</p>
			</div>
		</div>
	);
};
export default Card;
