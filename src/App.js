import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import LandingPage from "./pages/LandingPage/LandingPage.pages";
import EditPage from "./pages/EditPage/EditPage.pages";
import Header from "./components/Header/Header.components";
import Spinner from "./components/Spinner/Spinner.components";
import Popup from "./components/Popup/Popup.components";
import api from "./components/API/api";
import CustomInput from "./components/CustomInput/CustomInput.components";
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
	const [cardsInPlay, chooseCards] = useState([]);
	const [difficultyLevel, setDifficulty] = useState("");
	const [correctPairs, setPairs] = useState(0);
	const [currentEditCard, setEditCard] = useState({});
	let timerDuration = 0;
	const gridRef = useRef();
	const timerRef = useRef();
	const spinnerRef = useRef();
	const editMenuRef = useRef();
	const keywordInputRef = useRef();
	const imgURLInputRef = useRef();
	const getCards = async () => {
		const { data } = await api.get();
		setCards(data);
		spinnerRef.current.classList.add("hidden");
	};
	useEffect(() => {
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
		if (correctPairs === cardsInPlay.length / 2 && cardsInPlay.length > 0) handleWin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctPairs]);
	const handleWin = () => {
		clearInterval(intervalID);
	};
	const selectDiffculty = (e) => {
		setDifficulty(e.target.innerText);
		clearInterval(intervalID);
		const cardsCopy = [...cards];
		timerDuration = e.target.innerText === "Easy" ? 32000 : e.target.innerText === "Medium" ? 30000 : 25000;
		const numOfPairs = e.target.innerText === "Easy" ? 8 : 18;
		activateTimer();
		const diffCards = [];
		for (let i = 0; i < numOfPairs; i++) {
			const randNum = Math.floor(Math.random() * cardsCopy.length);
			diffCards.push(cardsCopy[randNum]);
			cardsCopy.splice(randNum, 1);
		}
		if (gridRef.current) gridRef.current.className = e.target.innerText;
		chooseCards(shuffle([...diffCards, ...diffCards]));
	};
	useEffect(() => {
		if (gridRef.current && difficultyLevel !== "") gridRef.current.className = difficultyLevel;
	});
	const reset = () => {
		setDifficulty("");
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
	const onButtonClick = (e) => {
		if (e.target.id) {
			setEditCard(cards.find((card) => card.id === e.target.id));

			if (e.target.getAttribute("action") === "Delete") deleteItem(e.target.id);
			else showHideMenu(e);
		} else showHideMenu(e);
	};
	useEffect(() => {
		if (currentEditCard.hasOwnProperty("answer")) {
			keywordInputRef.current.value = currentEditCard.answer;
			imgURLInputRef.current.value = currentEditCard.imageURL;
		}
	}, [currentEditCard]);
	const showHideMenu = async (e) => {
		if (
			keywordInputRef.current.value !== "" &&
			!editMenuRef.current.classList.contains("hidden") &&
			!e.target.classList.contains("cancel")
		) {
			editMenuRef.current.classList.add("hidden");
			if (currentEditCard === {}) await postItem();
			else await postItem(currentEditCard.id);
			getCards();
		} else if (e.target.classList.contains("cancel")) {
			editMenuRef.current.classList.add("hidden");
			clearInputs();
		} else if (!editMenuRef.current.classList.contains("hidden")) {
			if (keywordInputRef.current.value === "") {
				keywordInputRef.current.classList.add("empty-input");
				setTimeout(() => {
					keywordInputRef.current.classList.remove("empty-input");
				}, 1500);
			}
		} else {
			editMenuRef.current.classList.remove("hidden");
		}
	};
	const clearInputs = () => {
		keywordInputRef.current.value = "";
		imgURLInputRef.current.value = "";
		setEditCard({});
	};
	const postItem = async (id) => {
		spinnerRef.current.classList.remove("hidden");
		if (id) {
			await api.put(id, {
				answer: keywordInputRef.current.value,
				imageURL: imgURLInputRef.current.value,
			});
			setEditCard({});
		} else
			await api.post("", {
				answer: keywordInputRef.current.value,
				imageURL: imgURLInputRef.current.value,
			});
		keywordInputRef.current.value = "";
		imgURLInputRef.current.value = "";
		spinnerRef.current.classList.add("hidden");
	};
	const deleteItem = async (id) => {
		spinnerRef.current.classList.remove("hidden");
		await api.delete(id);
		getCards();
		spinnerRef.current.classList.add("hidden");
	};
	return (
		<BrowserRouter>
			<Header reset={reset} />
			<Route path="/" exact>
				<LandingPage selectDiffculty={selectDiffculty} />
			</Route>
			<Route path="/play">
				<PlayPage cards={cardsInPlay} flipCard={flipCard} gridRef={gridRef} timerRef={timerRef} />
			</Route>
			<Route path="/edit">
				<EditPage cards={cards} editItem={onButtonClick} />
			</Route>
			<Spinner spinnerRef={spinnerRef} />
			<Popup
				buttonText={
					currentEditCard.hasOwnProperty("answer") ? (
						<i className="fas fa-edit"></i>
					) : (
						<i className="fas fa-plus"></i>
					)
				}
				popRef={editMenuRef}
				title={currentEditCard.hasOwnProperty("answer") ? "Edit Card" : "Add Card"}
				editItem={showHideMenu}
			>
				<CustomInput
					placeholder="Please Input The Keyword"
					label="Keyword (Required)"
					value={currentEditCard.hasOwnProperty("answer") ? currentEditCard.answer : ""}
					inputRef={keywordInputRef}
				/>
				<CustomInput
					placeholder="Please Input The Icon URL"
					label="Icon Link (Optional)"
					value={currentEditCard.hasOwnProperty("imageURL") ? currentEditCard.imageURL : ""}
					inputRef={imgURLInputRef}
				/>
			</Popup>
		</BrowserRouter>
	);
}

export default App;
