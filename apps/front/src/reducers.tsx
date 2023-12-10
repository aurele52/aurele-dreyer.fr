import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { JSX } from 'react/jsx-runtime';
//import { combineReducers } from 'redux';
//import { ComponentType } from 'react';
//import { Play } from './modules/Play';
//import { Ladder } from './modules/Ladder';
//import { Chat } from './modules/Chat';
//import { Profile } from './modules/Profile';

  interface WindowData {
    WindowName: string;
    width: string;
    height: string;
    id: number;
    content: {type: string};
  }

export interface AppState<T = WindowData> {
    windows: T[];
    id: number;
  }
  
  export const ADD_WINDOW = 'ADD_WINDOW';
  
  const initialState: AppState = {
    windows: [],
    id: 10
  };
  

  
  const windowsSlice = createSlice({
    name: 'windows',
    initialState,
    reducers: {
      addWindow: (state, action: PayloadAction<WindowData>) => {
        const res = action.payload;
        res.id = state.id;
        console.log(res);
        state.windows.push(res);
        state.id++;
      },
      delWindow: (state, action: PayloadAction<number>) => ({
        ...state,
        windows:[
            ...state.windows.filter((element) => element.id !== action.payload)
        ],
      })
    },
  });
  
  export const { addWindow, delWindow } = windowsSlice.actions;
  

  export default windowsSlice.reducer;
