import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WinColor } from "./shared/utils/WindowTypes";
import { ReactNode } from "react";
import { ModalType } from "./shared/utils/AddModal";
import { ActionKey } from "./shared/ui-components/Modal/Modal";

interface WindowData {
	WindowName: string;
	position?: {
		x: string;
		y: string;
	};
	id: number;
	content: { type: string; id?: number };
	toggle: boolean;
	modal?: {
		type: ModalType;
		content: ReactNode;
		action?: ActionKey;
		targetId?: number;
		channelId?: number;
	};
	handleBarButton: number;
	color: WinColor;
	targetId?: number;
	channelId?: number;
}

export interface AppState<T = WindowData> {
	windows: T[];
	id: number;
}

export const ADD_WINDOW = "ADD_WINDOW";

const initialState: AppState = {
	windows: [],
	id: 10,
};

function windowExists(windows: WindowData[], type: string, name: string) {
	return (
		windows.some((window) => window.content.type === type) &&
		windows.some((window) => window.WindowName === name)
	);
}

const windowsSlice = createSlice({
	name: "windows",
	initialState,
	reducers: {
		addWindow: (state, action: PayloadAction<WindowData>) => {
			const restrictedTypes = [
				"CHAT",
				"FINDCHAN",
				"LADDER",
				"NEWCHAN",
				"PROFILE",
				"ABOUTCHAN",
				"ACHIEVEMENTS",
				"ABOUTCHAN",
				"PENDINGREQUESTS",
				"BLOCKEDUSERS",
				"ADDFRIENDS",
				"AVATARUPLOAD",
				"MEMBERSETTINGS",
			];

			if (
				restrictedTypes.includes(action.payload.content.type) &&
				windowExists(
					state.windows,
					action.payload.content.type,
					action.payload.WindowName
				)
			) {
				const windowIndex = state.windows.findIndex(
					(window) =>
						window.content.type === action.payload.content.type &&
						window.WindowName === action.payload.WindowName
				);
				if (state.windows[windowIndex].toggle) {
					state.windows.splice(windowIndex, 1);
				}
				return;
			}

			const res = action.payload;
			if (!res.position) res.position = { x: "0px", y: "0px" };
			res.id = state.id;
			state.windows.push(res);
			state.id++;
		},
		delWindow: (state, action: PayloadAction<number>) => ({
			...state,
			windows: [
				...state.windows.filter(
					(element) => element.id !== action.payload
				),
			],
		}),
	},
});

export const { addWindow, delWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
