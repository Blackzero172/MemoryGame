import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import LandingPage from "./pages/LandingPage/LandingPage.pages";
import EditPage from "./pages/EditPage/EditPage.pages";
import Header from "./components/Header/Header.components";
import api from "./components/API/api";
import { useState, useEffect, useRef } from "react";
const shuffle = (array) => {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};
let intervalID;
function App() {
	const [cards, setCards] = useState([]);
	const [flippedCards, selectCard] = useState([]);
	const [filteredCards, filterCards] = useState([]);
	const [correctPairs, setPairs] = useState(0);
	let timerDuration = 0;
	const gridRef = useRef();
	const timerRef = useRef();

	useEffect(() => {
		const getCards = async () => {
			const { data } = await api.get();
			setCards(data);
		};
		getCards();
	}, []);
	const flipCard = (e) => {
		if (flippedCards.length < 2 && !e.target.classList.contains("flipped")) {
			selectCard([...flippedCards, e.target]);
			e.target.classList.toggle("flipped");
		}
	};
	useEffect(() => {
		checkCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flippedCards]);
	const checkCards = () => {
		if (flippedCards.length >= 2) {
			if (flippedCards[0].getAttribute("answer") === flippedCards[1].getAttribute("answer")) {
				setPairs(correctPairs + 1);
				flippedCards.forEach((card) => {
					card.classList.add("correct");
					selectCard([]);
				});

				selectCard([]);
			} else {
				setTimeout(() => {
					flippedCards.forEach((card) => {
						card.classList.remove("flipped");
						selectCard([]);
					});
				}, 500);
			}
		}
	};
	useEffect(() => {
		if (correctPairs === filteredCards.length / 2 && filteredCards.length > 0) handleWin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctPairs]);
	const handleWin = () => {
		console.log(intervalID);
		clearInterval(intervalID);
	};
	const selectDiffculty = (e) => {
		const cardsCopy = [...cards];
		timerDuration = e.target.innerText === "Easy" ? 24000 : e.target.innerText === "Medium" ? 14000 : 12000;
		clearInterval(intervalID);
		activateTimer();
		const diffCards = [];
		for (let i = 0; i < 8; i++) {
			const randNum = Math.floor(Math.random() * cardsCopy.length);
			diffCards.push(cardsCopy[randNum]);
			cardsCopy.splice(randNum, 1);
		}
		filterCards(shuffle([...diffCards, ...diffCards]));
	};
	const reset = () => {
		clearInterval(intervalID);
	};
	const activateTimer = () => {
		const ratio = timerDuration / 100;
		intervalID = setInterval(() => {
			if (timerDuration > 0) timerDuration -= 100;
			if (timerRef.current) {
				timerRef.current.style.width = `${timerDuration / ratio}%`;
			}
		}, 100);
	};
	return (
		<BrowserRouter>
			<Header reset={reset} />
			<Route path="/" exact>
				<LandingPage selectDiffculty={selectDiffculty} />
			</Route>
			<Route path="/play">
				<PlayPage cards={filteredCards} flipCard={flipCard} gridRef={gridRef} timerRef={timerRef} />
			</Route>
			<Route path="/edit">
				<EditPage />
			</Route>
		</BrowserRouter>
	);
}

export default App;
