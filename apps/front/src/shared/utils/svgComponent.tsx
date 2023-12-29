import { ReactElement } from "react";

export type IconSVGKey =
	| "TripleDot"
	| "Reduce"
	| "Enlarge"
	| "Close"
	| "Plus"
	| "Lens"
	| "Chat"
	| "Heart"
	| "EmptyHeart"
	| "Cross"
	| "PendingHeart"
	| "Unblock"
	| "Wrench"
	| "Arrow"
	| "LogOut"
	| "Pen"
	| "Check";

export const IconSVG: { [key in IconSVGKey]: ReactElement } = {
	TripleDot: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				id="Rectangle 160"
				x="3"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 164"
				x="7"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 165"
				x="9"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 168"
				x="13"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 169"
				x="15"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 170"
				x="15"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 171"
				x="13"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 166"
				x="9"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 167"
				x="7"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 161"
				x="3"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 162"
				x="1"
				y="7"
				width="2"
				height="2"
				fill="white"
			/>
			<rect
				id="Rectangle 163"
				x="1"
				y="9"
				width="2"
				height="2"
				fill="white"
			/>
		</svg>
	),
	Reduce: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="3" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="13" y="9" width="2" height="2" fill="#FAF7A4" />
			<rect x="9" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="11" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="5" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="13" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="7" y="11" width="2" height="2" fill="#FAF7A4" />
			<rect x="7" y="9" width="2" height="2" fill="#FAF7A4" />
			<rect x="3" y="9" width="2" height="2" fill="#FAF7A4" />
			<rect x="9" y="9" width="2" height="2" fill="#FAF7A4" />
			<rect x="5" y="9" width="2" height="2" fill="#FAF7A4" />
			<rect x="11" y="9" width="2" height="2" fill="#FAF7A4" />
		</svg>
	),
	Enlarge: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="3" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="3" y="6" width="2" height="2" fill="#00BBAA" />
			<rect x="3" y="8" width="2" height="2" fill="#00BBAA" />
			<rect x="3" y="10" width="2" height="2" fill="#00BBAA" />
			<rect x="3" y="12" width="2" height="2" fill="#00BBAA" />
			<rect x="3" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="6" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="8" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="10" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="12" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="9" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="9" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="5" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="11" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="11" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="5" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="7" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
			<rect x="7" y="4" width="2" height="2" fill="#00BBAA" />
			<rect x="11" y="6" width="2" height="2" fill="#00BBAA" />
			<rect x="5" y="6" width="2" height="2" fill="#00BBAA" />
			<rect x="7" y="6" width="2" height="2" fill="#00BBAA" />
			<rect x="9" y="6" width="2" height="2" fill="#00BBAA" />
		</svg>
	),
	Close: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="4"
				y="5"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="10"
				y="7"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="12"
				y="5"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="6"
				y="7"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="6"
				y="11"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="4"
				y="13"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="8"
				y="9"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="10"
				y="11"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
			<rect
				x="12"
				y="13"
				width="2"
				height="2"
				fill="#F06E8D"
				stroke="#F06E8D"
			/>
		</svg>
	),
	Plus: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="8" width="2" height="2" fill="white" />
			<rect x="8" y="2" width="2" height="2" fill="white" />
			<rect x="8" y="4" width="2" height="2" fill="white" />
			<rect x="8" y="6" width="2" height="2" fill="white" />
			<rect x="8" y="8" width="2" height="2" fill="white" />
			<rect x="10" y="8" width="2" height="2" fill="white" />
			<rect x="12" y="8" width="2" height="2" fill="white" />
			<rect x="14" y="8" width="2" height="2" fill="white" />
			<rect x="16" y="8" width="2" height="2" fill="white" />
			<rect x="8" y="10" width="2" height="2" fill="white" />
			<rect x="8" y="12" width="2" height="2" fill="white" />
			<rect x="8" y="14" width="2" height="2" fill="white" />
			<rect x="8" y="16" width="2" height="2" fill="white" />
			<rect x="6" y="8" width="2" height="2" fill="white" />
			<rect x="4" y="8" width="2" height="2" fill="white" />
			<rect x="2" y="8" width="2" height="2" fill="white" />
			<rect y="8" width="2" height="2" fill="white" />
		</svg>
	),
	Lens: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 9 1)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 7 1)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 5 3)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 3 5)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 3 7)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 5 9)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 7 11)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 9 11)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 11 9)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 13 7)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 13 5)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 11 3)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 13 11)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 15 13)"
				fill="white"
			/>
			<rect
				width="2"
				height="2"
				transform="matrix(-1 0 0 1 17 15)"
				fill="white"
			/>
		</svg>
	),
	Chat: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_826_7188)">
				<rect y="16" width="2" height="2" fill="white" />
				<rect y="14" width="2" height="2" fill="white" />
				<rect y="12" width="2" height="2" fill="white" />
				<rect y="10" width="2" height="2" fill="white" />
				<rect y="8" width="2" height="2" fill="white" />
				<rect y="6" width="2" height="2" fill="white" />
				<rect y="4" width="2" height="2" fill="white" />
				<rect x="2" y="2" width="2" height="2" fill="white" />
				<rect x="4" width="2" height="2" fill="white" />
				<rect x="6" width="2" height="2" fill="white" />
				<rect x="8" width="2" height="2" fill="white" />
				<rect x="10" width="2" height="2" fill="white" />
				<rect x="12" width="2" height="2" fill="white" />
				<rect x="14" y="2" width="2" height="2" fill="white" />
				<rect x="16" y="4" width="2" height="2" fill="white" />
				<rect x="16" y="6" width="2" height="2" fill="white" />
				<rect x="16" y="8" width="2" height="2" fill="white" />
				<rect x="14" y="10" width="2" height="2" fill="white" />
				<rect x="12" y="12" width="2" height="2" fill="white" />
				<rect x="10" y="12" width="2" height="2" fill="white" />
				<rect x="8" y="12" width="2" height="2" fill="white" />
				<rect x="6" y="12" width="2" height="2" fill="white" />
				<rect x="4" y="14" width="2" height="2" fill="white" />
				<rect x="4" y="6" width="2" height="2" fill="white" />
				<rect x="8" y="6" width="2" height="2" fill="white" />
				<rect x="12" y="6" width="2" height="2" fill="white" />
				<rect x="2" y="16" width="2" height="2" fill="white" />
			</g>
			<defs>
				<clipPath id="clip0_826_7188">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	Heart: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="8" y="3" width="2" height="2" fill="white" />
			<rect x="6" y="1" width="2" height="2" fill="white" />
			<rect x="4" y="1" width="2" height="2" fill="white" />
			<rect x="2" y="1" width="2" height="2" fill="white" />
			<rect y="3" width="2" height="2" fill="white" />
			<rect x="2" y="3" width="2" height="2" fill="white" />
			<rect x="4" y="3" width="2" height="2" fill="white" />
			<rect x="6" y="3" width="2" height="2" fill="white" />
			<rect x="6" y="5" width="2" height="2" fill="white" />
			<rect x="4" y="5" width="2" height="2" fill="white" />
			<rect x="2" y="5" width="2" height="2" fill="white" />
			<rect x="2" y="7" width="2" height="2" fill="white" />
			<rect x="4" y="7" width="2" height="2" fill="white" />
			<rect x="6" y="7" width="2" height="2" fill="white" />
			<rect x="4" y="9" width="2" height="2" fill="white" />
			<rect x="6" y="9" width="2" height="2" fill="white" />
			<rect x="6" y="11" width="2" height="2" fill="white" />
			<rect x="8" y="13" width="2" height="2" fill="white" />
			<rect x="8" y="11" width="2" height="2" fill="white" />
			<rect x="10" y="11" width="2" height="2" fill="white" />
			<rect x="8" y="9" width="2" height="2" fill="white" />
			<rect x="10" y="9" width="2" height="2" fill="white" />
			<rect x="12" y="9" width="2" height="2" fill="white" />
			<rect x="14" y="7" width="2" height="2" fill="white" />
			<rect x="12" y="7" width="2" height="2" fill="white" />
			<rect x="10" y="7" width="2" height="2" fill="white" />
			<rect x="8" y="7" width="2" height="2" fill="white" />
			<rect x="8" y="5" width="2" height="2" fill="white" />
			<rect x="10" y="5" width="2" height="2" fill="white" />
			<rect x="10" y="3" width="2" height="2" fill="white" />
			<rect x="12" y="3" width="2" height="2" fill="white" />
			<rect x="14" y="3" width="2" height="2" fill="white" />
			<rect x="14" y="5" width="2" height="2" fill="white" />
			<rect x="12" y="5" width="2" height="2" fill="white" />
			<rect y="5" width="2" height="2" fill="white" />
			<rect y="7" width="2" height="2" fill="white" />
			<rect x="2" y="9" width="2" height="2" fill="white" />
			<rect x="4" y="11" width="2" height="2" fill="white" />
			<rect x="6" y="13" width="2" height="2" fill="white" />
			<rect x="8" y="15" width="2" height="2" fill="white" />
			<rect x="10" y="13" width="2" height="2" fill="white" />
			<rect x="12" y="11" width="2" height="2" fill="white" />
			<rect x="14" y="9" width="2" height="2" fill="white" />
			<rect x="16" y="7" width="2" height="2" fill="white" />
			<rect x="16" y="5" width="2" height="2" fill="white" />
			<rect x="16" y="3" width="2" height="2" fill="white" />
			<rect x="14" y="1" width="2" height="2" fill="white" />
			<rect x="12" y="1" width="2" height="2" fill="white" />
			<rect x="10" y="1" width="2" height="2" fill="white" />
		</svg>
	),
	EmptyHeart: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="8" y="3" width="2" height="2" fill="white" />
			<rect x="6" y="1" width="2" height="2" fill="white" />
			<rect x="4" y="1" width="2" height="2" fill="white" />
			<rect x="2" y="1" width="2" height="2" fill="white" />
			<rect y="3" width="2" height="2" fill="white" />
			<rect y="5" width="2" height="2" fill="white" />
			<rect y="7" width="2" height="2" fill="white" />
			<rect x="2" y="9" width="2" height="2" fill="white" />
			<rect x="4" y="11" width="2" height="2" fill="white" />
			<rect x="6" y="13" width="2" height="2" fill="white" />
			<rect x="8" y="15" width="2" height="2" fill="white" />
			<rect x="10" y="13" width="2" height="2" fill="white" />
			<rect x="12" y="11" width="2" height="2" fill="white" />
			<rect x="14" y="9" width="2" height="2" fill="white" />
			<rect x="16" y="7" width="2" height="2" fill="white" />
			<rect x="16" y="5" width="2" height="2" fill="white" />
			<rect x="16" y="3" width="2" height="2" fill="white" />
			<rect x="14" y="1" width="2" height="2" fill="white" />
			<rect x="12" y="1" width="2" height="2" fill="white" />
			<rect x="10" y="1" width="2" height="2" fill="white" />
		</svg>
	),
	Cross: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<g clipPath="url(#clip0_389_7902)">
				<rect width="2" height="2" fill="white" />
				<rect y="2" width="2" height="2" fill="white" />
				<rect x="2" width="2" height="2" fill="white" />
				<rect x="2" y="4" width="2" height="2" fill="white" />
				<rect x="4" y="2" width="2" height="2" fill="white" />
				<rect x="4" y="6" width="2" height="2" fill="white" />
				<rect x="6" y="4" width="2" height="2" fill="white" />
				<rect x="2" y="2" width="2" height="2" fill="white" />
				<rect x="4" y="4" width="2" height="2" fill="white" />
				<rect x="6" y="6" width="2" height="2" fill="white" />
				<rect x="8" y="6" width="2" height="2" fill="white" />
				<rect x="10" y="4" width="2" height="2" fill="white" />
				<rect x="12" y="2" width="2" height="2" fill="white" />
				<rect x="14" width="2" height="2" fill="white" />
				<rect x="8" y="8" width="2" height="2" fill="white" />
				<rect x="10" y="6" width="2" height="2" fill="white" />
				<rect x="10" y="8" width="2" height="2" fill="white" />
				<rect x="10" y="10" width="2" height="2" fill="white" />
				<rect x="12" y="10" width="2" height="2" fill="white" />
				<rect x="12" y="12" width="2" height="2" fill="white" />
				<rect x="10" y="12" width="2" height="2" fill="white" />
				<rect x="14" y="12" width="2" height="2" fill="white" />
				<rect x="12" y="4" width="2" height="2" fill="white" />
				<rect x="12" y="6" width="2" height="2" fill="white" />
				<rect x="14" y="2" width="2" height="2" fill="white" />
				<rect x="14" y="4" width="2" height="2" fill="white" />
				<rect x="16" width="2" height="2" fill="white" />
				<rect x="16" y="2" width="2" height="2" fill="white" />
				<rect x="6" y="10" width="2" height="2" fill="white" />
				<rect x="6" y="8" width="2" height="2" fill="white" />
				<rect x="6" y="12" width="2" height="2" fill="white" />
				<rect x="4" y="12" width="2" height="2" fill="white" />
				<rect x="4" y="10" width="2" height="2" fill="white" />
				<rect x="4" y="14" width="2" height="2" fill="white" />
				<rect x="2" y="14" width="2" height="2" fill="white" />
				<rect x="2" y="12" width="2" height="2" fill="white" />
				<rect x="2" y="16" width="2" height="2" fill="white" />
				<rect y="16" width="2" height="2" fill="white" />
				<rect y="14" width="2" height="2" fill="white" />
				<rect x="8" y="10" width="2" height="2" fill="white" />
				<rect x="14" y="14" width="2" height="2" fill="white" />
				<rect x="12" y="14" width="2" height="2" fill="white" />
				<rect x="16" y="14" width="2" height="2" fill="white" />
				<rect x="16" y="16" width="2" height="2" fill="white" />
				<rect x="14" y="16" width="2" height="2" fill="white" />
			</g>
			<defs>
				<clipPath id="clip0_389_7902">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	PendingHeart: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="8" y="3" width="2" height="2" fill="white" />
			<rect x="5" y="7" width="2" height="2" fill="white" />
			<rect x="8" y="7" width="2" height="2" fill="white" />
			<rect x="11" y="7" width="2" height="2" fill="white" />
			<rect x="6" y="1" width="2" height="2" fill="white" />
			<rect x="4" y="1" width="2" height="2" fill="white" />
			<rect x="2" y="1" width="2" height="2" fill="white" />
			<rect y="3" width="2" height="2" fill="white" />
			<rect y="5" width="2" height="2" fill="white" />
			<rect y="7" width="2" height="2" fill="white" />
			<rect x="2" y="9" width="2" height="2" fill="white" />
			<rect x="4" y="11" width="2" height="2" fill="white" />
			<rect x="6" y="13" width="2" height="2" fill="white" />
			<rect x="8" y="15" width="2" height="2" fill="white" />
			<rect x="10" y="13" width="2" height="2" fill="white" />
			<rect x="12" y="11" width="2" height="2" fill="white" />
			<rect x="14" y="9" width="2" height="2" fill="white" />
			<rect x="16" y="7" width="2" height="2" fill="white" />
			<rect x="16" y="5" width="2" height="2" fill="white" />
			<rect x="16" y="3" width="2" height="2" fill="white" />
			<rect x="14" y="1" width="2" height="2" fill="white" />
			<rect x="12" y="1" width="2" height="2" fill="white" />
			<rect x="10" y="1" width="2" height="2" fill="white" />
		</svg>
	),
	Unblock: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<g clipPath="url(#clip0_389_7946)">
				<rect x="8" width="2" height="2" fill="white" />
				<rect x="6" width="2" height="2" fill="white" />
				<rect x="10" width="2" height="2" fill="white" />
				<rect x="4" width="2" height="2" fill="white" />
				<rect
					width="2"
					height="2"
					transform="matrix(-1 0 0 1 2 4)"
					fill="white"
				/>
				<rect
					width="2"
					height="2"
					transform="matrix(-1 0 0 1 4 2)"
					fill="white"
				/>
				<rect y="6" width="2" height="2" fill="white" />
				<rect y="8" width="2" height="2" fill="white" />
				<rect y="10" width="2" height="2" fill="white" />
				<rect y="12" width="2" height="2" fill="white" />
				<rect x="2" y="14" width="2" height="2" fill="white" />
				<rect x="2" y="14" width="2" height="2" fill="white" />
				<rect x="4" y="12" width="2" height="2" fill="white" />
				<rect x="6" y="10" width="2" height="2" fill="white" />
				<rect x="8" y="8" width="2" height="2" fill="white" />
				<rect x="10" y="6" width="2" height="2" fill="white" />
				<rect x="12" y="4" width="2" height="2" fill="white" />
				<rect x="4" y="16" width="2" height="2" fill="white" />
				<rect x="6" y="16" width="2" height="2" fill="white" />
				<rect x="8" y="16" width="2" height="2" fill="white" />
				<rect x="10" y="16" width="2" height="2" fill="white" />
				<rect x="12" y="16" width="2" height="2" fill="white" />
				<rect x="16" y="12" width="2" height="2" fill="white" />
				<rect x="14" y="14" width="2" height="2" fill="white" />
				<rect x="16" y="10" width="2" height="2" fill="white" />
				<rect x="16" y="8" width="2" height="2" fill="white" />
				<rect x="16" y="6" width="2" height="2" fill="white" />
				<rect x="16" y="4" width="2" height="2" fill="white" />
				<rect x="12" width="2" height="2" fill="white" />
				<rect x="14" y="2" width="2" height="2" fill="white" />
			</g>
			<defs>
				<clipPath id="clip0_389_7946">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	Wrench: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="11" y="1" width="2" height="2" fill="#49317B" />
			<rect x="9" y="1" width="2" height="2" fill="#49317B" />
			<rect x="7" y="5" width="2" height="2" fill="#49317B" />
			<rect x="7" y="7" width="2" height="2" fill="#49317B" />
			<rect x="5" y="9" width="2" height="2" fill="#49317B" />
			<rect x="3" y="11" width="2" height="2" fill="#49317B" />
			<rect x="9" y="7" width="2" height="2" fill="#49317B" />
			<rect x="11" y="9" width="2" height="2" fill="#49317B" />
			<rect x="9" y="9" width="2" height="2" fill="#49317B" />
			<rect x="7" y="11" width="2" height="2" fill="#49317B" />
			<rect x="5" y="13" width="2" height="2" fill="#49317B" />
			<rect x="3" y="15" width="2" height="2" fill="#49317B" />
			<rect x="1" y="13" width="2" height="2" fill="#49317B" />
			<rect x="1" y="15" width="2" height="2" fill="#49317B" />
			<rect x="3" y="13" width="2" height="2" fill="#49317B" />
			<rect x="5" y="11" width="2" height="2" fill="#49317B" />
			<rect x="7" y="9" width="2" height="2" fill="#49317B" />
			<rect x="13" y="9" width="2" height="2" fill="#49317B" />
			<rect x="15" y="5" width="2" height="2" fill="#49317B" />
			<rect x="15" y="7" width="2" height="2" fill="#49317B" />
			<rect x="7" y="3" width="2" height="2" fill="#49317B" />
		</svg>
	),
	Arrow: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="12" y="8" width="2" height="2" fill="white" />
			<rect x="10" y="10" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 10 8)"
				fill="white"
			/>
			<rect x="8" y="12" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 8 6)"
				fill="white"
			/>
			<rect x="6" y="14" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 6 4)"
				fill="white"
			/>
			<rect x="6" y="8" width="2" height="2" fill="white" />
			<rect x="8" y="8" width="2" height="2" fill="white" />
			<rect x="10" y="8" width="2" height="2" fill="white" />
			<rect x="8" y="10" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 8 8)"
				fill="white"
			/>
			<rect x="6" y="10" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 6 8)"
				fill="white"
			/>
			<rect x="6" y="12" width="2" height="2" fill="white" />
			<rect
				width="2"
				height="2"
				transform="matrix(1 0 0 -1 6 6)"
				fill="white"
			/>
		</svg>
	),
	LogOut: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 44 44"
			fill="none"
		>
			<rect x="8.79626" y="8" width="4" height="4" fill="white" />
			<rect x="8.79626" y="32" width="4" height="4" fill="white" />
			<rect x="12.7963" y="8" width="4" height="4" fill="white" />
			<rect x="12.7963" y="32" width="4" height="4" fill="white" />
			<rect x="16.7963" y="8" width="4" height="4" fill="white" />
			<rect x="20.7963" y="12" width="4" height="4" fill="white" />
			<rect x="16.7963" y="32" width="4" height="4" fill="white" />
			<rect x="20.7963" y="28" width="4" height="4" fill="white" />
			<rect x="37" y="20" width="4" height="4" fill="white" />
			<rect x="33" y="16" width="4" height="4" fill="white" />
			<rect x="29" y="12" width="4" height="4" fill="white" />
			<rect x="29" y="16" width="4" height="4" fill="white" />
			<rect x="29" y="20" width="4" height="4" fill="white" />
			<rect x="29" y="24" width="4" height="4" fill="white" />
			<rect x="29" y="28" width="4" height="4" fill="white" />
			<rect x="33" y="24" width="4" height="4" fill="white" />
			<rect x="33" y="20" width="4" height="4" fill="white" />
			<rect x="25" y="20" width="4" height="4" fill="white" />
			<rect x="21" y="20" width="4" height="4" fill="white" />
			<rect x="17" y="20" width="4" height="4" fill="white" />
			<rect x="4.79626" y="12" width="4" height="4" fill="white" />
			<rect x="4.79626" y="16" width="4" height="4" fill="white" />
			<rect x="4.79626" y="20" width="4" height="4" fill="white" />
			<rect x="4.79626" y="24" width="4" height="4" fill="white" />
			<rect x="4.79626" y="28" width="4" height="4" fill="white" />
		</svg>
	),
	Pen: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_389_7713)">
				<rect x="10" width="2" height="2" fill="white" />
				<rect x="8" y="2" width="2" height="2" fill="white" />
				<rect x="6" y="4" width="2" height="2" fill="white" />
				<rect x="4" y="6" width="2" height="2" fill="white" />
				<rect x="2" y="8" width="2" height="2" fill="white" />
				<rect y="10" width="2" height="2" fill="white" />
				<rect y="14" width="2" height="2" fill="white" />
				<rect y="16" width="2" height="2" fill="white" />
				<rect x="2" y="16" width="2" height="2" fill="white" />
				<rect x="4" y="16" width="2" height="2" fill="white" />
				<rect x="6" y="16" width="2" height="2" fill="white" />
				<rect x="4" y="14" width="2" height="2" fill="white" />
				<rect x="2" y="14" width="2" height="2" fill="white" />
				<rect x="2" y="12" width="2" height="2" fill="white" />
				<rect x="4" y="12" width="2" height="2" fill="white" />
				<rect x="6" y="10" width="2" height="2" fill="white" />
				<rect x="8" y="8" width="2" height="2" fill="white" />
				<rect x="10" y="6" width="2" height="2" fill="white" />
				<rect x="12" y="4" width="2" height="2" fill="white" />
				<rect y="12" width="2" height="2" fill="white" />
				<rect x="12" y="2" width="2" height="2" fill="white" />
				<rect x="14" y="4" width="2" height="2" fill="white" />
				<rect x="16" y="6" width="2" height="2" fill="white" />
				<rect x="14" y="8" width="2" height="2" fill="white" />
				<rect x="12" y="10" width="2" height="2" fill="white" />
				<rect x="10" y="12" width="2" height="2" fill="white" />
				<rect x="8" y="14" width="2" height="2" fill="white" />
			</g>
			<defs>
				<clipPath id="clip0_389_7713">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
	Check: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect y="8" width="2" height="2" fill="white" />
			<rect x="2" y="10" width="2" height="2" fill="white" />
			<rect x="4" y="12" width="2" height="2" fill="white" />
			<rect x="6" y="14" width="2" height="2" fill="white" />
			<rect x="8" y="12" width="2" height="2" fill="white" />
			<rect x="10" y="10" width="2" height="2" fill="white" />
			<rect x="12" y="8" width="2" height="2" fill="white" />
			<rect x="14" y="6" width="2" height="2" fill="white" />
			<rect x="16" y="4" width="2" height="2" fill="white" />
		</svg>
	),
};
