import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import Loading from './Loading';
import Play from './Play';
interface coord{
	x:number,
	y:number
}

export default function Connection() {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const [data, setData] = useState<undefined | coord>();
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [connectionDisplay, setConnectionDisplay] = useState<boolean>(true);
	const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);

	useEffect(() => {
		socket.connect();
		function onDisconnect() {
			setIsConnected(false);
		}
		function lol()
		{

		}

		function onMatchStart()
		{
			setPongDisplay(true);
			setLoadingDisplay(false);
		}
		function onData(value: coord) {
			console.log('Data : ',value);
			setData(value);
		}

		socket.on('connect', () => {
			setIsConnected(true);
			socket.emit('authentification', window.localStorage.getItem("token"));
		});
		socket.on('disconnect', onDisconnect);
		socket.on('server.data', onData);
		socket.on('401', lol);
		socket.on('server.matchStart', onMatchStart);

		return () => {
			socket.off('connect');
			socket.off('disconnect', onDisconnect);
			socket.off('data', onData);
			socket.off('401', lol);
		};
	}, []);

	function connect() {
		if (socket.connected)
			return;
		socket.connect();
			setIsConnected(true);
			socket.emit('authentification', window.localStorage.getItem("token"));

	}

	function customOnClick()
	{
		setConnectionDisplay(false);
		setLoadingDisplay(true);
		socket.emit('client.matchmaking', {mode: 'custom'});
	}

	function normalOnClick()
	{
		setConnectionDisplay(false);
		setLoadingDisplay(true);
		socket.emit('client.matchmaking', {mode: 'normal'});
	}

	function disconnect() {
		socket.disconnect();
	}
	function sendData() {
		socket.emit('client.data', window.localStorage.getItem("token"));
	}

	return (
		<div className="App">
			{connectionDisplay === true &&
			<>
			<p>State: { '' + isConnected }</p>
				<button onClick={ connect }>Connect</button>
				<button onClick={ disconnect }>Disconnect</button>
				<button onClick={ normalOnClick }>Normal Game</button>
				<button onClick={ customOnClick }>Custom Game</button>
			<p>Data: { '' + data }</p>
			<button onClick={ sendData }>Send data</button>
			</>}
			{pongDisplay === true && <Play />}
			{loadingDisplay === true && <Loading />}
		</div>
	);

}
