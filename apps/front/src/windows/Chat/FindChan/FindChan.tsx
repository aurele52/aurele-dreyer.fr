import "./FindChan.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../axios";
import List from "../../../shared/ui-components/List/List";
import Channel from "../../../shared/ui-components/Channel/Channel";
import { Button } from "../../../shared/ui-components/Button/Button";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow, delWindow } from "../../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { ModalType, addModal } from "../../../shared/utils/AddModal";
import { useState } from "react";
import { SearchBar } from "../../../shared/ui-components/SearchBar/SearchBar";
import store from "../../../store";

interface FindChanProps {
	winId: number
}

export default function FindChan({ winId }: FindChanProps) {
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
			try {return api.get("/channels").then((response) => response.data);}
			catch {
				store.dispatch(delWindow(winId))
			}
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

  const handleAddChannel = async (channelId: number, channelType: string) => {
    if (channelType === "PROTECTED") {
      addModal(ModalType.REQUESTED, undefined, undefined, undefined, channelId);
      return ;
    }
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
		store.dispatch(addWindow(newWindow));
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
											handleAddChannel(channel.id, channel.type);
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
