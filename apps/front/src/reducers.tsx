import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WinColor } from "./utils/WindowTypes";

interface WindowData {
  WindowName: string;
  width: string;
  height: string;
  id: number;
  content: { type: string, id?: number};
  toggle: boolean;
  modal: boolean;
  handleBarButton: number;
  color: WinColor;
  targetId?: number;
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

function windowExists(windows: WindowData[], type: string) {
  return windows.some(window => window.content.type === type);
}

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    addWindow: (state, action: PayloadAction<WindowData>) => {
      const restrictedTypes = ['CHAT', 'FINDCHAN', 'LADDER', 'NEWCHAN', 'SELFPROFILE', 'ABOUTCHAN', 'ACHIEVEMENTS'];

      if (restrictedTypes.includes(action.payload.content.type) &&
          windowExists(state.windows, action.payload.content.type)) {
          const windowIndex = state.windows.findIndex(window => window.content.type === action.payload.content.type);
          if (state.windows[windowIndex].toggle) {
            state.windows.splice(windowIndex, 1);
          }
          return;
      }
      const res = action.payload;
      res.id = state.id;
      state.windows.push(res);
      state.id++;
    },
    delWindow: (state, action: PayloadAction<number>) => ({
      ...state,
      windows: [
        ...state.windows.filter((element) => element.id !== action.payload),
      ],
    }),
  },
});

export const { addWindow, delWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
