import { ReactNode, useState, useRef, useEffect } from "react";
import "./Window.css";
import { Rnd } from "react-rnd";
import { ConnectedProps, connect } from "react-redux";
import { delWindow, bringToFront } from "../../../reducers";
import { Button } from "../Button/Button";
import { HBButton, WinColor } from "../../utils/WindowTypes";

interface WindowProps extends ReduxProps {
	WindowName: string;
	width: string;
	height: string;
	id: number;
	children: ReactNode;
	handleBarButton: number;
	color: WinColor;
	isModal?: boolean;
	zindex: number;
}

export function Window({
	dispatch,
	WindowName,
	width,
	height,
	id,
	children,
	handleBarButton,
	color,
	zindex,
	isModal,
}: WindowProps) {
	const [state, setState] = useState({
		width,
		height,
		posX: 0,
		posY: 150,
		isReduced: false,
		windowMoveLock: false,
		windowResizeLock: false,
		clickStartTime: 0,
	});

	const parentDivWidth =
		document.getElementById("Background")?.offsetWidth || 0;
	const parentDivHeight =
		document.getElementById("Background")?.offsetHeight || 0;
	const rndWidth = parseInt(state.width, 10) || 0;
	const rndHeight = parseInt(state.height, 10) || 0;
	const centerX = (parentDivWidth - rndWidth) / 2;
	const centerY = (parentDivHeight - rndHeight) / 2;

	const initialPosition = isModal
		? { x: centerX, y: centerY }
		: { x: state.posX, y: state.posY };

	const rndRef = useRef<Rnd>(null);

	const handleMouseDown = () => {
		dispatch(bringToFront(id));
		setState({
			...state,
			clickStartTime: Date.now(),
		});
	};

	const handleUpdateZindex = () => {
		dispatch(bringToFront(id));
	};

	const handleMouseUp = () => {
		if (state.clickStartTime == null) return;
		const clickDuration = Date.now() - (state.clickStartTime || 0);
		if (clickDuration < 200) {
			setState({
				...state,
				isReduced: false,
				clickStartTime: 220,
				windowResizeLock: false,
				windowMoveLock: false,
			});
			rndRef.current?.updateSize({
				height: state.height,
				width: state.width,
			});
		}
	};

	const handleReduce = () => {
		if (state.isReduced) {
			setState({
				...state,
				isReduced: false,
				clickStartTime: 220,
				windowResizeLock: false,
				windowMoveLock: false,
			});
			rndRef.current?.updateSize({
				height: state.height,
				width: state.width,
			});
		} else {
			setState({
				...state,
				isReduced: true,
				clickStartTime: 0,
				windowResizeLock: true,
				windowMoveLock: false,
			});
			rndRef.current?.updateSize({
				height: "40px",
				width: "250px",
			});
		}
	};

	const handleEnlarge = () => {
		setState({
			...state,
			windowMoveLock: !state.windowMoveLock,
			windowResizeLock: !state.windowMoveLock,
		});
	};

	useEffect(() => {
		if (state.windowMoveLock) {
			rndRef.current?.updateSize({
				height: "100%",
				width: "100%",
			});
			rndRef.current?.updatePosition({
				x: 0,
				y: 0,
			});
		} else {
			rndRef.current?.updateSize({
				height: state.height,
				width: state.width,
			});
			rndRef.current?.updatePosition({
				x: initialPosition.x,
				y: initialPosition.y,
			});
		}
	}, [state.windowMoveLock]);

	const handleClose = () => {
		dispatch(delWindow(id));
	};

	return (
		<Rnd
			default={{
				x: initialPosition.x,
				y: initialPosition.y,
				width: state.width,
				height: state.height,
			}}
			minHeight={"70px"}
			minWidth={"285px"}
			bounds="#Background"
			dragHandleClassName="handleBar"
			enableResizing={!state.windowResizeLock}
			disableDragging={state.windowMoveLock}
			ref={rndRef}
			style={{ zIndex: zindex, position: "fixed" }}
			onResizeStop={(e, direction, ref, delta, position) => {
				setState({
					...state,
					width: ref.style.width,
					height: ref.style.height,
				});
			}}
		>
			<div
				className={state.isReduced ? "reducedWindow" : "Window"}
				onMouseDown={handleUpdateZindex}
			>
				<div className={`handleBar ${color}`}>
					<div
						className="WindowName heading-500"
						onMouseDown={
							state.isReduced ? handleMouseDown : undefined
						}
						onMouseUp={state.isReduced ? handleMouseUp : undefined}
					>
						{WindowName}
					</div>
					{!!(handleBarButton & HBButton.Reduce) && (
						<Button
							icon="Reduce"
							color="purple"
							onClick={handleReduce}
							className="ButtonWindow"
						/>
					)}
					{!!(handleBarButton & HBButton.Enlarge) && (
						<Button
							icon="Enlarge"
							color="purple"
							onClick={handleEnlarge}
							className="ButtonWindow"
						/>
					)}
					{!!(handleBarButton & HBButton.Close) && (
						<Button
							icon="Close"
							color="purple"
							onClick={handleClose}
							className="ButtonWindow"
						/>
					)}
				</div>
				<div className="content">{children}</div>
			</div>
		</Rnd>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedWindow = connector(Window);
export default ConnectedWindow;
