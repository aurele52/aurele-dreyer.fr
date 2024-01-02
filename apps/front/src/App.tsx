import "./App.css";
import Navbar from "./main-page/Navbar/Navbar";
import Background from "./main-page/Background/Background";
import { AppState } from "./reducers";
import { useSelector } from "react-redux";

function App() {
	const { displayFilter, zIndexFilter } = useSelector((state: AppState) => {
		const modalWindow = state.windows.find(
			(window) => window.content.type === "MODAL"
		);

		if (modalWindow) {
			return {
				displayFilter: "block",
				zIndexFilter: modalWindow.zindex || 0,
			};
		} else {
			return {
				displayFilter: "none",
				zIndexFilter: 0,
			};
		}
	});
	return (
		<div className="App">
			<div
				className="Filter"
				style={{ display: displayFilter, zIndex: zIndexFilter }}
			></div>
			<Navbar />
			<Background />
		</div>
	);
}

export default App;
