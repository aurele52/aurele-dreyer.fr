import { io } from 'socket.io-client';

const domainNameBack = 'http://localhost:3000';

// "undefined" means the URL will be computed from the `window.location` object
	export const socket = io(domainNameBack, {
	autoConnect: false});
