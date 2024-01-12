import "./mainGameMenu.css";
import {lol} from "shared"

interface mainGameMenuProps {
	normalOnClick: () => void;
	createCustomOnClick: () => void;
	joinCustomOnClick: () => void;
}

export function MainGameMenu(props: mainGameMenuProps) {
	return (
		<div className="mainGameMenu">
			{lol}
			<button className="joinNormalButton" onClick={props.normalOnClick}>Normal Game</button>
			<button className="joinCustomButton" onClick={props.createCustomOnClick}>Create Custom Game</button>
			<button className="createCustomButton" onClick={props.joinCustomOnClick}>Join Custom Game</button>
		</div>
	);
}
