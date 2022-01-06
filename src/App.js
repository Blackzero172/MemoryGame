import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import LandingPage from "./pages/LandingPage/LandingPage.pages";
import EditPage from "./pages/EditPage/EditPage.pages";
import Header from "./components/Header/Header.components";
import Spinner from "./components/Spinner/Spinner.components";
import api from "./components/API/api";
import Popup from "./components/Popup/Popup.components";
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
let timerDuration = 0;

let intervalID;
function App() {
	const [cards, setCards] = useState([]);
	const [flippedCards, selectCard] = useState([]);
	const [cardsInPlay, chooseCards] = useState([]);
	const [difficultyLevel, setDifficulty] = useState("");
	const [correctPairs, setPairs] = useState(0);
	const [currentEditCard, setEditCard] = useState({});
	const [winText, setText] = useState("");
	const [error, setError] = useState("");
	const winLoseRef = useRef();
	const deleteRef = useRef();
	const errorRef = useRef();
	const gridRef = useRef();
	const timerRef = useRef();
	const spinnerRef = useRef();
	const editMenuRef = useRef();
	const keywordInputRef = useRef();
	const imgURLInputRef = useRef();

	const getCards = async () => {
		try {
			const { data } = await api.get();
			setCards(data);
		} catch (err) {
			if (err.toString().includes("404")) setError("API request failed , Please try again later");
			else if (err.toString().includes("Network Error"))
				setError("No internet connection , Please check your internet and try again");
			errorRef.current.classList.remove("hidden");
		} finally {
			spinnerRef.current.classList.add("hidden");
		}
	};
	useEffect(() => {
		getCards();
		// eslint-disable-next-line
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
		if (correctPairs === cardsInPlay.length / 2 && cardsInPlay.length > 0) handleWinLose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctPairs]);
	const handleWinLose = () => {
		setText(timerDuration > 0 ? "Congratulations, You Win!!" : "You Lose!!");
		clearInterval(intervalID);
		winLoseRef.current.classList.remove("hidden");
	};
	const selectDiffculty = (e) => {
		setPairs(0);
		let numOfPairs = 0;
		selectCard([]);
		clearInterval(intervalID);
		if (e.target.innerText === "Easy" || e.target.innerText === "Medium" || e.target.innerText === "Hard") {
			setDifficulty(e.target.innerText);
			timerDuration = e.target.innerText === "Easy" ? 32000 : e.target.innerText === "Medium" ? 30000 : 25000;
			numOfPairs = e.target.innerText === "Easy" ? 8 : 18;
			if (gridRef.current) gridRef.current.className = e.target.innerText;
		} else if (difficultyLevel) {
			winLoseRef.current.classList.add("hidden");
			timerDuration = difficultyLevel === "Easy" ? 32000 : difficultyLevel === "Medium" ? 30000 : 25000;
			numOfPairs = difficultyLevel === "Easy" ? 8 : 18;
		}
		const cardsCopy = [...cards];
		activateTimer();
		const diffCards = [];
		for (let i = 0; i < numOfPairs; i++) {
			const randNum = Math.floor(Math.random() * cardsCopy.length);
			diffCards.push(cardsCopy[randNum]);
			cardsCopy.splice(randNum, 1);
		}

		chooseCards(shuffle([...diffCards, ...diffCards]));
	};
	useEffect(() => {
		if (gridRef.current && difficultyLevel !== "") gridRef.current.className = difficultyLevel;
	}, [difficultyLevel]);
	const reset = () => {
		setDifficulty("");
		clearInterval(intervalID);
		if (winLoseRef.current) winLoseRef.current.classList.add("hidden");
	};
	const activateTimer = () => {
		const ratio = timerDuration / 100;
		intervalID = setInterval(() => {
			if (timerDuration > 0) timerDuration -= 100;
			else if (timerDuration <= 0) {
				handleWinLose();
			}
			if (timerRef.current) {
				timerRef.current.style.width = `${timerDuration / ratio}%`;
			}
		}, 100);
	};
	const onButtonClick = (e) => {
		if (e.target.id) {
			setEditCard(cards.find((card) => card.id === e.target.id));
			if (e.target.getAttribute("action") === "Delete") confirmCancelDelete(e);
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
	const confirmCancelDelete = (e) => {
		if (!deleteRef.current.classList.contains("hidden"))
			if (e.target.classList.contains("cancel")) {
				deleteRef.current.classList.add("hidden");
			} else deleteItem(currentEditCard.id);
		else deleteRef.current.classList.remove("hidden");
	};
	const deleteItem = async (id) => {
		deleteRef.current.classList.add("hidden");
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
				<PlayPage
					cards={cardsInPlay}
					flipCard={flipCard}
					gridRef={gridRef}
					timerRef={timerRef}
					winLoseRef={winLoseRef}
					onConfirm={selectDiffculty}
					onCancel={reset}
					text={winText}
				/>
			</Route>
			<Route path="/edit">
				<EditPage
					cards={cards}
					editItem={onButtonClick}
					currentEditCard={currentEditCard}
					keywordInputRef={keywordInputRef}
					imgURLInputRef={imgURLInputRef}
					popRef={editMenuRef}
					onConfirmEdit={showHideMenu}
					onCancelEdit={showHideMenu}
					onConfirmDelete={confirmCancelDelete}
					onCancelDelete={confirmCancelDelete}
					deleteRef={deleteRef}
				/>
			</Route>
			<Spinner spinnerRef={spinnerRef} />
			<Popup isError err={error} popRef={errorRef} />
		</BrowserRouter>
	);
}

export default App;
