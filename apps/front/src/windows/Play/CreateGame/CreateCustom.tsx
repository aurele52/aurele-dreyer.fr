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

export default function CreateCustom()
{
	const [interfaceDisplay, setInterfaceDisplay] = useState<boolean>(false);
	const [gameDisplay, setGameDisplay] = useState<boolean>(true);

	const [gameInfo, setGameInfo] = useState<gameInfo>(normalGameInfo);
	const setValue = (name: string, value: number | string) => {
		setGameInfo(prevState => ({
			...prevState,
			[name]: value
			}));
	};
	function InterfaceDisplayOnClick() {
		setInterfaceDisplay(true);
		setGameDisplay(false);
	}
	function GameDisplayOnClick() {
		setInterfaceDisplay(false);
		setGameDisplay(true);
	}
	useEffect(() => {
		socket.emit('client.previewUpdate', gameInfo);

		},[gameInfo]);
	function PreviewOnClick() {
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
		socket.emit("client.createCustom", gameInfo);
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
}
