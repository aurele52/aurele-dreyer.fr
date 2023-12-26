import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface coord{
	x:number,
	y:number
}

export default function Connection() {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const [fooEvents, setFooEvents] = useState<unknown[]>([]);
	const [data, setData] = useState<undefined | coord>();

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onFooEvent(value: unknown) {
			setFooEvents(previous => [...previous, value]);
		}

		function onData(value: coord) {
			console.log('Data : ',value);
			setData(value);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('server.pong', onFooEvent);
		socket.on('server.data', onData);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('server.pong', onFooEvent);
			socket.off('data', onData);
		};
	}, []);

	function connect() {
		socket.connect();
	}

	function disconnect() {
		socket.disconnect();
	}
	const lolJSON=
	{
		x: 10,
		y: 20,
	}
	function sendData() {
		socket.emit('client.data', lolJSON);
	}

	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function onSubmit(event:any) {
		event.preventDefault();
		setIsLoading(true);

		socket.timeout(5000).emit('client.ping', value, () => {
			setIsLoading(false);
		});
	}

	return (
		<div className="App">
			<p>State: { '' + isConnected }</p>;
			<ul>
				{
					fooEvents.map((event, index) =>
						<li key={ index }>{ event }</li>
					)
				}
			</ul>
			<>
				<button onClick={ connect }>Connect</button>
				<button onClick={ disconnect }>Disconnect</button>
			</>
			<form onSubmit={ onSubmit }>
				<input onChange={ e => setValue(e.target.value) } />

				<button type="submit" disabled={ isLoading }>Submit</button>
			</form>
			<p>Data: { '' + data }</p>;
			<button onClick={ sendData }>Send data</button>
		</div>
	);

}
