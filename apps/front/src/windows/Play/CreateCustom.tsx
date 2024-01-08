import { useEffect, useState } from 'react';
import './CreateCustom.css';
import RangeComponent from './RangeComponent';
import { Socket } from 'socket.io-client';
import { HBButton, WinColor } from '../../shared/utils/WindowTypes';
import store from '../../store';
import { addWindow } from '../../reducers';
import { socket } from '../../socket';
import { parameter } from './dto/parameter.interface';
import ColorSelectorComponent from './ColorSelectorComponent';

interface CreateProps {
	socket: Socket;
	createLobbyOnClick: () => void;
}

export default function CreateCustom(props: CreateProps)
{
	const [interfaceDisplay, setInterfaceDisplay] = useState<boolean>(false);
	const [gameDisplay, setGameDisplay] = useState<boolean>(true);
	const [name, setName] = useState<string>('default');
	const [ballSize, setBallSize] = useState<number>(10);
	const [barSize, setBarSize] = useState<number>(100);
	const [xsize, setXsize] = useState<number>(800);
	const [ysize, setYsize] = useState<number>(500);
	const [oneBarColor, setOneBarColor] = useState<string>('white');
	const [twoBarColor, setTwoBarColor] = useState<string>('white');
	const [backgroundColor, setBackgroundColor] = useState<string>('black');
	const [ballColor, setBallColor] = useState<string>('white');
	const [oneScoreColor, setOneScoreColor] = useState<string>('white');
	const [twoScoreColor, setTwoScoreColor] = useState<string>('white');
	const [menuColor, setMenuColor] = useState<string>('black');
	const [borderColor, setBorderColor] = useState<string>('white');
	const [ballSpeed, setBallSpeed] = useState<number>(4);
	const [barSpeed, setBarSpeed] = useState<number>(20);
	const [barDist, setBarDist] = useState<number>(20);
	const [barLarge, setBarLarge] = useState<number>(10);
	const [oneScore, setOneScore] = useState<number>(0);
	const [twoScore, setTwoScore] = useState<number>(0);
	const [borderSize, setBordersize] = useState<number>(10);
	const [itemSize, setItemSize] = useState<number>(10);
	const [numberSize, setNumberSize] = useState<number>(10);
	const [menuSize, setMenuSize] = useState<number>(90);
	const [numberTopDist, setTopDistNumber] = useState<number>(10);
	const [numberSideDist, setNumberSideDist] = useState<number>(10);
	function InterfaceDisplayOnClick() {
		setInterfaceDisplay(true);
		setGameDisplay(false);
	}
	function GameDisplayOnClick() {
		setInterfaceDisplay(false);
		setGameDisplay(true);
	}
	useEffect(() => {
		const parameter: parameter = {
			midSquareSize: 10,
			ysize: 500,
			xsize: 800,
			ballSize: 10,
			barSize: 100,
			oneBarColor: 'white',
			twoBarColor: 'white',
			ballColor: 'white',
			backgroundColor: 'black',
			borderColor: 'white',
			oneNumberColor: 'white',
			twoNumberColor: 'white',
			menuColor: 'black',
			itemSize: 10,
			oneScore: 0,
			twoScore: 0,
			ballSpeed: 4.0,
			barDist: 20,
			barSpeed: 2,
			barLarge: 10,
			numberSize: 10,
			borderSize: 10,
			numberSideDist: 10,
			numberTopDist: 10,
			menuSize: 90,
		}
		parameter.xsize = xsize;
		parameter.ysize = ysize;
		parameter.barSize = barSize;
		parameter.ballSize = ballSize;
		parameter.oneBarColor = oneBarColor;
		parameter.twoBarColor = twoBarColor;
		parameter.oneNumberColor = oneScoreColor;
		parameter.twoNumberColor = twoScoreColor;
		parameter.backgroundColor = backgroundColor;
		parameter.menuColor = menuColor;
		parameter.ballColor = ballColor;
		parameter.borderColor = borderColor;
		parameter.itemSize = itemSize;
		parameter.oneScore = oneScore;
		parameter.twoScore = twoScore;
		parameter.ballSpeed = ballSpeed;
		parameter.barDist = barDist;
		parameter.barSpeed = barSpeed;
		parameter.barLarge = barLarge;
		parameter.numberSize = numberSize;
		parameter.borderSize = borderSize;
		parameter.numberSideDist = numberSideDist;
		parameter.numberTopDist = numberTopDist;
		parameter.menuSize = menuSize;
		socket.emit('client.previewUpdate', parameter);

		},[menuSize, numberSideDist, numberTopDist, itemSize, oneScore, twoScore, ballSpeed, barLarge, barDist, barSpeed, borderSize,numberSize, ballSize, barSize, xsize, borderColor, ysize, oneBarColor, twoBarColor, ballColor, backgroundColor, menuColor, oneScoreColor, twoScoreColor]);
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
	}
	function onCreateLobby() {
		props.socket.emit("client.createCustom", {
			name: name,
			ballSize: ballSize,
			barSize: barSize,
		});
		props.createLobbyOnClick();
	}
	return(
		<>
			<button onClick={GameDisplayOnClick}>Game Settings</button>
			<button onClick={InterfaceDisplayOnClick}>Interface Settings</button>
			<button onClick={PreviewOnClick}>Preview</button>
			<div className="CreateCustom">
				{interfaceDisplay === true && <div className="customInterface">
					<ColorSelectorComponent value={oneBarColor} setValue={setOneBarColor} label='Player One Bar Color' />
					<ColorSelectorComponent value={twoBarColor} setValue={setTwoBarColor} label='Player Two Bar Color' />
					<ColorSelectorComponent value={borderColor} setValue={setBorderColor} label='Border Color' />
					<ColorSelectorComponent value={oneScoreColor} setValue={setOneScoreColor} label='Player One Score Color' />
					<ColorSelectorComponent value={twoScoreColor} setValue={setTwoScoreColor} label='Player Two Score Color' />
					<ColorSelectorComponent value={ballColor} setValue={setBallColor} label='Ball Color' />
					<ColorSelectorComponent value={backgroundColor} setValue={setBackgroundColor} label='Background Color' />
					<ColorSelectorComponent value={menuColor} setValue={setMenuColor} label='Menu Color' />
					<RangeComponent value={borderSize} setValue={setBordersize} min={5} max={100} step={5} label='Border Size'/>
					<RangeComponent value={numberSize} setValue={setNumberSize} min={1} max={20} step={1} label='Score Size'/>
					<RangeComponent value={barLarge} setValue={setBarLarge} min={5} max={100} step={5} label='Bar Large'/>
					<RangeComponent value={menuSize} setValue={setMenuSize} min={40} max={200} step={10} label='Menu Size'/>
					<RangeComponent value={numberTopDist} setValue={setTopDistNumber} min={5} max={100} step={5} label='Score Top Dist'/>
					<RangeComponent value={numberSideDist} setValue={setNumberSideDist} min={5} max={100} step={5} label='Score Side Dist'/>
					</div>
				}
				{gameDisplay === true && <div className="customGame">
					<label>Name: </label><input value={name} onChange={e => setName(e.target.value)}/> 
					<RangeComponent value={xsize} setValue={setXsize} min={100} max={1000} step={100} label='Game Width'/>
					<RangeComponent value={ysize} setValue={setYsize} min={100} max={1000} step={100} label='Game Height'/>
					<RangeComponent value={ballSize} setValue={setBallSize} min={10} max={100} step={10} label='Ball Size'/>
					<RangeComponent value={ballSpeed} setValue={setBallSpeed} min={1} max={30} step={1} label='Ball Speed'/>
					<RangeComponent value={barSize} setValue={setBarSize} min={10} max={100} step={10} label='Bar Size'/>
					<RangeComponent value={barDist} setValue={setBarDist} min={10} max={100} step={10} label='Bar Distance'/>
					<RangeComponent value={barSpeed} setValue={setBarSpeed} min={10} max={100} step={10} label='Bar Speed'/>
					<RangeComponent value={oneScore} setValue={setOneScore} min={0} max={8} step={1} label='Player One Begin Score'/>
					<RangeComponent value={twoScore} setValue={setTwoScore} min={0} max={8} step={1} label='Player Two Begin Score'/>
					<RangeComponent value={itemSize} setValue={setItemSize} min={5} max={100} step={5} label='Item Size'/>
					<button onClick={onCreateLobby}>Create Lobby</button>
					</div>
				}
			</div>
		</>
	)
}
