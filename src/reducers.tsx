import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JSX } from 'react/jsx-runtime';
import { combineReducers } from 'redux';
import { ComponentType } from 'react';
import { Play } from './modules/Play';
import { Ladder } from './modules/Ladder';
import { Chat } from './modules/Chat';
import { Profile } from './modules/Profile';

  interface WindowData {
    WindowName: string;
    width: string;
    height: string;
    id: number;
    content: {type: string};
  }

export interface AppState<T = WindowData> {
    windows: T[];
  }
  
  export const ADD_WINDOW = 'ADD_WINDOW';
  
  const initialState: AppState = {
    windows: [],
  };
  

  
  const windowsSlice = createSlice({
    name: 'windows',
    initialState,
    reducers: {
      addWindow: (state, action: PayloadAction<WindowData>) => {
        console.log('Reducer received action:', action);
        state.windows.push(action.payload);
      },
    },
  });
  
  export const { addWindow } = windowsSlice.actions;
  
  export default windowsSlice.reducer;
