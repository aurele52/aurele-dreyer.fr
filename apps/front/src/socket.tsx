import { io } from "socket.io-client";

// const domainNameBack = process.env.REACT_APP_DOMAIN_NAME;
const domainNameBack = "http://172.23.181.5:3000";

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(domainNameBack, {
	autoConnect: false,
});
