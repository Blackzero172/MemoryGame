import React from "react";
import Card from "../../components/Card/Card.components";
import "./PlayPage.styles.css";

const PlayPage = ({ cards, flipCard, gridRef, timerRef }) => {
	return (
		<div>
			<div className="timer" ref={timerRef}></div>
			<div id="card-grid" ref={gridRef}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} onClick={flipCard} />;
				})}
			</div>
		</div>
	);
};
PlayPage.defaultProps = { cards: [] };
export default PlayPage;
