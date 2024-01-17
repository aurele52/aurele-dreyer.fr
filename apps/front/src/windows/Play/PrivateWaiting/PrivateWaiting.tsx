interface waitingProps {
	onPrivateAbort: () => void,
}
export default function PrivateWaiting(props: waitingProps)
{
	return(
		<div className="PrivateWaiting"><button onClick={props.onPrivateAbort}>Abort</button></div>
	)
}
