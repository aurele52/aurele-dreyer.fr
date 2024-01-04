import { ReactNode, useState, useRef, useEffect } from "react";
import "./Window.css";
import { Rnd } from "react-rnd";
import { ConnectedProps, connect } from "react-redux";
import { delWindow, bringToFront } from "../../../reducers";
import { Button } from "../Button/Button";
import { HBButton, WinColor } from "../../utils/WindowTypes";
import { ModalType } from "../../utils/AddModal";
import { ActionKey } from "../Modal/Modal";

interface WindowProps extends ReduxProps {
	WindowName: string;
	width: string;
	height: string;
	id: number;
	children: ReactNode;
	handleBarButton: number;
	color: WinColor;
	modal?: {
		type: ModalType;
		content: ReactNode;
		action?: ActionKey;
		targetId?: number;
	};
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
				clickStartTime: 0,
				windowMoveLock: false,
				windowResizeLock: false,
			});
			rndRef.current?.updateSize({
				height: state.height,
				width: "",
			});
		}
	};

	const handleReduce = () => {
		setState({
			...state,
			isReduced: !state.isReduced,
			clickStartTime: 0,
			windowResizeLock: !state.isReduced,
			windowMoveLock: false,
		});
		rndRef.current?.updateSize({
			height: "70px",
			width: "",
		});
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
				x: state.posX,
				y: state.posY,
			});
		}
	}, [state.windowMoveLock]);

	const handleClose = () => {
		dispatch(delWindow(id));
	};

	return (
		<Rnd
			default={{
				x: state.posX,
				y: state.posY,
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
			style={{ zIndex: zindex }}
		>
			<div
				className={state.isReduced ? "reducedWindow" : "Window"}
				onMouseDown={
					state.isReduced ? handleMouseDown : handleUpdateZindex
				}
				onMouseUp={state.isReduced ? handleMouseUp : undefined}
			>
				<div className={`handleBar ${color}`}>
					<div className="WindowName heading-500">{WindowName}</div>
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
