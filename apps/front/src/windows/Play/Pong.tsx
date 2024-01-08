import "./Pong.css";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { socket } from "../../socket";
import { gameInfo } from "./dto/gameInfo.interface.ts";

type playProps = {
	matchInfo: gameInfo;
};


export default function Pong(props: playProps) {
let yborderSize = props.matchInfo.borderSize;
let xborderSize = props.matchInfo.borderSize;
let ymidSquareSize = props.matchInfo.midSquareSize;
let xmidSquareSize = props.matchInfo.midSquareSize;
let menuSize = props.matchInfo.menuSize;
let ysize = props.matchInfo.ysize;
let xsize = props.matchInfo.xsize;
let gamey = props.matchInfo.gamey;
let gamex = props.matchInfo.gamex;
let gamexsize = props.matchInfo.gamexsize;
let gameysize = props.matchInfo.gameysize;

let oneBary = props.matchInfo.oneBary;
let twoBary = props.matchInfo.twoBary;

/* Bar */
let barSize = props.matchInfo.barSize;
let barDist = props.matchInfo.barDist;
let barLarge = props.matchInfo.barLarge;

/* Score */
let oneScore = props.matchInfo.oneScore;
let twoScore = props.matchInfo.twoScore;

/* Ball */
let xballSize = props.matchInfo.ballSize;
let yballSize = props.matchInfo.ballSize;
let ballx = props.matchInfo.ballx;
let bally = props.matchInfo.bally;

let itemx = props.matchInfo.itemx;
let itemy = props.matchInfo.itemy;
let yitemSize = props.matchInfo.itemSize;
let xitemSize = props.matchInfo.itemSize;

function drawBoardMidline(p: p5) {
	p.fill("white");
	let tmp = gameysize / ymidSquareSize;
	tmp = Math.floor(tmp);
	tmp = tmp / 2;
	tmp = Math.floor(tmp);
	let i = gamey + (gameysize - ymidSquareSize * (tmp * 2 - 1)) / 2;
	while (i < gamey + gameysize - ymidSquareSize) {
		p.rect(xsize / 2 - xmidSquareSize / 2, i, xmidSquareSize, ymidSquareSize);
		i = i + ymidSquareSize * 2;
	}
}

function drawMenuMidline(p: p5) {
	p.rect(
		xsize / 2 - xmidSquareSize / 2,
		yborderSize - 1,
		xmidSquareSize,
		menuSize + 2
	);
}
function drawBorder(p: p5) {
	p.fill("white");
	p.rect(0, 0, xsize, yborderSize);
	p.rect(0, ysize - yborderSize, xsize, yborderSize);
	p.rect(0, yborderSize, xborderSize, ysize - 2 * yborderSize);
	p.rect(xsize - xborderSize, yborderSize, xborderSize, ysize - 2 * yborderSize);
}

function drawBar(p: p5) {
	p.rect(gamex + barDist, gamey + oneBary, barLarge, barSize);
	p.rect(
		gamex + gamexsize - barDist - barLarge,
		gamey + twoBary,
		barLarge,
		barSize
	);
}

function drawOne(p: p5, x: number, y: number) {
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 7
	);
	p.rect(
		x + xmidSquareSize * 2,
		y + yborderSize + ymidSquareSize * 2,
		xmidSquareSize,
		ymidSquareSize
	);
}

function drawTwo(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
}

function drawThree(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
}

function drawFour(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
}

function drawFive(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
}

function drawSix(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
}

function drawSeven(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 7
	);
}

function drawEight(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
}

function drawNine(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
}

function drawZero(p: p5, x: number, y: number) {
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize * 4, ymidSquareSize);
	p.rect(x, y + yborderSize + ymidSquareSize, xmidSquareSize, ymidSquareSize * 4);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 7,
		xmidSquareSize * 4,
		ymidSquareSize
	);
	p.rect(
		x,
		y + yborderSize + ymidSquareSize * 4,
		xmidSquareSize,
		ymidSquareSize * 3
	);
	p.rect(
		x + xmidSquareSize * 3,
		y + yborderSize + ymidSquareSize,
		xmidSquareSize,
		ymidSquareSize * 4
	);
}

function drawNumber(p: p5, nb: number, x: number, y: number) {
	if (nb === 0) drawZero(p, x, y);
	if (nb === 1) drawOne(p, x, y);
	if (nb === 2) drawTwo(p, x, y);
	if (nb === 3) drawThree(p, x, y);
	if (nb === 4) drawFour(p, x, y);
	if (nb === 5) drawFive(p, x, y);
	if (nb === 6) drawSix(p, x, y);
	if (nb === 7) drawSeven(p, x, y);
	if (nb === 8) drawEight(p, x, y);
	if (nb === 9) drawNine(p, x, y);
}

function scoreOne(p: p5, nb: number) {
	p.fill("black");
	p.rect(
		xmidSquareSize * 2,
		yborderSize + ymidSquareSize,
		4 * xmidSquareSize,
		7 * ymidSquareSize
	);
	p.fill("white");
	drawNumber(p, nb, xmidSquareSize * 2, 0);
}

function scoreTwo(p: p5, nb: number) {
	p.fill("black");
	p.rect(
		xsize - 6 * xmidSquareSize,
		yborderSize + ymidSquareSize,
		4 * xmidSquareSize,
		7 * ymidSquareSize
	);
	p.fill("white");
	drawNumber(p, nb, xsize - 6 * xmidSquareSize, 0);
}

function drawBall(p: p5) {
	p.rect(ballx + gamex, bally + gamey, xballSize, yballSize);
}

function drawItem(p: p5) {
	p.fill('red');
	p.rect(itemx + gamex, itemy + gamey, xitemSize, yitemSize);
	p.fill('white');
}

let input = 0;

function move(p: p5) {
	if (input != 1 && p.keyIsDown(p.DOWN_ARROW)) {
		socket.emit("client.input", { direction: "down", isPressed: true });
		input = 1;
		// if (oneBary + barSize < gameysize)
		// oneBary = oneBary + (p.deltaTime / 1000) * barSpeed;
	} else if (input != 2 && p.keyIsDown(p.UP_ARROW)) {
		socket.emit("client.input", { direction: "up", isPressed: true });
		input = 2;
		// if (oneBary > 0)
		// oneBary = oneBary - (p.deltaTime / 1000) * barSpeed;
	} else if (input == 0) {
		socket.emit("client.input", { direction: null, isPressed: false });
		input = -1;
	}
}

function compteur(p: p5, nb: number) {
	p.fill("white");
	p.circle(xsize / 2, ysize / 2, 150);
	p.fill("black");
	p.circle(xsize / 2, ysize / 2, 150 - 10 * 2);
	p.fill("white");
	if (nb != 1)
		drawNumber(
			p,
			nb,
			xsize / 2 - xborderSize * 2,
			ysize / 2 - yborderSize * 5.5
		);
	else
		drawNumber(
			p,
			nb,
			xsize / 2 - xborderSize * 3,
			ysize / 2 - yborderSize * 5.5
		);
}
function drawMenuBar(p: p5) {
	p.rect(
		xborderSize,
		menuSize + yborderSize,
		xsize - 2 * xborderSize,
		yborderSize
	);
}

function drawEmpty(p: p5) {
	p.background("black");
	drawBorder(p);
	drawMenuBar(p);
	drawBoardMidline(p);
	drawMenuMidline(p);
}

function clearBoard(p: p5) {
	p.rect(
		xborderSize,
		menuSize + yborderSize * 2,
		xsize - 2 * xborderSize,
		ysize - yborderSize * 3 - menuSize
	);
	p.rect(
		xborderSize,
		menuSize + yborderSize * 2,
		xsize - 2 * xborderSize,
		ysize - yborderSize * 3 - menuSize
	);
}

function loop(p: p5) {
	move(p);
	p.fill("black");
	clearBoard(p);
	p.fill("white");
	drawBar(p);
	drawBall(p);
	drawBoardMidline(p);
	if (xitemSize > 0 && yitemSize > 0)
		drawItem(p);
	scoreOne(p, oneScore);
	scoreTwo(p, twoScore);
}

interface sendInfo {
	ballx: number;
	bally: number;
	oneBary: number;
	twoBary: number;
	oneScore: number;
	twoScore: number;
	ballSize: number;
	barSize: number;
	itemSize: number;
	itemx: number;
	itemy: number;
}

let height: number | undefined ; //margot changed
let width: number | undefined ;  //margot changed

function onSizeChange(p:p5) {
	width = document.getElementById('canva')?.getBoundingClientRect().width;
	height = document.getElementById('canva')?.getBoundingClientRect().height;
	if (typeof width == typeof 1)// && width !== undefined && height !== undefined) ////margot
	{
		p.resizeCanvas(width as number, height as number); //margot
		p.background('black');
		xsize = width as number;
		ysize = height as number;
		drawEmpty(p);
		drawBar(p);
		scoreOne(p, 0);
		scoreTwo(p, 0);
		const xratio = props.matchInfo.xsize / xsize;
		const yratio = props.matchInfo.ysize / ysize;
		xborderSize = props.matchInfo.borderSize / xratio;
		yborderSize = props.matchInfo.borderSize / yratio;
		xmidSquareSize = props.matchInfo.midSquareSize / xratio;
		ymidSquareSize = props.matchInfo.midSquareSize / yratio;
		menuSize = props.matchInfo.menuSize / yratio;
		barLarge = props.matchInfo.barLarge / xratio;
		barDist = props.matchInfo.barDist / xratio;
		gamex = props.matchInfo.gamex / xratio;
		gamey = props.matchInfo.gamey / yratio;
		gamexsize = props.matchInfo.gamexsize / xratio;
		gameysize = props.matchInfo.gameysize / yratio;

	}
}
	const myRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (myRef.current) {
			socket.on("server.update", onUpdate);
			const myP5 = new p5(Sketch, myRef.current);
			return () => {
				myP5.remove();
				socket.off("server.update", onUpdate);
			};
		}
		function onUpdate(gameUpdate: sendInfo) {
			const xratio = props.matchInfo.xsize / xsize;
			const yratio = props.matchInfo.ysize / ysize;
			ballx = gameUpdate.ballx / xratio;
			bally = gameUpdate.bally / yratio;
			oneBary = gameUpdate.oneBary / yratio;
			twoBary = gameUpdate.twoBary / yratio;
			oneScore = gameUpdate.oneScore;
			twoScore = gameUpdate.twoScore;
			yballSize = gameUpdate.ballSize / yratio;
			xballSize = gameUpdate.ballSize / xratio;
			barSize = gameUpdate.barSize / yratio;
			itemx = gameUpdate.itemx / xratio;
			itemy = gameUpdate.itemy / yratio;
			xitemSize = gameUpdate.itemSize / yratio;
			yitemSize = gameUpdate.itemSize / yratio;
			console.log("yesss");
		}
	}, []);

	const Sketch = (p: p5) => {
		p.setup = () => {
			width = document.getElementById('canva')?.getBoundingClientRect().width;
			height = document.getElementById('canva')?.getBoundingClientRect().height;
			p.createCanvas(width as number, height as number); //margot
			p.frameRate(30);
			p.noStroke();
			drawEmpty(p);
			drawBar(p);
			scoreOne(p, 0);
			scoreTwo(p, 0);
		};
		p.draw = () => {
			if (document.getElementById('canva')?.getBoundingClientRect().width != width || document.getElementById('canva')?.getBoundingClientRect().height != height) {
				onSizeChange(p);
			}
			const ms = p.millis();
			if (ms < 1000) {
				compteur(p, 3);
			}
			// else if (ms < 2000) {
			// 	compteur(p, 2);
			// }
			// else if (ms < 3000) {
			// 	compteur(p, 1);
			// }
			// else if (ms < 3200) {
			// 	compteur(p, 0);
			// }
			else {
				loop(p);
			}
		};
		p.keyReleased = () => {
			input = 0;
		};
	};
	return (
		<div className="Pong" id='canva'>
			<div ref={myRef}></div>
		</div>
	);
}
