import List from './ListPage';
import AddWord from './AddWordPage';
import ModifWord from './ModifWordPage';
import Play from './Play';
import { useState } from 'react';


export default function Redux() {
		const [listDisplay, setListDisplay]	= useState(false);
		const [addWordDisplay, setAddWordDisplay]	= useState(false);
		const [modifWordDisplay, setModifWordDisplay]	= useState(false);
		const [pongDisplay, setPongDisplay]	= useState(false);
		const [wordList, setWordList]	= useState([
				{
					eng: 'hello',
					fr: 'bonjour',
					hint: 'politesse',
					level: 0
				},
				{
					eng: 'egg',
					fr: 'oeuf',
					hint: 'deb',
					level: 0
				},
				{
					eng: 'bad',
					fr: 'mauvais',
					hint: 'negatif',
					level: 0
				}
			]);
		const newWord = {
			eng: 'fds',
			fr: 'fds',
			hint: 'fds',
			level: 0
		}
	function hangleChange() {
		setWordList([...wordList, newWord]);
	}
	function toggleAddWordDisplay() {
		setListDisplay(false);
		setAddWordDisplay(true);
		setModifWordDisplay(false);
		setPongDisplay(false);
	}
	function toggleModifWordDisplay() {
		setListDisplay(false);
		setAddWordDisplay(false);
		setModifWordDisplay(true);
		setPongDisplay(false);
	}
	function toggleListDisplay() {
		setListDisplay(true);
		setAddWordDisplay(false);
		setModifWordDisplay(false);
		setPongDisplay(false);
	}
	function togglePongDisplay() {
		setListDisplay(false);
		setAddWordDisplay(false);
		setModifWordDisplay(false);
		setPongDisplay(true);
	}
	return (
		<div>
			<button onClick={toggleListDisplay}>Toggle List Display</button>
			<button onClick={toggleAddWordDisplay}>Toggle AddWordpage Display</button>
			<button onClick={toggleModifWordDisplay}>Toggle ModifWordpage Display</button>
			<button onClick={togglePongDisplay}>Toggle Pong page Display</button>
			<button onClick={hangleChange}>modif list</button>
			{listDisplay === true && <List wordList={wordList}/>}
			{modifWordDisplay === true && <ModifWord />}
			{addWordDisplay === true && <AddWord />}
			{pongDisplay === true && <Play />}
		</div>
	);
}
