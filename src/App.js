import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import LandingPage from "./pages/LandingPage/LandingPage.pages";
import EditPage from "./pages/EditPage/EditPage.pages";
import Header from "./components/Header/Header.components";
function App() {
	return (
		<BrowserRouter>
			<Header />
			<Route path="/" exact>
				<LandingPage />
			</Route>
			<Route path="/play">
				<PlayPage />
			</Route>
			<Route path="/edit">
				<EditPage />
			</Route>
		</BrowserRouter>
	);
}

export default App;
