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
function App() {
	const [cards, setCards] = useState([]);
	const [flippedCards, selectCard] = useState([]);
	const [diffucltyLevel, setDiffuclty] = useState("Easy");
	const [filteredCards, filterCards] = useState([]);
	const [correctPairs, setPairs] = useState(0);
	useEffect(() => {
		const getCards = async () => {
			const { data } = await api.get();
			setCards(data);
		};
		getCards();
	}, []);
	const flipCard = (e) => {
		selectCard([...flippedCards, e.target.getAttribute("card")]);
		e.target.classList.toggle("flipped");
		if (flippedCards.length >= 2) {
			checkCards();
		}
	};
	const checkCards = () => {
		if (flippedCards[0].answer === flippedCards[1].answer) {
			setPairs(correctPairs + 1);
			selectCard([]);
		} else {
			flippedCards.forEach((card) => {
				card.classList.remove("flipped");
				selectCard([]);
			});
		}
	};
	const selectDiffuclty = (e) => {
		setDiffuclty(e.target.diff);
	};
	return (
		<BrowserRouter>
			<Header />
			<Route path="/" exact>
				<LandingPage selectDiffuclty={selectDiffuclty} />
			</Route>
			<Route path="/play">
				<PlayPage cards={cards} flipCard={flipCard} />
			</Route>
			<Route path="/edit">
				<EditPage />
			</Route>
		</BrowserRouter>
	);
}

export default App;
