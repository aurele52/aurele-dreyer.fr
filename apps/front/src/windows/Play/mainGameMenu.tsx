
interface mainGameMenuProps {
	normalOnClick: () => void;
	createCustomOnClick: () => void;
	joinCustomOnClick: () => void;
}

export function MainGameMenu(props: mainGameMenuProps) {
	return (
		<div className="mainGameMenu">
			<button onClick={props.normalOnClick}>Normal Game</button>
			<button onClick={props.createCustomOnClick}>Create Custom Game</button>
			<button onClick={props.joinCustomOnClick}>Join Custom Game</button>
		</div>
	);
}
