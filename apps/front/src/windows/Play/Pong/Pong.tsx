import "./Pong.css";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { socket } from "../../../socket";
import { gameInfo } from "shared/src/gameInfo.interface";

interface scaleInfo {
	yborderSize: number,
	xborderSize: number,
	ynumberSize: number,
	xnumberSize: number,
	xballSize: number,
	yballSize: number,
}
interface pongProps {
	gameInfo: gameInfo;
}

export default function Pong(props: pongProps) {
	const defaultGameInfo = {
		...props.gameInfo,
		gamex: props.gameInfo.borderSize,
		gamey: props.gameInfo.borderSize * 2 + props.gameInfo.menuSize,
	};
	const gameInfo: gameInfo ={
		...defaultGameInfo
	};
	const scaleInfo: scaleInfo ={
		yborderSize: gameInfo.borderSize,
		xborderSize: gameInfo.borderSize,
		ynumberSize: gameInfo.numberSize,
		xnumberSize: gameInfo.numberSize,
		xballSize: gameInfo.ballSize,
		yballSize: gameInfo.ballSize,
	};


	function drawBoardMidline(p: p5) {
		p.fill(gameInfo.borderColor);
		let tmp = gameInfo.gameysize / scaleInfo.yborderSize;
		tmp = Math.floor(tmp);
		tmp = tmp / 2;
		tmp = Math.floor(tmp);
		let i = gameInfo.gamey + (gameInfo.gameysize - scaleInfo.yborderSize * (tmp * 2 - 1)) / 2;
		while (i < gameInfo.gamey + gameInfo.gameysize - scaleInfo.yborderSize) {
			p.rect(gameInfo.xsize / 2 - scaleInfo.yborderSize / 2, i, scaleInfo.yborderSize, scaleInfo.yborderSize);
			i = i + scaleInfo.yborderSize * 2;
		}
	}

	function drawMenuMidline(p: p5) {
		p.fill(gameInfo.borderColor);
		p.rect(
			gameInfo.xsize / 2 - scaleInfo.xborderSize / 2,
			scaleInfo.yborderSize - 1,
			scaleInfo.xborderSize,
			gameInfo.menuSize + 2
		);
	}
	function drawBorder(p: p5) {
		p.fill(gameInfo.borderColor);
		p.rect(0, 0, gameInfo.xsize, scaleInfo.yborderSize);
		p.rect(0, gameInfo.ysize - scaleInfo.yborderSize, gameInfo.xsize, scaleInfo.yborderSize);
		p.rect(0, scaleInfo.yborderSize - 1, scaleInfo.xborderSize, gameInfo.ysize - 2 * scaleInfo.yborderSize + 2);
		p.rect(gameInfo.xsize - scaleInfo.xborderSize, scaleInfo.yborderSize - 1, scaleInfo.xborderSize, gameInfo.ysize - 2 * scaleInfo.yborderSize + 2);
	}

	function drawBar(p: p5) {
		p.fill(gameInfo.oneBarColor);
		p.rect(gameInfo.gamex + gameInfo.barDist, gameInfo.gamey + gameInfo.oneBary, gameInfo.barLarge, gameInfo.barSize);
		p.fill(gameInfo.twoBarColor);
		p.rect(
			gameInfo.gamex + gameInfo.gamexsize - gameInfo.barDist - gameInfo.barLarge,
			gameInfo.gamey + gameInfo.twoBary,
			gameInfo.barLarge,
			gameInfo.barSize
		);
	}

	function drawOne(p: p5, x: number, y: number) {
		p.rect(
			x + scaleInfo.xnumberSize * 2,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
		p.rect(
			x + scaleInfo.xnumberSize,
			y + scaleInfo.ynumberSize,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize
		);
	}

	function drawTwo(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 4
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 3
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
	}

	function drawThree(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.xnumberSize);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
	}

	function drawFour(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 4);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
	}

	function drawFive(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 4);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 3
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
	}

	function drawSix(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 7);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 4
		);
	}

	function drawSeven(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
	}

	function drawEight(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 7);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
	}

	function drawNine(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 4);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 3,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
		);
	}

	function drawZero(p: p5, x: number, y: number) {
		p.rect(x, y, scaleInfo.xnumberSize * 4, scaleInfo.ynumberSize);
		p.rect(x, y, scaleInfo.xnumberSize, scaleInfo.ynumberSize * 7);
		p.rect(
			x,
			y + scaleInfo.ynumberSize * 6,
			scaleInfo.xnumberSize * 4,
			scaleInfo.ynumberSize
		);
		p.rect(
			x + scaleInfo.xnumberSize * 3,
			y,
			scaleInfo.xnumberSize,
			scaleInfo.ynumberSize * 7
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
		p.fill(gameInfo.menuColor);
		p.rect(
			scaleInfo.xborderSize + gameInfo.numberSideDist - 1,
			scaleInfo.yborderSize + gameInfo.numberTopDist - 1,
			4 * scaleInfo.xnumberSize + 2,
			7 * scaleInfo.ynumberSize + 2
		);
		p.fill(gameInfo.oneScoreColor);
		drawNumber(p, nb, gameInfo.numberSideDist + scaleInfo.xborderSize, gameInfo.numberTopDist + scaleInfo.yborderSize);
	}

	function scoreTwo(p: p5, nb: number) {
		p.fill(gameInfo.menuColor);
		p.rect(
			gameInfo.xsize - scaleInfo.xborderSize - gameInfo.numberSideDist - 4 * scaleInfo.xnumberSize - 1,
			scaleInfo.yborderSize + gameInfo.numberTopDist - 1,
			4 * scaleInfo.xnumberSize + 2,
			7 * scaleInfo.ynumberSize + 2
		);
		p.fill(gameInfo.twoScoreColor);
		drawNumber(p, nb, gameInfo.xsize - scaleInfo.xborderSize - gameInfo.numberSideDist - 4 * scaleInfo.xnumberSize, gameInfo.numberTopDist + scaleInfo.yborderSize);
	}

	function drawBall(p: p5) {
		if (gameInfo.ballx > 0 && gameInfo.ballx + scaleInfo.xballSize < gameInfo.gamexsize) {
			p.fill(gameInfo.ballColor);
			p.rect(gameInfo.ballx + gameInfo.gamex, gameInfo.bally + gameInfo.gamey, scaleInfo.xballSize, scaleInfo.yballSize);
		}
	}

	let input = 0;

	function move(p: p5) {
		if (input != 1 && p.keyIsDown(p.DOWN_ARROW)) {
			socket.emit("client.input", { direction: "down", isPressed: true });
			input = 1;
		} else if (input != 2 && p.keyIsDown(p.UP_ARROW)) {
			socket.emit("client.input", { direction: "up", isPressed: true });
			input = 2;
		} else if (input == 0) {
			socket.emit("client.input", { direction: null, isPressed: false });
			input = -1;
		}
	}

	function compteur(p: p5) {
		p.fill(gameInfo.borderColor);
		p.ellipse(gameInfo.gamexsize / 2 + gameInfo.gamex, gameInfo.gameysize / 2 + gameInfo.gamey, scaleInfo.xnumberSize * 10 + scaleInfo.xborderSize * 2, scaleInfo.ynumberSize * 10 + scaleInfo.xborderSize * 2);
		p.fill(gameInfo.backgroundColor);
		p.ellipse(gameInfo.gamexsize / 2 + gameInfo.gamex, gameInfo.gameysize / 2 + gameInfo.gamey, 10 * scaleInfo.xnumberSize, 10 * scaleInfo.ynumberSize);
		p.fill(gameInfo.borderColor);
		drawNumber(
			p,
			gameInfo.compteur,
			gameInfo.gamexsize / 2 - scaleInfo.xnumberSize * 2 + gameInfo.gamex,
			gameInfo.gameysize / 2 - scaleInfo.ynumberSize * 3.5 + gameInfo.gamey
		);
	}

	function drawMenuBar(p: p5) {
		p.fill(gameInfo.borderColor);
		p.rect(
			scaleInfo.xborderSize - 1,
			gameInfo.menuSize + scaleInfo.yborderSize,
			gameInfo.xsize - 2 * scaleInfo.xborderSize + 2,
			scaleInfo.yborderSize
		);
	}

	function drawMenu(p: p5) {
		p.fill(gameInfo.menuColor);
		p.rect(
			scaleInfo.xborderSize,
			scaleInfo.yborderSize,
			gameInfo.xsize - 2 * scaleInfo.xborderSize,
			gameInfo.menuSize
		);
	}

	function drawEmpty(p: p5) {
		p.background(gameInfo.backgroundColor);
		drawMenu(p);
		drawBorder(p);
		drawMenuBar(p);
		drawBoardMidline(p);
		drawMenuMidline(p);
	}

	function clearBoard(p: p5) {
		p.fill(gameInfo.backgroundColor);
		p.rect(
			scaleInfo.xborderSize,
			gameInfo.menuSize + scaleInfo.yborderSize * 2,
			gameInfo.xsize - 2 * scaleInfo.xborderSize,
			gameInfo.ysize - scaleInfo.yborderSize * 3 - gameInfo.menuSize
		);
		p.rect(
			scaleInfo.xborderSize,
			gameInfo.menuSize + scaleInfo.yborderSize * 2,
			gameInfo.xsize - 2 * scaleInfo.xborderSize,
			gameInfo.ysize - scaleInfo.yborderSize * 3 - gameInfo.menuSize
		);
	}

	function loop(p: p5) {
		if (gameInfo.compteur != -1) {
			compteur(p);
		}
		else {
			move(p);
			drawEmpty(p);
			clearBoard(p);
			drawBoardMidline(p);
			drawBar(p);
			drawBall(p);
			scoreOne(p, gameInfo.oneScore);
			scoreTwo(p, gameInfo.twoScore);
		}
	}

	interface sendInfo {
		ballx: number;
		bally: number;
		oneBary: number;
		twoBary: number;

		barDist: number;
		barLarge: number;
		barSize: number;

		ballSize: number;


		oneScore: number;
		twoScore: number;
		compteur: number;
	}

	let height: number | undefined ; //margot changed
	let width: number | undefined ;  //margot changed

	function onSizeChange(p:p5) {
		width = document.getElementById('canva')?.getBoundingClientRect().width;
		height = document.getElementById('canva')?.getBoundingClientRect().height;
		if (typeof width == typeof 1)// && width !== undefined && height !== undefined) ////margot
		{
			p.resizeCanvas(width as number, height as number); //margot
			gameInfo.xsize = width as number;
			gameInfo.ysize = height as number;
			drawEmpty(p);
			drawBar(p);
			scoreOne(p, gameInfo.oneScore);
			scoreTwo(p, gameInfo.twoScore);
			const xratio = defaultGameInfo.xsize / gameInfo.xsize;
			const yratio = defaultGameInfo.ysize / gameInfo.ysize;

			gameInfo.gamex = defaultGameInfo.gamex / xratio;
			gameInfo.gamey = defaultGameInfo.gamey / yratio;
			gameInfo.gamexsize = defaultGameInfo.gamexsize / xratio;
			gameInfo.gameysize = defaultGameInfo.gameysize / yratio;

			gameInfo.barSize = defaultGameInfo.barSize / yratio;
			gameInfo.barDist = defaultGameInfo.barDist / xratio;
			gameInfo.barLarge = defaultGameInfo.barLarge / xratio;
			gameInfo.menuSize = defaultGameInfo.menuSize / yratio;
			gameInfo.numberSideDist = defaultGameInfo.numberSideDist / xratio;
			gameInfo.numberTopDist = defaultGameInfo.numberTopDist / yratio;
			scaleInfo.xborderSize = defaultGameInfo.borderSize / xratio;
			scaleInfo.yborderSize = defaultGameInfo.borderSize / yratio;
			scaleInfo.xballSize = defaultGameInfo.ballSize / xratio;
			scaleInfo.yballSize = defaultGameInfo.ballSize / yratio;
			scaleInfo.xnumberSize = defaultGameInfo.numberSize / xratio;
			scaleInfo.ynumberSize = defaultGameInfo.numberSize / yratio;

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
			const xratio = defaultGameInfo.xsize / gameInfo.xsize;
			const yratio = defaultGameInfo.ysize / gameInfo.ysize;
			gameInfo.gamex = defaultGameInfo.gamex / xratio;
			gameInfo.gamey = defaultGameInfo.gamey / yratio;
			gameInfo.gamexsize = defaultGameInfo.gamexsize / xratio;
			gameInfo.gameysize = defaultGameInfo.gameysize / yratio;
			gameInfo.barSize = gameUpdate.barSize / yratio;
			gameInfo.barDist = gameUpdate.barDist / xratio;
			gameInfo.barLarge = gameUpdate.barLarge / xratio;
			gameInfo.ballx = gameUpdate.ballx / xratio;
			gameInfo.bally = gameUpdate.bally / yratio;
			gameInfo.oneBary = gameUpdate.oneBary / yratio;
			gameInfo.twoBary = gameUpdate.twoBary / yratio;
			gameInfo.oneScore = gameUpdate.oneScore;
			gameInfo.twoScore = gameUpdate.twoScore;
			scaleInfo.xballSize = gameUpdate.ballSize / xratio;
			scaleInfo.yballSize = gameUpdate.ballSize / yratio;
			gameInfo.compteur = gameUpdate.compteur;
		}
		}, []);

	const Sketch = (p: p5) => {
		p.setup = () => {
			width = document.getElementById('canva')?.getBoundingClientRect().width;
			height = document.getElementById('canva')?.getBoundingClientRect().height;
			p.createCanvas(height, width);
			p.frameRate(30);
			p.noStroke();
			drawEmpty(p);
		drawBar(p);
			scoreOne(p, defaultGameInfo.oneScore);
			scoreTwo(p, defaultGameInfo.twoScore);
		};
		p.draw = () => {
			if (document.getElementById('canva')?.getBoundingClientRect().width != width || document.getElementById('canva')?.getBoundingClientRect().height != height) {
				onSizeChange(p);
			}
			loop(p);
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
