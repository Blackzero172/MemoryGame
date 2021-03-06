import React, { useEffect } from "react";
import Card from "../../components/Card/Card.components";
import "./PlayPage.styles.css";
import Popup from "../../components/Popup/Popup.components";
import { useHistory } from "react-router-dom";
const PlayPage = ({ cards, flipCard, gridRef, timerRef, winLoseRef, onCancel, onConfirm, text }) => {
	let history = useHistory();
	const navigate = () => {
		onCancel();
		history.push("/");
	};
	useEffect(() => {
		if (cards.length === 0) navigate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const resetBoard = () => {
		if (gridRef.current.children.length > 0) {
			[...gridRef.current.children].forEach((card) => {
				card.classList.remove("flipped", "correct");
			});
		}
	};

	return (
		<div>
			<div className="timer" ref={timerRef}></div>
			<div id="card-grid" ref={gridRef}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} onClick={flipCard} />;
				})}
			</div>
			<Popup
				popRef={winLoseRef}
				title={text}
				confirmText="Play Again"
				cancelText="Home"
				onConfirm={(e) => {
					onConfirm(e);
					resetBoard();
				}}
				onCancel={navigate}
			></Popup>
		</div>
	);
};
PlayPage.defaultProps = { cards: [] };
export default PlayPage;
