import { io } from "socket.io-client";

console.log("Process Env", process.env);

const domainNameBack = process.env.REACT_APP_DOMAIN_NAME || "http://localhost:3000";

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(domainNameBack, {
	autoConnect: false,
});
