import "./Play.css";
import { useEffect, useRef} from "react";
import p5 from "p5";

/* Interface */
const midSquareSize = 10;
const borderSize = 10;
const menuSize = 7 * midSquareSize + 2 * borderSize;
let oneBary = borderSize * 2 + menuSize + 10;
let twoBary = borderSize * 2 + menuSize + 10;
const ysize = 490;
const xsize = 800;

/* Bar */
const barSize = 100;
const barDist = 20;
const barLarge = 10;
const barSpeed = 70.0;

/* Score */
let oneScore = 0;
let twoScore = 0;

function drawBoardMidline(p: p5) {
	p.fill("white");
	const area = ysize - borderSize * 3 - menuSize;
	let tmp = area / midSquareSize;
	tmp = Math.floor(tmp);
	tmp = tmp / 2;
	tmp = Math.floor(tmp);
	let i =
		borderSize * 2 + menuSize + (area - midSquareSize * (tmp * 2 - 1)) / 2;
	while (i < ysize - borderSize - midSquareSize) {
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
	p.rect(borderSize + barDist, oneBary, barLarge, barSize);
	p.rect(xsize - borderSize - barDist - barLarge, twoBary, barLarge, barSize);
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
/* Ball */
const ballDeb = 150;
let ballDirx = -1;
let ballDiry = -0.4;
const ballSize = 10;
const ballSpeed = 4.0;
let ballx = xsize / 2 - ballDeb;
let bally = borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;

function ballWallRedir() {
	if (bally + ballSize + ballSpeed >= ysize - borderSize) ballDiry *= -1;
	if (bally - ballSpeed <= borderSize * 2 + menuSize) ballDiry *= -1;
}

function score() {
	if (ballx + ballSize >= xsize - borderSize - barDist) {
		oneScore++;
		ballx = xsize / 2 + ballDeb;
		bally =
			borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;
		ballDirx = -1;
		ballDiry = 1;
	}
	if (ballx < borderSize + barDist / 2) {
		twoScore++;
		ballx = xsize / 2 - ballDeb;
		bally =
			borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;
		ballDirx = 1;
		ballDiry = 1;
	}
}

function redirection(
	ratio: number,
	delta: { x: number; y: number }
): [number, number] {
	ratio = (ratio - 0.5) * 2;
	const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
	const inAlpha = Math.asin(delta.y / speed);
	let outAlpha = inAlpha + (ratio * Math.PI) / 6;
	const absinAlpha = inAlpha > 0 ? inAlpha : 2 * Math.PI + inAlpha;
	let absoutAlpha = outAlpha > 0 ? outAlpha : 2 * Math.PI + outAlpha;
	if (absinAlpha > Math.PI / 2 && absinAlpha < (3 * Math.PI) / 2) {
		if (absoutAlpha < Math.PI / 2 + Math.PI / 9)
			absoutAlpha = Math.PI / 2 + Math.PI / 9;
		else if (absoutAlpha > (3 * Math.PI) / 2 - Math.PI / 9)
			absoutAlpha = (3 * Math.PI) / 2 - Math.PI / 9;
	} else {
		if (absoutAlpha > Math.PI / 2 - Math.PI / 9 && absoutAlpha < Math.PI)
			absoutAlpha = Math.PI / 2 - Math.PI / 9;
		else if (
			absoutAlpha < (3 * Math.PI) / 2 + Math.PI / 9 &&
			absoutAlpha > Math.PI
		)
			absoutAlpha = (3 * Math.PI) / 2 + Math.PI / 9;
	}
	outAlpha = absoutAlpha > 180 ? absoutAlpha - 2 * Math.PI : absoutAlpha;
	return [1 * speed * Math.cos(outAlpha), speed * Math.sin(outAlpha)];
}

function ballBarRedir() {
	if (
		ballx <= borderSize + barLarge + barDist &&
		ballx >= borderSize + barDist
	) {
		if (bally <= oneBary + barSize && bally >= oneBary) {
			const ret = (bally - oneBary) / barSize;
			[ballDirx, ballDiry] = redirection(ret, {
				x: ballDirx,
				y: ballDiry,
			});
		}
	}
	if (
		ballx + ballSize >= xsize - borderSize - barLarge - barDist &&
		ballx + ballSize <= xsize - borderSize - barDist
	) {
		if (
			bally + ballSize / 2 <= twoBary + barSize &&
			bally + ballSize / 2 >= twoBary
		) {
			const ret = (bally - twoBary) / barSize;
			[ballDirx, ballDiry] = redirection(ret, {
				x: ballDirx,
				y: ballDiry,
			});
			ballDirx *= -1;
		}
	}
}

function drawBall(p: p5) {
	p.rect(ballx, bally, ballSize, ballSize);
}
function move(p: p5) {
	if (p.keyIsDown(p.DOWN_ARROW)) {
		if (oneBary + barSize < ysize - borderSize)
			oneBary = oneBary + (p.deltaTime / 1000) * barSpeed;
	}
	if (p.keyIsDown(p.UP_ARROW)) {
		if (oneBary > borderSize * 2 + menuSize)
			oneBary = oneBary - (p.deltaTime / 1000) * barSpeed;
	}
	if (p.keyIsDown(p.LEFT_ARROW)) {
		if (twoBary + barSize < ysize - borderSize)
			twoBary = twoBary + (p.deltaTime / 1000) * barSpeed;
	}
	if (p.keyIsDown(p.RIGHT_ARROW)) {
		if (twoBary > borderSize * 2 + menuSize)
			twoBary = twoBary - (p.deltaTime / 1000) * barSpeed;
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

function update() {
	score();
	let i = ballSpeed;
	while (i > 0) {
		ballWallRedir();
		ballBarRedir();
		ballx = ballx + ballDirx;
		bally = bally + ballDiry;
		i--;
	}
}

function loop(p: p5) {
	move(p);
	update();
	p.fill("black");
	clearBoard(p);
	p.fill("white");
	drawBar(p);
	drawBall(p);
	drawBoardMidline(p);
	scoreOne(p, oneScore);
	scoreTwo(p, twoScore);
}

export default function Play() {
	const myRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (myRef.current) {
			const myP5 = new p5(Sketch, myRef.current);
			return () => {
				myP5.remove();
			};
		}
	}, []);

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
			const ms = p.millis()
			if (ms < 1000) {
				compteur(p, 3);
			}
			else if (ms < 2000) {
				compteur(p, 2);
			}
			else if (ms < 3000) {
				compteur(p, 1);
			}
			else if (ms < 3200) {
				compteur(p, 0);
			}
			else {
				loop(p);
			}
		};
	};
	return (
		<div className="Play">
			<div ref={myRef}></div>
		</div>
	);
}
