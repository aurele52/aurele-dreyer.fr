import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../../shared/ui-components/List/List";
import Channel from "../Channel/Channel";
import Button from "../../shared/ui-components/Button/Button";
import { addWindow } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";

interface ChatProps extends ReduxProps {}

type ChatType = {
	id: number;
	name: string;
	type: string;
	interlocutor: { avatar_url: string; username: string; id: number };
};

export function Chat({ dispatch }: ChatProps) {
	const apiUrl = "/api/chats";

	const { data: chats } = useQuery<ChatType[]>({
		queryKey: ["chats"],
		queryFn: async () => {
			return axios.get(apiUrl).then((response) => response.data);
		},
	});

	const handleFindChannel = () => {
		const newWindow = {
			WindowName: "Find Channel",
			width: "242",
			height: "390",
			id: 0,
			content: { type: "FINDCHAN" },
			toggle: false,
			modal: true,
			handleBarButton: HBButton.Close,
			color: WinColor.LILAC,
		};
		dispatch(addWindow(newWindow));
	};

	const handleCreateChannel = () => {
		const newWindow = {
			WindowName: "New Channel",
			width: "485",
			height: "362",
			id: 0,
			content: { type: "NEWCHAN" },
			toggle: false,
			modal: true,
			handleBarButton: HBButton.Close,
			color: WinColor.LILAC,
		};
		dispatch(addWindow(newWindow));
	};

	const detailsWindow = (isDm: boolean, id: number, name: string) => {
		let newWindow;
		if (!isDm) {
			newWindow = {
				WindowName: "About " + name,
				width: "453",
				height: "527",
				id: 0,
				content: { type: "ABOUTCHAN", id: id },
				toggle: false,
				modal: false,
				handleBarButton:
					HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
				color: WinColor.PURPLE,
			};
		} else {
			newWindow = {
				WindowName: name,
				width: "500",
				height: "500",
				id: 0,
				content: { type: "PROFILE", id: id },
				toggle: false,
				modal: false,
				handleBarButton:
					HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
				color: WinColor.PURPLE,
			};
		}
		dispatch(addWindow(newWindow));
	};

	const handleDetails = (chat: ChatType) => {
		if (chat.type === "DM") {
			detailsWindow(
				true,
				chat.interlocutor.id,
				chat.interlocutor.username
			);
		} else {
			detailsWindow(false, chat.id, chat.name);
		}
	};

	return (
		<div className="Chat">
			<List>
				{chats?.map((chat) => {
					return (
						<div className="chatRow" key={chat.id}>
							<Button
								icon="TripleDot"
								color="pink"
								title="About"
								onClick={() => handleDetails(chat)}
							/>
							<Channel
								name={
									chat.type === "DM"
										? chat.interlocutor.username
										: chat.name
								}
								className={
									chat.type === "DM"
										? chat.type.toLowerCase()
										: ""
								}
								image={
									chat.type === "DM"
										? chat.interlocutor.avatar_url
										: undefined
								}
								clickable={true}
							/>
						</div>
					);
				})}
			</List>
			<div className="ChatFooter">
				<Button
					content="find channel"
					color="purple"
					onClick={handleFindChannel}
				/>
				<Button
					content="create channel"
					color="purple"
					onClick={handleCreateChannel}
				/>
			</div>
		</div>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedChat = connector(Chat);
export default ConnectedChat;
