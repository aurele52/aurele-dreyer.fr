import "./EnglishMenu.css";
import { useState } from "react";
import List from "./list";
import QCM from "./QCM";
import AddWord from "./addWord";

export default function EnglishMenu() {
	const [englishMenuDisplay, setEnglishMenuDisplay] = useState<boolean>(true);
	const [listDisplay, setListDisplay] = useState<boolean>(false);
	const [QCMDisplay, setQCMDisplay] = useState<boolean>(false);
	const [AddWordDisplay, setAddWordDisplay] = useState<boolean>(false);

	function addWordButtonOnClick() {
		setEnglishMenuDisplay(false);
		setAddWordDisplay(true);
	}
	function listButtonOnClick() {
		setEnglishMenuDisplay(false);
		setListDisplay(true);
	}
	function QCMButtonOnClick() {
		setEnglishMenuDisplay(false);
		setQCMDisplay(true);
	}
	function returnToMenu() {
		setEnglishMenuDisplay(true);
		setQCMDisplay(false);
		setListDisplay(false);
		setAddWordDisplay(false);
	}
	const mainMenu = (
		<div className="game-menu">
				<div
					className="addWord-button"
					onClick={addWordButtonOnClick}
				>
					Add Word
				</div>
				<div
					className="QCM-button"
					onClick={QCMButtonOnClick}
				>
					QCM
				</div>
				<div
					className="list-button"
					onClick={listButtonOnClick}
				>
					List
				</div>
		</div>
	);

	return (
		<>
			{englishMenuDisplay === true && mainMenu}
			{listDisplay === true && <List returnToMenu={returnToMenu}/>}
			{QCMDisplay === true && <QCM returnToMenu={returnToMenu}/>}
			{AddWordDisplay === true && <AddWord returnToMenu={returnToMenu}/>}
		</>
	);
}
