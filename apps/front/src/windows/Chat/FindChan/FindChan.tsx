import "./FindChan.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../axios";
import List from "../../../shared/ui-components/List/List";
import Channel from "../../../shared/ui-components/Channel/Channel";
import { Button } from "../../../shared/ui-components/Button/Button";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow } from "../../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { useState } from "react";
import { SearchBar } from "../../../shared/ui-components/SearchBar/SearchBar";

interface FindChanProps extends ReduxProps {}

function FindChan({ dispatch }: FindChanProps) {
	const queryClient = useQueryClient();

	const [searchBarValue, setSearchBarValue] = useState("");

	const { data: channels } = useQuery<
		{
			id: number;
			name: string;
			type: string;
		}[]
	>({
		queryKey: ["channels"],
		queryFn: async () => {
			return api.get("/channels").then((response) => response.data);
		},
	});

	const { mutateAsync: createUserChannel } = useMutation({
		mutationFn: async (param: { channelId: number }) => {
			return api.post("/user-channel", param);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["channels"] });
			queryClient.invalidateQueries({ queryKey: ["chats"] });
		},
	});

	const handleAddChannel = async (channelId: number) => {
		await createUserChannel({ channelId });
	};

	const handleDetailsChan = (name: string, id: number) => {
		const newWindow = {
			WindowName: "About" + name,
			width: "453",
			height: "527",
			id: 0,
			content: { type: "ABOUTCHAN", id: id },
			toggle: false,
			handleBarButton:
				HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
			color: WinColor.PURPLE,
		};
		dispatch(addWindow(newWindow));
	};

	return (
		<div className="FindChan">
			<SearchBar
				action={setSearchBarValue}
				button={{ color: "purple", icon: "Lens" }}
			/>
			<List dark={false}>
				{channels?.map((channel) => {
					if (
						searchBarValue.length > 0 &&
						!channel.name
							.toLowerCase()
							.includes(searchBarValue.toLowerCase())
					) {
						return null;
					}
					return (
						<div key={channel.id} className="wrapChannelFindChan">
							<Channel
								name={channel.name}
								clickable={false}
								notif={0}
							>
								<div className="ButtonFindChan">
									<Button
										icon="TripleDot"
										color="pink"
										onClick={() =>
											handleDetailsChan(
												channel.name,
												channel.id
											)
										}
									/>
									<Button
										icon="Plus"
										color="pink"
										onClick={() => {
											handleAddChannel(channel.id);
										}}
									/>
								</div>
							</Channel>
						</div>
					);
				})}
			</List>
		</div>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedFindChat = connector(FindChan);
export default ConnectedFindChat;
