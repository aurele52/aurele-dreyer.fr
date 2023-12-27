import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Button.css";
import { HTMLAttributes, ReactElement, useEffect, useState } from "react";
import api from "../../../axios";
import { ModalType, addModal } from "../../utils/AddModal";
import { HBButton, WinColor } from "../../utils/WindowTypes";
import store from "../../../store";
import { addWindow } from "../../../reducers";

type IconKey =
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
	| "Arrow";

const Icons: { [key in IconKey]: ReactElement } = {
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
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="11" y="1" width="2" height="2" fill="white" />
			<rect x="9" y="1" width="2" height="2" fill="white" />
			<rect x="7" y="5" width="2" height="2" fill="white" />
			<rect x="7" y="7" width="2" height="2" fill="white" />
			<rect x="5" y="9" width="2" height="2" fill="white" />
			<rect x="3" y="11" width="2" height="2" fill="white" />
			<rect x="9" y="7" width="2" height="2" fill="white" />
			<rect x="11" y="9" width="2" height="2" fill="white" />
			<rect x="9" y="9" width="2" height="2" fill="white" />
			<rect x="7" y="11" width="2" height="2" fill="white" />
			<rect x="5" y="13" width="2" height="2" fill="white" />
			<rect x="3" y="15" width="2" height="2" fill="white" />
			<rect x="1" y="13" width="2" height="2" fill="white" />
			<rect x="1" y="15" width="2" height="2" fill="white" />
			<rect x="3" y="13" width="2" height="2" fill="white" />
			<rect x="5" y="11" width="2" height="2" fill="white" />
			<rect x="7" y="9" width="2" height="2" fill="white" />
			<rect x="13" y="9" width="2" height="2" fill="white" />
			<rect x="15" y="5" width="2" height="2" fill="white" />
			<rect x="15" y="7" width="2" height="2" fill="white" />
			<rect x="7" y="3" width="2" height="2" fill="white" />
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
};

type ButtonProps = {
	color: string;
	icon?: keyof typeof Icons;
	content?: string;
	type?: "button" | "submit" | "reset";
} & HTMLAttributes<HTMLButtonElement>;

export function Button({
	icon,
	content,
	color,
	className,
	type,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			{...props}
			className={`${color} ${className || ""} Button`}
		>
			<div className={`ButtonInner ${content && "ButtonText"}`}>
				{icon && Icons[icon]}
				{content}
			</div>
		</button>
	);
}

type HeartButtonProps = {
	userId: number;
	username: string;
} & HTMLAttributes<HTMLButtonElement>;

type FriendShipData = {
	id: number;
	user1_id: number;
	user2_id: number;
	status: "FRIENDS" | "BLOCKED" | "PENDING";
};

export function HeartButton({
	className,
	userId,
	username,
	...props
}: HeartButtonProps) {
	const queryClient = useQueryClient();

	const { data: friendship } = useQuery<FriendShipData>({
		queryKey: ["friendship", userId],
		queryFn: async () => {
			return api
				.get("/friendship/" + userId)
				.then((response) => response.data);
		},
	});

	const { mutateAsync: createFriendship } = useMutation({
		mutationFn: async (user2_id: number) => {
			return api.post("/friendship", { user2_id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["friendship", userId],
			});
			queryClient.invalidateQueries({
				queryKey: ["addFriendsList"],
			});
		},
	});

	const [friendStatus, setFriendStatus] = useState<IconKey>("EmptyHeart");

	useEffect(() => {
		let status: IconKey = "EmptyHeart";

		if (friendship) {
			if (friendship === undefined) status = "EmptyHeart";
			else if (friendship.status === "FRIENDS") status = "Heart";
			else if (friendship.status === "PENDING") status = "PendingHeart";
			else if (friendship.status === "BLOCKED") status = "Unblock";
		}
		setFriendStatus(status);
	}, [friendship, userId]);

	const isBlocked = () => {
		if (friendship && friendship.status === "BLOCKED") return true;
		return false;
	};

	const isBlockedByMe = () => {
		if (friendship?.user2_id === userId && friendship.status === "BLOCKED")
			return true;
		return false;
	};

	const handleFriendshipBtn = () => {
		if (friendStatus === "Heart") {
			addModal(
				ModalType.WARNING,
				`Are you sure you want to remove ${username} from your friends?`,
				"deleteFriendship",
				userId
			);
		} else if (friendStatus === "PendingHeart") {
			const newWindow = {
				WindowName: "PENDING FRIEND REQUESTS",
				width: "300",
				height: "300",
				id: 0,
				content: { type: "PENDINGREQUESTS" },
				toggle: false,
				handleBarButton:
					HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
				color: WinColor.PURPLE,
			};
			store.dispatch(addWindow(newWindow));
		} else if (friendStatus === "EmptyHeart") {
			createFriendship(userId);
		} else if (friendStatus === "Unblock") {
			addModal(
				ModalType.WARNING,
				`Are you sure you want to unblock ${username}?`,
				"deleteBlockedFriendship",
				userId
			);
		}
	};

	return !isBlocked() || isBlockedByMe() ? (
		<button
			type="button"
			{...props}
			className={`pink ${className || ""} Button`}
			onClick={handleFriendshipBtn}
		>
			<div className={`ButtonInner`}>{Icons[friendStatus]}</div>
		</button>
	) : null;
}

type PendingButtonProps = {
	userId: number;
} & HTMLAttributes<HTMLButtonElement>;

export function PendingButton({
	userId,
	className,
	...props
}: PendingButtonProps) {
	const queryClient = useQueryClient();

	const { data: friendship } = useQuery<FriendShipData>({
		queryKey: ["friendship", userId],
		queryFn: async () => {
			return api
				.get("/friendship/" + userId)
				.then((response) => response.data);
		},
	});

	const [requestStatus, setRequestStatus] = useState<IconKey>("EmptyHeart");

	useEffect(() => {
		let status: IconKey = "EmptyHeart";

		if (friendship && friendship.status === "PENDING") {
			if (friendship.user1_id === userId) status = "EmptyHeart";
			else status = "Cross";
		}
		setRequestStatus(status);
	}, [friendship, userId]);

	const { mutateAsync: acceptFriendship } = useMutation({
		mutationFn: async () => {
			return api.patch("/friendship/accept/" + userId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user", userId],
			});
			queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friendsList"] });
		},
	});

	const { mutateAsync: deletePendingFriendship } = useMutation({
		mutationFn: async () => {
			return api.delete("/relationship/pending/" + userId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["friendship", userId],
			});
			queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
			queryClient.invalidateQueries({
				queryKey: ["user", userId],
			});
		},
	});

	const handlePendingBtn = () => {
		if (requestStatus === "EmptyHeart") {
			acceptFriendship();
		} else if (requestStatus === "Cross") {
			deletePendingFriendship();
		}
	};

	return (
		<button
			type="button"
			{...props}
			className={`pink ${className || ""} Button`}
			onClick={handlePendingBtn}
		>
			<div className={`ButtonInner`}>{Icons[requestStatus]}</div>
		</button>
	);
}
