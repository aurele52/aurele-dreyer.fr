import api from "../../../axios";
import "./AboutChan.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../../../shared/utils/StringUtils";
import List from "../../../shared/ui-components/List/List";
import { Button } from "../../../shared/ui-components/Button/Button";
import { User } from "../../../shared/ui-components/User/User";
import { UserRole, userLvl } from "../../../shared/utils/User";
import store from "../../../store";
import { addWindow } from "../../../reducers";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { ModalType, addModal } from "../../../shared/utils/AddModal";

interface AboutChanProps {
	chanId: number | undefined;
}

export type ChannelData = {
	id: number;
	name: string;
	type: string;
	topic: string;
	userChannels: {
		id: number;
		role: UserRole;
		user_id: number;
		User: {
			id: number;
			username: string;
			avatar_url: string;
		};
	}[];
};

function AboutChan({ chanId }: AboutChanProps) {
	const queryClient = useQueryClient();

	const chanApiUrl = "/channel/" + chanId;

	const { data: channel } = useQuery<ChannelData>({
		queryKey: ["chanAbout", chanId],
		queryFn: async () => {
			const data = api.get(chanApiUrl).then((response) => response.data);
			return data;
		},
	});

	const { data: self } = useQuery<{ id: number; role: UserRole }>({
		queryKey: ["self", chanId],
		queryFn: async () => {
			try {
				const response = await api.get(
					"/user-channel/" + chanId + "/current-user"
				);
				return response.data;
			} catch (error) {
				console.error("Error fetching self:", error);
				throw error;
			}
		},
	});

	const { data: isMember } = useQuery<boolean>({
		queryKey: ["isMember", chanId],
		queryFn: async () => {
			return api
				.get(chanApiUrl + "/me")
				.then((response) => response.data);
		},
	});

	const { mutateAsync: createUserChannel } = useMutation({
		mutationFn: async (param: { channelId: number }) => {
			return api.post("/user-channel", param);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["channels"] });
			queryClient.invalidateQueries({ queryKey: ["chats"] });
			queryClient.invalidateQueries({ queryKey: ["isMember", chanId] });
			queryClient.invalidateQueries({ queryKey: ["chanAbout", chanId] });
		},
	});

	const { mutateAsync: deleteUserChannel } = useMutation({
		mutationFn: async (userChannelId: number) => {
			return api.delete("/user-channel/" + userChannelId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["channels"] });
			queryClient.invalidateQueries({ queryKey: ["chats"] });
			queryClient.invalidateQueries({ queryKey: ["isMember", chanId] });
			queryClient.invalidateQueries({ queryKey: ["chanAbout", chanId] });
		},
	});
	const handleJoin = async (channelId: number | undefined) => {
		if (channelId) await createUserChannel({ channelId });
	};

	const handleLeave = async (channel: ChannelData | undefined) => {
		if (channel) {
			if (self?.role === UserRole.OWNER) {
				addModal(
					ModalType.ERROR,
					"You must transfer your ownership rights before you can leave the channel"
				);
				return;
			}
			const userChannel = channel.userChannels.find(
				(uc) => uc.user_id === self?.id
			);
			if (userChannel) {
				deleteUserChannel(userChannel?.id);
			}
		}
	};

	const handleAddMembers = () => {
		const newWindow = {
			WindowName: "Add To " + channel?.name,
			id: 0,
			content: { type: "ADDMEMBERS", id: channel?.id },
			toggle: false,
			handleBarButton: HBButton.Close,
			color: WinColor.LILAC,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleChanSettings = () => {
		const newWindow = {
			WindowName: channel?.name + "'s Settings",
			id: 0,
			content: { type: "CHANSETTINGS", id: channel?.id },
			toggle: false,
			handleBarButton: HBButton.Close,
			color: WinColor.LILAC,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleBanList = () => {
		const newWindow = {
			WindowName: channel?.name + "'s Ban List",
			id: 0,
			content: { type: "BANLIST" },
			toggle: false,
			handleBarButton: HBButton.Close,
			color: WinColor.LILAC,
			channelId: channel?.id,
		};
		store.dispatch(addWindow(newWindow));
	};

	return (
		<div className="AboutChan custom-scrollbar">
			<div className="headerAboutChan">
				<div className="chanDescription">
					<div className="heading-600">
						{capitalize(channel?.name || "channel name")}
					</div>
					<div className="heading-500">{channel?.topic}</div>
					<div className="text-400">
						{capitalize(channel?.type || "PUBLIC")} Channel
					</div>
					<div className="text-400">
						{channel?.userChannels.length} members
					</div>
				</div>

				{!isMember ? (
					<div className="headerButtonsAboutChan">
						<Button
							color="purple"
							content="join"
							onClick={() => handleJoin(channel?.id)}
						/>
					</div>
				) : (
					""
				)}
				{isMember && userLvl[self?.role || UserRole.MEMBER] > 0 ? (
					<div className="headerButtonsAboutChan">
						<Button
							color="purple"
							content="add members"
							onClick={handleAddMembers}
						/>
						<Button
							color="purple"
							content="ban list"
							onClick={handleBanList}
						/>
					</div>
				) : (
					""
				)}
			</div>
			<List>
				{channel?.userChannels.map((uc, index) => {
					const user = uc.User;
					return (
						<User
							key={index}
							userId={user.id}
							channel={{
								channelId: channel?.id,
								userRole: uc.role,
							}}
						/>
					);
				})}
			</List>
			<div className="footerAboutChanBtn">
				{isMember ? (
					<>
						<Button
							color="red"
							content="leave channel"
							onClick={() => handleLeave(channel)}
						/>
						{userLvl[self?.role || UserRole.MEMBER] >=
							userLvl[UserRole.ADMIN] && (
							<Button
								icon="Wrench"
								color="lightYellow"
								onClick={handleChanSettings}
							/>
						)}
					</>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default AboutChan;
