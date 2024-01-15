import { useEffect, useState } from 'react';
import './CreateCustom.css';
import ColorSelectorComponent from './ColorSelectorComponent';
import { gameInfo } from 'shared/src/gameInfo.interface';
import { normalGameInfo } from 'shared/src/normalGameInfo';
import { socket } from '../../../socket';
import { HBButton, WinColor } from '../../../shared/utils/WindowTypes';
import store from '../../../store';
import { addWindow, delWindow } from '../../../reducers';
import RangeComponent from '../JoinGame/RangeComponent';
import CheckboxComponent from './CheckboxComponent';

interface createCustomProps {
	onCreateLobby: () => void,
}

export default function CreateCustom(props: createCustomProps)
{
	const [interfaceDisplay, setInterfaceDisplay] = useState<boolean>(false);
	const [gameDisplay, setGameDisplay] = useState<boolean>(true);
	const [PowerUpDisplay, setPowerUpDisplay] = useState<boolean>(false);

	const [gameInfo, setGameInfo] = useState<gameInfo>(normalGameInfo);
	const setValue = (name: string, value: number | string) => {
		setGameInfo(prevState => ({
			...prevState,
			[name]: value
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
		socket.emit('client.previewUpdate', gameInfo);
		return (() => {
		});

		},[gameInfo]);
	function PreviewOnClick() {
			const memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "PREVIEW"
				);
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
			handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		socket.emit('client.previewUpdate', gameInfo);
	}
	function onCreateLobby() {
		const memberSettingsWindow = store
		.getState()
		.windows.find(
			(window) => window.content.type === "PREVIEW"
		);
		if (memberSettingsWindow) {
			store.dispatch(delWindow(memberSettingsWindow.id));
		}
		props.onCreateLobby();
		socket.emit("client.createCustom", gameInfo);
	}
	return(
		<>
			<button onClick={GameDisplayOnClick}>Game Settings</button>
			<button onClick={InterfaceDisplayOnClick}>Interface Settings</button>
			<button onClick={PowerUpDisplayOnClick}>PowerUp Settings</button>
			<button onClick={PreviewOnClick}>Preview</button>
			<button onClick={onCreateLobby}>Create Lobby</button>
			<div className="CreateCustom">
				{interfaceDisplay === true && <div className="customInterface">
					<ColorSelectorComponent name={"oneBarColor"} value={gameInfo.oneBarColor} setValue={setValue} label='Player One Bar Color' />
					<ColorSelectorComponent name={"twoBarColor"} value={gameInfo.twoBarColor} setValue={setValue} label='Player Two Bar Color' />
					<ColorSelectorComponent name={"borderColor"} value={gameInfo.borderColor} setValue={setValue} label='Border Color' />
					<ColorSelectorComponent name={"oneScoreColor"} value={gameInfo.oneScoreColor} setValue={setValue} label='Player One Score Color' />
					<ColorSelectorComponent name={"twoScoreColor"} value={gameInfo.twoScoreColor} setValue={setValue} label='Player Two Score Color' />
					<ColorSelectorComponent name={"ballColor"} value={gameInfo.ballColor} setValue={setValue} label='Ball Color' />
					<ColorSelectorComponent name={"backgroundColor"} value={gameInfo.backgroundColor} setValue={setValue} label='Background Color' />
					<ColorSelectorComponent name={"menuColor"} value={gameInfo.menuColor} setValue={setValue} label='Menu Color' />
					<RangeComponent name={"borderSize"} value={gameInfo.borderSize} setValue={setValue} min={5} max={100} step={5} label='Border Size'/>
					<RangeComponent name={"numberSize"} value={gameInfo.numberSize} setValue={setValue} min={1} max={20} step={1} label='Score Size'/>
					<RangeComponent name={"barLarge"} value={gameInfo.barLarge} setValue={setValue} min={5} max={100} step={5} label='Bar Large'/>
					<RangeComponent name={"menuSize"} value={gameInfo.menuSize} setValue={setValue} min={40} max={200} step={10} label='Menu Size'/>
					<RangeComponent name={"numberTopDist"} value={gameInfo.numberTopDist} setValue={setValue} min={5} max={100} step={5} label='Score Top Dist'/>
					<RangeComponent name={"numberSideDist"} value={gameInfo.numberSideDist} setValue={setValue} min={5} max={100} step={5} label='Score Side Dist'/>
					</div>
				}
				{gameDisplay === true && <div className="customGame">
					<label>Name: </label><input value={gameInfo.name} onChange={e => setValue('name', e.target.value)}/> 
					<RangeComponent name={"gamexsize"} value={gameInfo.gamexsize} setValue={setValue} min={100} max={1000} step={100} label='Game Width'/>
					<RangeComponent name={"gameysize"} value={gameInfo.gameysize} setValue={setValue} min={100} max={1000} step={100} label='Game Height'/>
					<RangeComponent name={"ballSize"} value={gameInfo.ballSize} setValue={setValue} min={10} max={100} step={10} label='Ball Size'/>
					<RangeComponent name={"ballSpeed"} value={gameInfo.ballSpeed} setValue={setValue} min={1} max={30} step={1} label='Ball Speed'/>
					<RangeComponent name={"barSize"} value={gameInfo.barSize} setValue={setValue} min={10} max={100} step={10} label='Bar Size'/>
					<RangeComponent name={"barDist"} value={gameInfo.barDist} setValue={setValue} min={10} max={100} step={10} label='Bar Distance'/>
					<RangeComponent name={"barSpeed"} value={gameInfo.barSpeed} setValue={setValue} min={10} max={100} step={10} label='Bar Speed'/>
					<RangeComponent name={"oneScore"} value={gameInfo.oneScore} setValue={setValue} min={0} max={8} step={1} label='Player One Begin Score'/>
					<RangeComponent name={"twoScore"} value={gameInfo.twoScore} setValue={setValue} min={0} max={8} step={1} label='Player Two Begin Score'/>
					<RangeComponent name={"itemSize"} value={gameInfo.itemSize} setValue={setValue} min={5} max={100} step={5} label='Item Size'/>
					</div>
				}
				{PowerUpDisplay === true && <div className="customPowerUp">
					<CheckboxComponent name={"upBallSize"} value={gameInfo.upBallSize} setValue={setValue} label='Increase Ball Size'/>
					</div>
				}
			</div>
		</>
	)
}
