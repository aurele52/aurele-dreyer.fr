import "./Background.css";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ConnectedProps } from "react-redux";
import Window from "../Window/Window";
import Play from "../Play/Play";
import Chat from "../Chat/Chat";
import Ladder from "../Ladder/Ladder";
import Profile from "../Profile/Profile";
import FindChan from "../FindChan/FindChan";
import NewChan from "../NewChan/NewChan";
import AboutChan from "../AboutChan/AboutChan";
import Achievements from "../Achievements/Achievements";
import FriendsList from "../FriendsList/FriendsList";
import Modal from "../Modal/Modal";

interface BackgroundProps extends ReduxProps {}

export function Background({ windows }: BackgroundProps) {
	interface WindowDimensions {
		width: string;
		height: string;
	}

	const windowDimensions: Record<string, WindowDimensions> = {
		PLAY: { width: "300px", height: "600px" },
		LADDER: { width: "450px", height: "600px" },
		CHAT: { width: "400px", height: "400px" },
		PROFILE: { width: "500px", height: "500px" },
		FINDCHAN: { width: "400px", height: "400px" },
		NEWCHAN: { width: "400px", height: "400px" },
		ABOUTCHAN: { width: "500px", height: "500px" },
		ACHIEVEMENTS: { width: "300px", height: "300px" },
		FRIENDSLIST: { width: "450px", height: "600px" },
		MODAL: { width: "390px", height: "200px" },
	};

	return (
		<div id="Background">
			{Array.isArray(windows) &&
				windows.map((window) => {
					const dimensions = windowDimensions[
						window.content.type
					] || {
						width: "500px",
						height: "600px",
					};
					const { width, height } = dimensions;
					console.log(
						"Dim : ",
						dimensions,
						"  Window type : ",
						window.content.type
					);
					return (
						<Window
							key={window.id}
							WindowName={window.WindowName}
							width={width}
							height={height}
							id={window.id}
							handleBarButton={window.handleBarButton}
							color={window.color}
						>
							{window.content.type === "PLAY" && <Play />}
							{window.content.type === "LADDER" && <Ladder />}
							{window.content.type === "CHAT" && <Chat />}
							{window.content.type === "PROFILE" && (
								<Profile
									winId={window.id}
									targetId={window.content.id || undefined}
								/>
							)}
							{window.content.type === "FINDCHAN" && <FindChan />}
							{window.content.type === "NEWCHAN" && <NewChan />}
							{window.content.type === "ABOUTCHAN" && (
								<AboutChan
									chanId={window.content.id || undefined}
								/>
							)}
							{window.content.type === "ACHIEVEMENTS" && (
								<Achievements />
							)}
							{window.content.type === "FRIENDSLIST" && (
								<FriendsList />
							)}
							{window.content.type === "MODAL" && <Modal text={window.modal?.text} action={window.modal?.action || undefined} />}
						</Window>
					);
				})}
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	windows: state.windows,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedBackground = connector(Background);
export default ConnectedBackground;
