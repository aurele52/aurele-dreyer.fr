import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
	export const socket = io('http://172.23.181.5:3000', {
	autoConnect: false});
