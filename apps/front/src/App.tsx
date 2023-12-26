import { useState } from 'react';
import './css/App.css';
import Redux from './pages/redux';
import HomePage from './pages/HomePage';


export default function App() {
	const [homeDisplay, setHomeDisplay]	= useState(true);
	const [reduxDisplay, setReduxDisplay]	= useState(false);
	function toggleReduxDisplay() {
		setHomeDisplay(false);
		setReduxDisplay(true);
	}
		return (
			<div>
				{homeDisplay === true && <HomePage toggleReduxDisplay={toggleReduxDisplay}/>}
				{reduxDisplay === true && <Redux />}
			</div>
		);
}
