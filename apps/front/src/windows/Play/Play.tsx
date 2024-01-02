import "./Play.css";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { Socket } from "socket.io-client";

// export const Default_params = {
// 	GAME_WIDTH: 800, // gamexsize
// 	GAME_HEIGHT: 600, // gameysize
// 	BALL_RADIUS: 10, // ballSize
//
//
//
//   PADDLE_MOVE_SPEED: 2,
//   PADDLE_OFFSET: 20,
//   PADDLE_BORDER: 1,
//   PADDLE_HEIGHT: 600 / 6,
//   PADDLE_WIDTH: 5,
//   BALL_DEFAULT_SPEED: 2,
//   BALL_SPEED_INCREASE: 0.3,
//   BALL_MAX_SPEED: 3.5,
//   BALL_PERTURBATOR: 0.2,
//   DEFAULT_PADDLE_POSITION: 600 / 2 - 300 / 6 / 2,
// };

/* Interface */
const borderSize = 10;
const midSquareSize = borderSize;
const menuSize = 9 * borderSize;
const ysize = 500;
const xsize = 800;
const gamey = menuSize + 2 * borderSize;
const gamex = borderSize;
const gamexsize = xsize - 2 * borderSize;
const gameysize = ysize - menuSize - 3 * borderSize;

let oneBary = 10;
let twoBary = 10;

/* Bar */
const barSize = 100;
const barDist = 20;
const barLarge = 10;

/* Score */
let oneScore = 0;
let twoScore = 0;

/* Ball */
const ballDeb = 150;
const ballSize = 10;
let ballx = gamexsize / 2 - ballDeb;
let bally = gameysize / 2;

function drawBoardMidline(p: p5) {
	p.fill("white");
	let tmp = gameysize / midSquareSize;
	tmp = Math.floor(tmp);
	tmp = tmp / 2;
	tmp = Math.floor(tmp);
	let i = gamey + (gameysize - midSquareSize * (tmp * 2 - 1)) / 2;
	while (i < gamey + gameysize - midSquareSize) {
		p.rect(xsize / 2 - midSquareSize / 2, i, midSquareSize, midSquareSize);
		i = i + midSquareSize * 2;
	}
}

function drawMenuMidline(p: p5) {
	p.rect(
		xsize / 2 - midSquareSize / 2,
		borderSize - 1,
		midSquareSize,
		menuSize + 2
	);
}
function drawBorder(p: p5) {
	p.fill("white");
	p.rect(0, 0, xsize, borderSize);
	p.rect(0, ysize - borderSize, xsize, borderSize);
	p.rect(0, borderSize, borderSize, ysize - 2 * borderSize);
	p.rect(xsize - borderSize, borderSize, borderSize, ysize - 2 * borderSize);
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
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 7
	);
	p.rect(
		x + midSquareSize * 2,
		y + borderSize + midSquareSize * 2,
		midSquareSize,
		midSquareSize
	);
}

function drawTwo(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
}

function drawThree(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
}

function drawFour(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
}

function drawFive(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
}

function drawSix(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
}

function drawSeven(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 7
	);
}

function drawEight(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
	);
}

function drawNine(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
	);
}

function drawZero(p: p5, x: number, y: number) {
	p.rect(x, y + borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
	p.rect(x, y + borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 7,
		midSquareSize * 4,
		midSquareSize
	);
	p.rect(
		x,
		y + borderSize + midSquareSize * 4,
		midSquareSize,
		midSquareSize * 3
	);
	p.rect(
		x + midSquareSize * 3,
		y + borderSize + midSquareSize,
		midSquareSize,
		midSquareSize * 4
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
		midSquareSize * 2,
		borderSize + midSquareSize,
		4 * midSquareSize,
		7 * midSquareSize
	);
	p.fill("white");
	drawNumber(p, nb, midSquareSize * 2, 0);
}

function scoreTwo(p: p5, nb: number) {
	p.fill("black");
	p.rect(
		xsize - 6 * midSquareSize,
		borderSize + midSquareSize,
		4 * midSquareSize,
		7 * midSquareSize
	);
	p.fill("white");
	drawNumber(p, nb, xsize - 6 * midSquareSize, 0);
}

function drawBall(p: p5) {
	p.rect(ballx + gamex, bally + gamey, ballSize, ballSize);
}

let input = 0;

function move(p: p5, socket: Socket) {
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
	p.circle(xsize / 2, ysize / 2, 150 - borderSize * 2);
	p.fill("white");
	if (nb != 1)
		drawNumber(
			p,
			nb,
			xsize / 2 - borderSize * 2,
			ysize / 2 - borderSize * 5.5
		);
	else
		drawNumber(
			p,
			nb,
			xsize / 2 - borderSize * 3,
			ysize / 2 - borderSize * 5.5
		);
}
function drawMenuBar(p: p5) {
	p.rect(
		borderSize,
		menuSize + borderSize,
		xsize - 2 * borderSize,
		borderSize
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
		borderSize,
		menuSize + borderSize * 2,
		xsize - 2 * borderSize,
		ysize - borderSize * 3 - menuSize
	);
	p.rect(
		borderSize,
		menuSize + borderSize * 2,
		xsize - 2 * borderSize,
		ysize - borderSize * 3 - menuSize
	);
}

function loop(p: p5, socket: Socket) {
	move(p, socket);
	p.fill("black");
	clearBoard(p);
	p.fill("white");
	drawBar(p);
	drawBall(p);
	drawBoardMidline(p);
	scoreOne(p, oneScore);
	scoreTwo(p, twoScore);
}

type playProps = {
	socket: Socket;
};

interface sendInfo {
	ballx: number;
	bally: number;
	oneBary: number;
	twoBary: number;
	oneScore: number;
	twoScore: number;
}

export default function Play(props: playProps) {
	const myRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (myRef.current) {
			props.socket.on("server.update", onUpdate);
			const myP5 = new p5(Sketch, myRef.current);
			return () => {
				myP5.remove();
				props.socket.off("server.update", onUpdate);
			};
		}
		function onUpdate(gameUpdate: sendInfo) {
			ballx = gameUpdate.ballx;
			bally = gameUpdate.bally;
			oneBary = gameUpdate.oneBary;
			twoBary = gameUpdate.twoBary;
			oneScore = gameUpdate.oneScore;
			twoScore = gameUpdate.twoScore;
			console.log("yesss");
		}
	}, [props.socket]);

	const Sketch = (p: p5) => {
		p.setup = () => {
			p.createCanvas(xsize, ysize);
			p.frameRate(30);
			p.noStroke();
			drawEmpty(p);
			drawBar(p);
			scoreOne(p, 0);
			scoreTwo(p, 0);
		};
		p.draw = () => {
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
				loop(p, props.socket);
			}
		};
		p.keyReleased = () => {
			input = 0;
		};
	};
	return (
		<div className="Play">
			<div ref={myRef}></div>
		</div>
	);
}
