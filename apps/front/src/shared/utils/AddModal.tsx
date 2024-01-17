import { addWindow } from "../../reducers";
import store from "../../store";
import { ActionKey } from "../ui-components/Modal/Modal";
import { WinColor } from "./WindowTypes";
import { ReactElement, ReactNode } from "react";

interface Icons {
	[key: string]: ReactElement;
}
export const iconsModal: Icons = {
	WARNING: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 44 44"
			fill="none"
		>
			<g clipPath="url(#clip0_953_1089)">
				<rect x="20" width="4" height="4" fill="#D72952" />
				<rect x="16" y="4" width="4" height="4" fill="#D72952" />
				<rect x="16" y="8" width="4" height="4" fill="#D72952" />
				<rect y="40" width="4" height="4" fill="#D72952" />
				<rect y="36" width="4" height="4" fill="#D72952" />
				<rect x="4" y="32" width="4" height="4" fill="#D72952" />
				<rect x="4" y="28" width="4" height="4" fill="#D72952" />
				<rect x="8" y="24" width="4" height="4" fill="#D72952" />
				<rect x="8" y="20" width="4" height="4" fill="#D72952" />
				<rect x="12" y="16" width="4" height="4" fill="#D72952" />
				<rect x="12" y="12" width="4" height="4" fill="#D72952" />
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 32)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 24)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 20)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 16)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 4)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 8)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 36)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 32)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 28)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 24)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 20)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 16)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 12)"
					fill="#D72952"
				/>
			</g>
			<defs>
				<clipPath id="clip0_953_1089">
					<rect width="44" height="44" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	ERROR: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 44 44"
			fill="none"
		>
			<g clipPath="url(#clip0_953_1409)">
				<rect x="20" width="4" height="4" fill="#D72952" />
				<rect x="16" width="4" height="4" fill="#D72952" />
				<rect x="12" width="4" height="4" fill="#D72952" />
				<rect x="4" y="32" width="4" height="4" fill="#D72952" />
				<rect y="28" width="4" height="4" fill="#D72952" />
				<rect y="24" width="4" height="4" fill="#D72952" />
				<rect y="20" width="4" height="4" fill="#D72952" />
				<rect y="16" width="4" height="4" fill="#D72952" />
				<rect x="8" y="4" width="4" height="4" fill="#D72952" />
				<path d="M12 36H8V40H12V36Z" fill="#D72952" />
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 20)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 12)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 12)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 16)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 16)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 24)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 24)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 28)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 28)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 8)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 4 12)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 40)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 36)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 32)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 0)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 0)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 28)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 24)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 20)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 16)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 12)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 8)"
					fill="#D72952"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 4)"
					fill="#D72952"
				/>
			</g>
			<defs>
				<clipPath id="clip0_953_1409">
					<rect width="44" height="44" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	INFO: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 44 44"
			fill="none"
		>
			<g clipPath="url(#clip0_953_5593)">
				<rect x="20" width="4" height="4" fill="#BBA0E9" />
				<rect x="16" width="4" height="4" fill="#BBA0E9" />
				<rect x="12" width="4" height="4" fill="#BBA0E9" />
				<rect x="4" y="32" width="4" height="4" fill="#BBA0E9" />
				<rect y="28" width="4" height="4" fill="#BBA0E9" />
				<rect y="24" width="4" height="4" fill="#BBA0E9" />
				<rect y="20" width="4" height="4" fill="#BBA0E9" />
				<rect y="16" width="4" height="4" fill="#BBA0E9" />
				<rect x="8" y="4" width="4" height="4" fill="#BBA0E9" />
				<path d="M12 36H8V40H12V36Z" fill="#BBA0E9" />
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 28)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 32)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 24)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 20)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 16)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 4 12)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 36)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 32)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 0)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 0)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 28)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 24)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 20)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 16)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 12)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 4)"
					fill="#BBA0E9"
				/>
			</g>
			<defs>
				<clipPath id="clip0_953_5593">
					<rect width="44" height="44" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	REQUESTED: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 44 44"
			fill="none"
		>
			<g clipPath="url(#clip0_953_1739)">
				<rect x="20" width="4" height="4" fill="#BBA0E9" />
				<rect x="16" width="4" height="4" fill="#BBA0E9" />
				<rect x="12" width="4" height="4" fill="#BBA0E9" />
				<rect x="4" y="32" width="4" height="4" fill="#BBA0E9" />
				<rect y="28" width="4" height="4" fill="#BBA0E9" />
				<rect y="24" width="4" height="4" fill="#BBA0E9" />
				<rect y="20" width="4" height="4" fill="#BBA0E9" />
				<rect y="16" width="4" height="4" fill="#BBA0E9" />
				<rect x="8" y="4" width="4" height="4" fill="#BBA0E9" />
				<path d="M12 36H8V40H12V36Z" fill="#BBA0E9" />
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 32)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 24)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 20)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 16)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 12)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 8)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 4)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 12)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 16)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 20)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 24)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 28)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 12 32)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 20 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 24 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 16 36)"
					fill="white"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 8 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 4 12)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 40)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 36)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 32)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 28 0)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 32 0)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 28)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 24)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 20)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 16)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 44 12)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 40 8)"
					fill="#BBA0E9"
				/>
				<rect
					width="4"
					height="4"
					transform="matrix(-1 0 0 1 36 4)"
					fill="#BBA0E9"
				/>
			</g>
			<defs>
				<clipPath id="clip0_953_1739">
					<rect width="44" height="44" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
};

export enum ModalType {
	WARNING = "WARNING",
	ERROR = "ERROR",
	INFO = "INFO",
	REQUESTED = "REQUESTED",
}

export function addModal(
	type: ModalType,
	content?: ReactNode,
	action?: ActionKey,
	userId?: number,
	channelId?: number
) {
	let color;
	if (type === ModalType.WARNING || type === ModalType.ERROR) color = WinColor.RED;
	else color = WinColor.PURPLE;
	let height = 199;
	if (type === ModalType.REQUESTED) height = 250;
	let contentType = "MODAL";
	if (type === ModalType.REQUESTED) contentType = "MODALREQUESTED"
	const newWindow = {
		WindowName: type,
		width: "390",
		height: height,
		id: 0,
		content: { type: contentType },
		toggle: false,
		modal: {
			type,
			content,
			action,
			targetId: userId,
			channelId: channelId,
		},
		handleBarButton: 0,
		color,
	};
	store.dispatch(addWindow(newWindow));
}
