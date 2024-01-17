import { useEffect, useState } from "react";
import "./CreateCustom.css";
import ColorSelectorComponent from "./ColorSelectorComponent";
import { gameInfo } from "shared/src/gameInfo.interface";
import { normalGameInfo } from "shared/src/normalGameInfo";
import { socket } from "../../../socket";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import store from "../../../store";
import { addWindow, delWindow } from "../../../reducers";
import RangeComponent from "../JoinGame/RangeComponent";
import CheckboxComponent from "./CheckboxComponent";

interface createCustomProps {
	onCreateLobby: () => void;
}

export default function CreateCustom(props: createCustomProps) {
	const [interfaceDisplay, setInterfaceDisplay] = useState<boolean>(false);
	const [gameDisplay, setGameDisplay] = useState<boolean>(true);
	const [PowerUpDisplay, setPowerUpDisplay] = useState<boolean>(false);

	const [relativeGameInfo, setRelativeGameInfo] = useState<gameInfo>({
		...normalGameInfo,
		numberSize: 100,
		barLarge: (normalGameInfo.barLarge / normalGameInfo.gamexsize) * 100,
		menuSize:
			(normalGameInfo.menuSize /
				Math.min(normalGameInfo.gamexsize, normalGameInfo.gameysize)) *
			100,
		numberTopDist:
			(normalGameInfo.numberTopDist /
				Math.min(normalGameInfo.gamexsize, normalGameInfo.gameysize)) *
			100,
		numberSideDist:
			(normalGameInfo.numberSideDist /
				Math.min(normalGameInfo.gamexsize, normalGameInfo.gameysize)) *
			100,
		ballSize:
			(normalGameInfo.ballSize /
				Math.min(normalGameInfo.gamexsize, normalGameInfo.gameysize)) *
			100,
		ballSpeed: (normalGameInfo.ballSpeed / normalGameInfo.gamexsize) * 100,
		barSize: (normalGameInfo.barSize / normalGameInfo.gameysize) * 100,
		barDist: (normalGameInfo.barDist / normalGameInfo.gamexsize) * 100,
		barSpeed: (normalGameInfo.barSpeed / normalGameInfo.gamexsize) * 100,
		itemSize:
			(normalGameInfo.itemSize /
				Math.min(normalGameInfo.gamexsize, normalGameInfo.gameysize)) *
			100,
	});
	const [absoluteGameInfo, setAbsoluteGameInfo] =
		useState<gameInfo>(normalGameInfo);

	const setValue = (name: string, value: number | string) => {
		setRelativeGameInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const setAbsoluteValue = () => {
		setAbsoluteGameInfo(() => ({
			...relativeGameInfo,
			barLarge:
				(relativeGameInfo.barLarge * relativeGameInfo.gamexsize) / 100,
			menuSize:
				(relativeGameInfo.menuSize * relativeGameInfo.gameysize) / 100,
			numberSize:
				(relativeGameInfo.numberSize *
					(relativeGameInfo.gameysize * relativeGameInfo.menuSize)) /
				100000,
			numberTopDist:
				(relativeGameInfo.numberTopDist *
					Math.min(
						relativeGameInfo.gamexsize,
						relativeGameInfo.gameysize
					)) /
				100,
			numberSideDist:
				(relativeGameInfo.numberSideDist *
					Math.min(
						relativeGameInfo.gamexsize,
						relativeGameInfo.gameysize
					)) /
				100,
			ballSize:
				(relativeGameInfo.ballSize *
					Math.min(
						relativeGameInfo.gamexsize,
						relativeGameInfo.gameysize
					)) /
				100,
			ballSpeed:
				(relativeGameInfo.ballSpeed * relativeGameInfo.gamexsize) / 100,
			barSize:
				(relativeGameInfo.barSize * relativeGameInfo.gameysize) / 100,
			barDist:
				(relativeGameInfo.barDist * relativeGameInfo.gamexsize) / 100,
			barSpeed:
				(relativeGameInfo.barSpeed * relativeGameInfo.gamexsize) / 100,
			itemSize:
				(relativeGameInfo.itemSize *
					Math.min(
						relativeGameInfo.gamexsize,
						relativeGameInfo.gameysize
					)) /
				100,
		}));
	};

	function PowerUpDisplayOnClick() {
		setInterfaceDisplay(false);
		setPowerUpDisplay(true);
		setGameDisplay(false);
	}
	function InterfaceDisplayOnClick() {
		setInterfaceDisplay(true);
		setPowerUpDisplay(false);
		setGameDisplay(false);
	}
	function GameDisplayOnClick() {
		setInterfaceDisplay(false);
		setPowerUpDisplay(false);
		setGameDisplay(true);
	}

	useEffect(() => {
		setAbsoluteValue();
	}, [relativeGameInfo]);

	useEffect(() => {
		socket.emit("client.previewUpdate", absoluteGameInfo);
		return () => {};
	}, [absoluteGameInfo]);
	function PreviewOnClick() {
		const memberSettingsWindow = store
			.getState()
			.windows.find((window) => window.content.type === "PREVIEW");
		if (memberSettingsWindow) {
			store.dispatch(delWindow(memberSettingsWindow.id));
		}
		const newWindow = {
			WindowName: "PREVIEW",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "PREVIEW" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		socket.emit("client.previewUpdate", absoluteGameInfo);
	}
	function onCreateLobby() {
		const memberSettingsWindow = store
			.getState()
			.windows.find((window) => window.content.type === "PREVIEW");
		if (memberSettingsWindow) {
			store.dispatch(delWindow(memberSettingsWindow.id));
		}
		props.onCreateLobby();
		socket.emit("client.createCustom", absoluteGameInfo);
	}
	return (
		<>
			<button onClick={GameDisplayOnClick}>Game Settings</button>
			<button onClick={InterfaceDisplayOnClick}>
				Interface Settings
			</button>
			<button onClick={PowerUpDisplayOnClick}>PowerUp Settings</button>
			<button onClick={PreviewOnClick}>Preview</button>
			<button onClick={onCreateLobby}>Create Lobby</button>
			<div className="CreateCustom">
				{interfaceDisplay === true && (
					<div className="customInterface">
						<ColorSelectorComponent
							name={"oneBarColor"}
							value={relativeGameInfo.oneBarColor}
							setValue={setValue}
							label="Player One Bar Color"
						/>
						<ColorSelectorComponent
							name={"twoBarColor"}
							value={relativeGameInfo.twoBarColor}
							setValue={setValue}
							label="Player Two Bar Color"
						/>
						<ColorSelectorComponent
							name={"borderColor"}
							value={relativeGameInfo.borderColor}
							setValue={setValue}
							label="Border Color"
						/>
						<ColorSelectorComponent
							name={"oneScoreColor"}
							value={relativeGameInfo.oneScoreColor}
							setValue={setValue}
							label="Player One Score Color"
						/>
						<ColorSelectorComponent
							name={"twoScoreColor"}
							value={relativeGameInfo.twoScoreColor}
							setValue={setValue}
							label="Player Two Score Color"
						/>
						<ColorSelectorComponent
							name={"ballColor"}
							value={relativeGameInfo.ballColor}
							setValue={setValue}
							label="Ball Color"
						/>
						<ColorSelectorComponent
							name={"backgroundColor"}
							value={relativeGameInfo.backgroundColor}
							setValue={setValue}
							label="Background Color"
						/>
						<ColorSelectorComponent
							name={"menuColor"}
							value={relativeGameInfo.menuColor}
							setValue={setValue}
							label="Menu Color"
						/>
						<RangeComponent
							name={"borderSize"}
							value={relativeGameInfo.borderSize}
							setValue={setValue}
							min={5}
							max={100}
							step={5}
							label="Border Size"
						/>

						<RangeComponent
							name={"numberSize"}
							value={relativeGameInfo.numberSize}
							setValue={setValue}
							min={50}
							max={100}
							step={5}
							label="Score Size (%)"
						/>

						<RangeComponent
							name={"barLarge"}
							value={relativeGameInfo.barLarge}
							setValue={setValue}
							min={0.5}
							max={5}
							step={0.5}
							label="Bar Large (%)"
						/>

						<RangeComponent
							name={"menuSize"}
							value={relativeGameInfo.menuSize}
							setValue={setValue}
							min={10}
							max={40}
							step={5}
							label="Menu Size (%)"
						/>

						<RangeComponent
							name={"numberTopDist"}
							value={relativeGameInfo.numberTopDist}
							setValue={setValue}
							min={0.5}
							max={5}
							step={0.5}
							label="Score Top Dist (%)"
						/>

						<RangeComponent
							name={"numberSideDist"}
							value={relativeGameInfo.numberSideDist}
							setValue={setValue}
							min={0.5}
							max={5}
							step={0.5}
							label="Score Side Dist (%)"
						/>
					</div>
				)}
				{gameDisplay === true && (
					<div className="customGame">
						<label>Name: </label>
						<input
							value={relativeGameInfo.name}
							onChange={(e) => setValue("name", e.target.value)}
						/>
						<RangeComponent
							name={"gamexsize"}
							value={relativeGameInfo.gamexsize}
							setValue={setValue}
							min={400}
							max={1000}
							step={50}
							label="Game Width"
						/>
						<RangeComponent
							name={"gameysize"}
							value={relativeGameInfo.gameysize}
							setValue={setValue}
							min={400}
							max={1000}
							step={50}
							label="Game Height"
						/>
						<RangeComponent
							name={"ballSize"}
							value={relativeGameInfo.ballSize}
							setValue={setValue}
							min={0.5}
							max={20}
							step={0.5}
							label="Ball Size"
						/>
						<RangeComponent
							name={"ballSpeed"}
							value={relativeGameInfo.ballSpeed}
							setValue={setValue}
							min={0.25}
							max={3}
							step={0.25}
							label="Ball Speed"
						/>
						<RangeComponent
							name={"barSize"}
							value={relativeGameInfo.barSize}
							setValue={setValue}
							min={5}
							max={50}
							step={5}
							label="Bar Size"
						/>

						<RangeComponent
							name={"barDist"}
							value={relativeGameInfo.barDist}
							setValue={setValue}
							min={2.5}
							max={30}
							step={2.5}
							label="Bar Distance"
						/>
						<RangeComponent
							name={"barSpeed"}
							value={relativeGameInfo.barSpeed}
							setValue={setValue}
							min={1}
							max={10}
							step={1}
							label="Bar Speed"
						/>
						<RangeComponent
							name={"oneScore"}
							value={relativeGameInfo.oneScore}
							setValue={setValue}
							min={0}
							max={8}
							step={1}
							label="Player One Begin Score"
						/>
						<RangeComponent
							name={"twoScore"}
							value={relativeGameInfo.twoScore}
							setValue={setValue}
							min={0}
							max={8}
							step={1}
							label="Player Two Begin Score"
						/>
						<RangeComponent
							name={"itemSize"}
							value={relativeGameInfo.itemSize}
							setValue={setValue}
							min={1}
							max={20}
							step={1}
							label="Item Size"
						/>
					</div>
				)}
				{PowerUpDisplay === true && (
					<div className="customPowerUp">
						<CheckboxComponent
							name={"upBallSize"}
							value={relativeGameInfo.upBallSize}
							setValue={setValue}
							label="Increase Ball Size"
						/>
					</div>
				)}
			</div>
		</>
	);
}
