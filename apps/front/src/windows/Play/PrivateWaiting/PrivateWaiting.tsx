import { useEffect } from "react";
import { socket } from "../../../socket";

export default function PrivateWaiting() {
	useEffect(() => {
		//socket.on()
		return () => {};
	}, []);
	return <div className="PrivateWaiting">Private Waiting</div>;
}
