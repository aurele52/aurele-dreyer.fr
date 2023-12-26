import React, { LegacyRef, useEffect, useRef, useState } from "react";
import p5 from 'p5';


const ysize = 490;
const xsize = 800;
const midSquareSize = 10;
const borderSize = 10;
const black = 0;
const white = 255;
const barSize = 70;
const barDist = 20;
const barLarge = 10;
const ballDeb = 150;
let ballDirx = 1;
let ballDiry = 1;
const ballSize = 10;
const barSpeed = 70.0;
const ballSpeed = 2.0;
let oneScore = 0;
let twoScore = 0;
const menuSize = 7 * midSquareSize + 2 * borderSize;
let     ballx = xsize / 2 - ballDeb;
let bally = borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;
let oneBary = borderSize * 2 + menuSize + 10;
let twoBary = borderSize * 2 + menuSize + 10;

function drawMidline(p:p5)
{
        p.fill(white);
        const area = ysize - borderSize * 3 - menuSize;
        let tmp = area / midSquareSize;
        tmp = Math.floor(tmp);
        tmp = tmp / 2;
        tmp = Math.floor(tmp);
        let i = borderSize * 2 + menuSize + (area - (midSquareSize * (tmp * 2 - 1))) / 2;
        while (i < ysize - borderSize - midSquareSize)
        {
                p.rect(xsize / 2 - midSquareSize / 2, i, midSquareSize, midSquareSize);
                i = i + midSquareSize * 2;
        }
        p.rect(xsize / 2 - midSquareSize / 2, borderSize - 1, midSquareSize, menuSize + 2);
}

function drawBorder(p:p5)
{
        p.fill(black);
        p.rect(borderSize, borderSize, xsize - borderSize * 2, menuSize);
        p.rect(borderSize, borderSize * 2 + menuSize, xsize - borderSize * 2, ysize - borderSize * 3 - menuSize);
}

function drawBar(p:p5)
{
        p.rect(borderSize + barDist, oneBary, barLarge, barSize);
        p.rect(xsize - borderSize - barDist - barLarge, twoBary, barLarge, barSize);
}

function drawOne(p:p5, x:number)
{
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 7);
        p.rect(x + midSquareSize * 2, borderSize + midSquareSize * 2, midSquareSize, midSquareSize);
}

function drawTwo(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
}

function drawThree(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
}

function drawFour(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
}

function drawFive(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
}

function drawSix(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
}

function drawSeven(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize, midSquareSize, midSquareSize * 7);
}

function drawEight(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
}

function drawNine(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
}

function drawZero(p:p5, x:number)
{
        p.rect(x, borderSize + midSquareSize, midSquareSize * 4, midSquareSize);
        p.rect(x, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
        p.rect(x + midSquareSize * 3 , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x , borderSize + midSquareSize * 7, midSquareSize * 4, midSquareSize);
        p.rect(x , borderSize + midSquareSize * 4, midSquareSize, midSquareSize * 3);
        p.rect(x + midSquareSize * 3, borderSize + midSquareSize, midSquareSize, midSquareSize * 4);
}

function drawNumber(p:p5, nb:number, x:number)
{
        if (nb === 0)
                drawZero(p, x);
        if (nb === 1)
                drawOne(p, x);
        if (nb === 2)
                drawTwo(p, x);
        if (nb === 3)
                drawThree(p, x);
        if (nb === 4)
                drawFour(p, x);
        if (nb === 5)
                drawFive(p, x);
        if (nb === 6)
                drawSix(p, x);
        if (nb === 7)
                drawSeven(p, x);
        if (nb === 8)
                drawEight(p, x);
        if (nb === 9)
                drawNine(p, x);
}

function scoreOne(p:p5, nb:number)
{
        p.fill(black);
        p.rect(midSquareSize * 2, borderSize + midSquareSize, 4 * midSquareSize, 7 * midSquareSize);
        p.fill(white);
        drawNumber(p, nb, midSquareSize * 2);
}

function scoreTwo(p:p5, nb:number)
{
        p.fill(black);
        p.rect(xsize - 6 * midSquareSize, borderSize + midSquareSize, 4 * midSquareSize, 7 * midSquareSize);
        p.fill(white);
        drawNumber(p, nb, xsize - 6 * midSquareSize);
}

function ballRedir()
{
        if (bally + ballSize + ballSpeed >= ysize - borderSize)
                ballDiry = -1;
        if (bally - ballSpeed <= borderSize * 2 + menuSize)
                ballDiry = 1;
        if (ballx <= borderSize + barLarge + barDist && ballx >= borderSize + barDist && bally <= oneBary + barSize && bally >= oneBary)
                ballDirx = 1;
        if (ballx + ballSize >= xsize - borderSize - barLarge - barDist && ballx + ballSize <= xsize - borderSize - barDist && bally + ballSize / 2 <= twoBary + barSize && bally + ballSize / 2 >= twoBary)
                ballDirx = -1;
}

function score(p:p5)
{
        if (ballx + ballSize >= xsize - borderSize - barDist)
        {
                oneScore++;
                scoreOne(p, oneScore);
                ballx = xsize / 2 + ballDeb;
                bally = borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;
                ballDirx = -1;
                ballDiry = 1;
        }
        if (ballx < borderSize + barDist / 2)
        {
                twoScore++;
                scoreTwo(p, twoScore);
                ballx = xsize / 2 - ballDeb;
                bally = borderSize * 2 + menuSize + (ysize - borderSize * 2 - menuSize) / 2;
                ballDirx = 1;
                ballDiry = 1;
        }
}

// let shadonex = -1;
// let shadoney = -1;
// let shadtwox = -1;
// let shadtwoy = -1;
// let shadthreex = -1;
// let shadthreey = -1;


function redrawBall(p:p5)
{
        // if (ballDiry == 1)
        //      p.rect(ballx - ballSpeed, bally - ballSpeed, ballSize + 10, ballSpeed);
        // if (ballDirx == 1)
        //      p.rect(ballx - ballSpeed, bally - ballSpeed, ballSpeed, ballSize + 10);
        // if (ballDirx == -1)
        //      p.rect(ballx + ballSize, bally - ballSpeed, ballSpeed, ballSize + 10);
        // if (ballDiry == -1)
        //      p.rect(ballx - ballSpeed, bally + ballSize, ballSize + 10, ballSpeed);
        //
        // shadthreex = shadtwox;
        // shadthreey = shadtwoy;
        // shadtwox = shadonex;
        // shadtwoy = shadoney;
        // shadonex = ballx;
        // shadoney = bally;
        // if (shadthreey !== -1)
        // {
        //      p.fill('black');
        //      p.rect(shadthreex, shadthreey, ballSize, ballSize);
        // }
        // if (shadtwoy !== -1)
        // {
        //      p.fill('#212121');
        //      p.rect(shadtwox, shadtwoy, ballSize, ballSize);
        // }
        // if (shadoney !== -1)
        // {
        //      p.fill('#404040');
        //      p.rect(shadonex, shadoney, ballSize, ballSize);
        // }
        //

        p.fill('white');



        ballRedir();
        ballx = ballx + ballDirx * ballSpeed;
        bally = bally + ballDiry * ballSpeed;
        p.rect(ballx, bally, ballSize, ballSize);
}


export default function Play() {
        const myRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
                if (myRef.current) {
                        const myP5 = new p5(Sketch, myRef.current)
                        return () => {
                                myP5.remove();
                        }
                }
                }, []);

        const Sketch = (p:p5) => {
                p.setup = () => {
                        p.createCanvas(xsize, ysize);
                        p.noStroke();
                        p.background(white);
                        drawBorder(p);
                        drawMidline(p);
                        drawBar(p);
                        p.frameRate(30);
                        scoreOne(p, 0);
                        scoreTwo(p, 0);
                        p.fill(white);
                        p.rect(ballx, bally, ballSize, ballSize);
                }
                p.draw = () => {
                        if (p.keyIsDown(p.DOWN_ARROW))
                        {
                                if (oneBary + barSize < ysize - borderSize)
                                        oneBary = oneBary + p.deltaTime / 1000 * barSpeed;
                        }
                        if (p.keyIsDown(p.UP_ARROW))
                        {
                        if (oneBary > borderSize * 2 + menuSize)
                                oneBary = oneBary - p.deltaTime / 1000 * barSpeed;
                        }
                        if (p.keyIsDown(p.LEFT_ARROW))
                        {
                                if (twoBary + barSize < ysize - borderSize)
                                twoBary = twoBary + p.deltaTime /1000 * barSpeed;
                        }
                        if (p.keyIsDown(p.RIGHT_ARROW))
                        {
                        if (twoBary > borderSize * 2 + menuSize)
                                twoBary = twoBary - p.deltaTime / 1000 * barSpeed;
                        }
                        p.fill('black');
                        p.rect(borderSize, menuSize + borderSize * 2, xsize - 2 * borderSize, ysize - borderSize * 3 - menuSize)
                        p.fill('white');
                        score(p);
                        drawBar(p);
                        redrawBall(p);
                        drawMidline(p);
                }
        }
        return (
		<div className="Play">
			<div ref={myRef}></div>
		</div>
        )
}
