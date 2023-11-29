import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

export interface BoolState {
  isPlay: boolean;
  isLadder: boolean;
  isChat: boolean;
  isProfile: boolean;
}

const initialState: BoolState = {
  isPlay: false,
  isLadder: false,
  isChat: false,
  isProfile: false,
};

const boolSlice = createSlice({
  name: 'boolSlice',
  initialState,
  reducers: {
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setIsLadder: (state, action: PayloadAction<boolean>) => {
      state.isLadder = action.payload;
    },
    setIsChat: (state, action: PayloadAction<boolean>) => {
      state.isChat = action.payload;
    },
    setIsProfile: (state, action: PayloadAction<boolean>) => {
      state.isProfile = action.payload;
    },
  },
});

export const { setIsPlay, setIsLadder, setIsChat, setIsProfile } = boolSlice.actions;

export const store = configureStore({
  reducer: { bool: boolSlice.reducer },
});

export interface RootState {
  bool: {
    isPlay: boolean;
    isLadder: boolean;
    isChat: boolean;
    isProfile: boolean;
  };
}
