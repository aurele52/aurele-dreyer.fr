import { useEffect, useState } from 'react';
import './CreateCustom.css';
import ColorSelector from './ColorSelector';
import { gameInfo } from 'shared/src/gameInfo.interface';
import { normalGameInfo } from 'shared/src/normalGameInfo';
import { socket } from '../../../socket';
import { HBButton, WinColor } from '../../../shared/utils/WindowTypes';
import store from '../../../store';
import { addWindow } from '../../../reducers';
import RangeSlider from '../JoinGame/RangeSlider';

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
	return(
			<div className="create-custom">
				<div className="header-createcustom">
					<button onClick={GameDisplayOnClick}>Game Settings</button>
					<button onClick={InterfaceDisplayOnClick}>Interface Settings</button>
					<button onClick={PreviewOnClick}>Preview</button>
				</div>

				
				{interfaceDisplay === true && 
				<div className="custom-interface">
					<ColorSelector name={"oneBarColor"} value={gameInfo.oneBarColor} setValue={setValue} label='P1 BAR :' />
					<ColorSelector name={"twoBarColor"} value={gameInfo.twoBarColor} setValue={setValue} label='P2 BAR :' />
					<ColorSelector name={"borderColor"} value={gameInfo.borderColor} setValue={setValue} label='BORDER :' />
					<ColorSelector name={"oneScoreColor"} value={gameInfo.oneScoreColor} setValue={setValue} label='P1 SCORE :' />
					<ColorSelector name={"twoScoreColor"} value={gameInfo.twoScoreColor} setValue={setValue} label='P2 SCORE :' />
					<ColorSelector name={"ballColor"} value={gameInfo.ballColor} setValue={setValue} label='BALL :' />
					<ColorSelector name={"backgroundColor"} value={gameInfo.backgroundColor} setValue={setValue} label='BACKGROUND :' />
					<ColorSelector name={"menuColor"} value={gameInfo.menuColor} setValue={setValue} label='MENU :' />
					<RangeSlider name={"borderSize"} value={gameInfo.borderSize} setValue={setValue} min={5} max={100} step={5} label='BORDER SIZE :'/>
					<RangeSlider name={"numberSize"} value={gameInfo.numberSize} setValue={setValue} min={1} max={20} step={1} label='SCORE SIZE :'/>
					<RangeSlider name={"barLarge"} value={gameInfo.barLarge} setValue={setValue} min={5} max={100} step={5} label='BAR WIDTH :'/>
					<RangeSlider name={"menuSize"} value={gameInfo.menuSize} setValue={setValue} min={40} max={200} step={10} label='MENU SIZE :'/>
					<RangeSlider name={"numberTopDist"} value={gameInfo.numberTopDist} setValue={setValue} min={5} max={100} step={5} label='SCORE TOP DIST :'/>
					<RangeSlider name={"numberSideDist"} value={gameInfo.numberSideDist} setValue={setValue} min={5} max={100} step={5} label='SCORE SIDE DIST :'/>
				</div>
				}
				{gameDisplay === true && 
				<div className="customGame">
					<label>Name: </label><input value={gameInfo.name} onChange={e => setValue('name', e.target.value)}/> 
					<RangeSlider name={"gamexsize"} value={gameInfo.gamexsize} setValue={setValue} min={100} max={1000} step={100} label='Game Width'/>
					<RangeSlider name={"gameysize"} value={gameInfo.gameysize} setValue={setValue} min={100} max={1000} step={100} label='Game Height'/>
					<RangeSlider name={"ballSize"} value={gameInfo.ballSize} setValue={setValue} min={10} max={100} step={10} label='Ball Size'/>
					<RangeSlider name={"ballSpeed"} value={gameInfo.ballSpeed} setValue={setValue} min={1} max={30} step={1} label='Ball Speed'/>
					<RangeSlider name={"barSize"} value={gameInfo.barSize} setValue={setValue} min={10} max={100} step={10} label='Bar Size'/>
					<RangeSlider name={"barDist"} value={gameInfo.barDist} setValue={setValue} min={10} max={100} step={10} label='Bar Distance'/>
					<RangeSlider name={"barSpeed"} value={gameInfo.barSpeed} setValue={setValue} min={10} max={100} step={10} label='Bar Speed'/>
					<RangeSlider name={"oneScore"} value={gameInfo.oneScore} setValue={setValue} min={0} max={8} step={1} label='Player One Begin Score'/>
					<RangeSlider name={"twoScore"} value={gameInfo.twoScore} setValue={setValue} min={0} max={8} step={1} label='Player Two Begin Score'/>
					<RangeSlider name={"itemSize"} value={gameInfo.itemSize} setValue={setValue} min={5} max={100} step={5} label='Item Size'/>
				</div>
				}
				
				<div className="footer-createcustom">
					<div className="custom-button-default" onClick={onCreateLobby}>
						PLAY
					</div>
				</div> 
				

			</div>
	)
	// return (
	// 	<>
	// 		<button onClick={GameDisplayOnClick}>Game Settings</button>
	// 		<button onClick={InterfaceDisplayOnClick}>
	// 			Interface Settings
	// 		</button>
	// 		<button onClick={PowerUpDisplayOnClick}>PowerUp Settings</button>
	// 		<button onClick={PreviewOnClick}>Preview</button>
	// 		<button onClick={onCreateLobby}>Create Lobby</button>
	// 		<div className="CreateCustom">
	// 			{interfaceDisplay === true && (
	// 				<div className="customInterface">
	// 					<ColorSelectorComponent
	// 						name={"oneBarColor"}
	// 						value={relativeGameInfo.oneBarColor}
	// 						setValue={setValue}
	// 						label="Player One Bar Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"twoBarColor"}
	// 						value={relativeGameInfo.twoBarColor}
	// 						setValue={setValue}
	// 						label="Player Two Bar Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"borderColor"}
	// 						value={relativeGameInfo.borderColor}
	// 						setValue={setValue}
	// 						label="Border Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"oneScoreColor"}
	// 						value={relativeGameInfo.oneScoreColor}
	// 						setValue={setValue}
	// 						label="Player One Score Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"twoScoreColor"}
	// 						value={relativeGameInfo.twoScoreColor}
	// 						setValue={setValue}
	// 						label="Player Two Score Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"ballColor"}
	// 						value={relativeGameInfo.ballColor}
	// 						setValue={setValue}
	// 						label="Ball Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"backgroundColor"}
	// 						value={relativeGameInfo.backgroundColor}
	// 						setValue={setValue}
	// 						label="Background Color"
	// 					/>
	// 					<ColorSelectorComponent
	// 						name={"menuColor"}
	// 						value={relativeGameInfo.menuColor}
	// 						setValue={setValue}
	// 						label="Menu Color"
	// 					/>
	// 					<RangeComponent
	// 						name={"borderSize"}
	// 						value={relativeGameInfo.borderSize}
	// 						setValue={setValue}
	// 						min={5}
	// 						max={100}
	// 						step={5}
	// 						label="Border Size"
	// 					/>

	// 					<RangeComponent
	// 						name={"numberSize"}
	// 						value={relativeGameInfo.numberSize}
	// 						setValue={setValue}
	// 						min={50}
	// 						max={100}
	// 						step={5}
	// 						label="Score Size (%)"
	// 					/>

	// 					<RangeComponent
	// 						name={"barLarge"}
	// 						value={relativeGameInfo.barLarge}
	// 						setValue={setValue}
	// 						min={0.5}
	// 						max={5}
	// 						step={0.5}
	// 						label="Bar Large (%)"
	// 					/>

	// 					<RangeComponent
	// 						name={"menuSize"}
	// 						value={relativeGameInfo.menuSize}
	// 						setValue={setValue}
	// 						min={10}
	// 						max={40}
	// 						step={5}
	// 						label="Menu Size (%)"
	// 					/>

	// 					<RangeComponent
	// 						name={"numberTopDist"}
	// 						value={relativeGameInfo.numberTopDist}
	// 						setValue={setValue}
	// 						min={0.5}
	// 						max={5}
	// 						step={0.5}
	// 						label="Score Top Dist (%)"
	// 					/>

	// 					<RangeComponent
	// 						name={"numberSideDist"}
	// 						value={relativeGameInfo.numberSideDist}
	// 						setValue={setValue}
	// 						min={0.5}
	// 						max={5}
	// 						step={0.5}
	// 						label="Score Side Dist (%)"
	// 					/>
	// 				</div>
	// 			)}
	// 			{gameDisplay === true && (
	// 				<div className="customGame">
	// 					<label>Name: </label>
	// 					<input
	// 						value={relativeGameInfo.name}
	// 						onChange={(e) => setValue("name", e.target.value)}
	// 					/>
	// 					<RangeComponent
	// 						name={"gamexsize"}
	// 						value={relativeGameInfo.gamexsize}
	// 						setValue={setValue}
	// 						min={400}
	// 						max={1000}
	// 						step={50}
	// 						label="Game Width"
	// 					/>
	// 					<RangeComponent
	// 						name={"gameysize"}
	// 						value={relativeGameInfo.gameysize}
	// 						setValue={setValue}
	// 						min={400}
	// 						max={1000}
	// 						step={50}
	// 						label="Game Height"
	// 					/>
	// 					<RangeComponent
	// 						name={"ballSize"}
	// 						value={relativeGameInfo.ballSize}
	// 						setValue={setValue}
	// 						min={0.5}
	// 						max={20}
	// 						step={0.5}
	// 						label="Ball Size"
	// 					/>
	// 					<RangeComponent
	// 						name={"ballSpeed"}
	// 						value={relativeGameInfo.ballSpeed}
	// 						setValue={setValue}
	// 						min={0.25}
	// 						max={3}
	// 						step={0.25}
	// 						label="Ball Speed"
	// 					/>
	// 					<RangeComponent
	// 						name={"barSize"}
	// 						value={relativeGameInfo.barSize}
	// 						setValue={setValue}
	// 						min={5}
	// 						max={50}
	// 						step={5}
	// 						label="Bar Size"
	// 					/>

	// 					<RangeComponent
	// 						name={"barDist"}
	// 						value={relativeGameInfo.barDist}
	// 						setValue={setValue}
	// 						min={2.5}
	// 						max={30}
	// 						step={2.5}
	// 						label="Bar Distance"
	// 					/>
	// 					<RangeComponent
	// 						name={"barSpeed"}
	// 						value={relativeGameInfo.barSpeed}
	// 						setValue={setValue}
	// 						min={1}
	// 						max={10}
	// 						step={1}
	// 						label="Bar Speed"
	// 					/>
	// 					<RangeComponent
	// 						name={"oneScore"}
	// 						value={relativeGameInfo.oneScore}
	// 						setValue={setValue}
	// 						min={0}
	// 						max={8}
	// 						step={1}
	// 						label="Player One Begin Score"
	// 					/>
	// 					<RangeComponent
	// 						name={"twoScore"}
	// 						value={relativeGameInfo.twoScore}
	// 						setValue={setValue}
	// 						min={0}
	// 						max={8}
	// 						step={1}
	// 						label="Player Two Begin Score"
	// 					/>
	// 					<RangeComponent
	// 						name={"itemSize"}
	// 						value={relativeGameInfo.itemSize}
	// 						setValue={setValue}
	// 						min={1}
	// 						max={20}
	// 						step={1}
	// 						label="Item Size"
	// 					/>
	// 				</div>
	// 			)}
	// 			{PowerUpDisplay === true && (
	// 				<div className="customPowerUp">
	// 					<CheckboxComponent
	// 						name={"upBallSize"}
	// 						value={relativeGameInfo.upBallSize}
	// 						setValue={setValue}
	// 						label="Increase Ball Size"
	// 					/>
	// 				</div>
	// 			)}
	// 		</div>
	// 	</>
	// );
}
