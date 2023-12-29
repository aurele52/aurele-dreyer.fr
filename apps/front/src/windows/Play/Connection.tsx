import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';
interface coord{
	x:number,
	y:number
}

export default function Connection() {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const [data, setData] = useState<undefined | coord>();
	const [createDisplay, setCreateDisplay] = useState<boolean>(false);
	const [joinDisplay, setJoinDisplay] = useState<boolean>(false);

	useEffect(() => {
		socket.connect();
		function onDisconnect() {
			setIsConnected(false);
		}
		function lol()
		{

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

		return () => {
			socket.off('connect');
			socket.off('disconnect', onDisconnect);
			socket.off('data', onData);
		};
	}, []);

	function connect() {
		if (socket.connected)
			return;
		socket.connect();
			setIsConnected(true);
			socket.emit('authentification', window.localStorage.getItem("token"));

	}

	function createOnClick()
	{
		setCreateDisplay(true);
	}

	function joinGroup()
	{
		setJoinDisplay(true);
	}

	function disconnect() {
		socket.disconnect();
	}
	function sendData() {
		socket.emit('client.data', window.localStorage.getItem("token"));
	}

	return (
		<div className="App">
			<p>State: { '' + isConnected }</p>;
			<>
				<button onClick={ connect }>Connect</button>
				<button onClick={ disconnect }>Disconnect</button>
			</>
				<button onClick={ createOnClick }>Create Group</button>
				<button onClick={ joinGroup }>Join Group</button>
			<p>Data: { '' + data }</p>;
			<button onClick={ sendData }>Send data</button>
			{createDisplay === true && <CreateGroup />}
			{joinDisplay === true && <JoinGroup />}
		</div>
	);

}
