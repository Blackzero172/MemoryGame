import React from "react";
import Card from "../../components/Card/Card.components";
import "./PlayPage.styles.css";

const PlayPage = ({ cards, flipCard }) => {
	return (
		<div>
			<div className="card-grid">
				{cards.map((card, index) => {
					return <Card key={index} card={card} onClick={flipCard} />;
				})}
			</div>
		</div>
	);
};
PlayPage.defaultProps = { cards: [] };
export default PlayPage;
