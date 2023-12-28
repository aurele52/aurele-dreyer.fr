import { Button } from "../../shared/ui-components/Button/Button";
import "./Profile.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../axios";
import List from "../../shared/ui-components/List/List";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { addWindow } from "../../reducers";
import { FaSpinner } from "react-icons/fa";
import store from "../../store";
import { addModal, ModalType } from "../../shared/utils/AddModal";

interface ProfileProps {
	targetId?: number;
}

export function Profile({ targetId }: ProfileProps) {
	const queryClient = useQueryClient();

	const {
		data: profile,
		isLoading: profileLoading,
		error: profileError,
	} = useQuery<{
		id: number;
		username: string;
		avatar_url: string;
		win_count: number;
		loose_count: number;
		achievement_lvl: number;
		rank: number;
		friendship?: {
			status: "FRIENDS" | "PENDING" | "BLOCKED";
			user1_id: number;
			user2_id: number;
		};
	}>({
		queryKey: ["user", targetId],
		queryFn: async () => {
			try {
				const response = targetId
					? await api.get(`/profile/user/${targetId}`)
					: await api.get(`/profile/user`);
				return response.data;
			} catch (error) {
				console.error("Error fetching user:", error);
				throw error;
			}
		},
	});

	const {
		data: historic,
		isLoading: historicLoading,
		error: historicError,
	} = useQuery<
		{
			id: number;
			player1: string;
			player2: string;
			player1_id: number;
			player2_id: number;
			player1_avatar: string;
			player2_avatar: string;
			score1: number;
			score2: number;
		}[]
	>({
		queryKey: ["historic", targetId],
		queryFn: async () => {
			try {
				const response = targetId
					? await api.get(`/profile/historic/${targetId}`)
					: await api.get(`/profile/historic`);
				return response.data;
			} catch (error) {
				console.error("Error fetching historic:", error);
				throw error;
			}
		},
	});

	const { mutateAsync: createFriendship } = useMutation({
		mutationFn: async (user2_id: number) => {
			return api.post("/friendship", { user2_id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user", targetId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pendingRequests"],
			});
		},
	});

	const { mutateAsync: acceptFriendship } = useMutation({
		mutationFn: async (userId: number) => {
			return api.patch("/friendship/accept/" + userId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user", targetId],
			});
			queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friendsList"] });
		},
	});

	const selfProfile = targetId ? false : true;

	if (historicLoading || profileLoading) {
		return (
			<div className="Ladder">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (profileError) {
		return <div>Error loading users: {profileError.message}</div>;
	}

	if (historicError) {
		return <div>Error loading users: {historicError.message}</div>;
	}

	const handleOpenLadder = () => {
		const newWindow = {
			WindowName: "Ladder",
			width: "400",
			height: "600",
			id: 0,
			content: { type: "LADDER" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.LILAC,
			targetId: targetId,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleOpenAchievements = () => {
		const newWindow = {
			WindowName: "Achievements",
			id: 0,
			content: { type: "ACHIEVEMENTS" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.LILAC,
			targetId: targetId,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleOpenFriendsList = () => {
		const newWindow = {
			WindowName: "Friends List",
			id: 0,
			content: { type: "FRIENDSLIST" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
			targetId: targetId,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleOpenBlockedList = () => {
		const newWindow = {
			WindowName: "Blocked Users",
			id: 0,
			content: { type: "BLOCKEDUSERS" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleOpenProfile = (id: number, username: string) => {
		const newWindow = {
			WindowName: username,
			width: "400",
			height: "600",
			id: 0,
			content: { type: "PROFILE", id: id },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
			targetId: id,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleFriendRequest = async () => {
		if (!targetId) return;
		createFriendship(targetId);
	};

	const handleAcceptRequest = async () => {
		if (!targetId) return;
		acceptFriendship(targetId);
	};

	const handleBlockUser = async () => {
		if (!targetId) return;
		addModal(
			ModalType.WARNING,
			`Are you sure you want to block ${profile?.username}?`,
			"addBlockedFriendship",
			targetId
		);
	};

	const handleRemovePending = async () => {
		if (!targetId) return;
		addModal(
			ModalType.WARNING,
			`Are you sure you want to remove your pending request?`,
			"deleteFriendship",
			targetId
		);
	};

	const handleUnblock = async () => {
		if (!targetId) return;
		addModal(
			ModalType.WARNING,
			`Are you sure you want to unblock ${profile?.username}?`,
			"deleteBlockedFriendship",
			targetId
		);
	};

	const handleRemoveFriend = async () => {
		if (!targetId) return;
		addModal(
			ModalType.WARNING,
			`Are you sure you want to remove ${profile?.username} from your friendlist?`,
			"deleteFriendship",
			targetId
		);
	};

	const addFriendButton = () => {
		if (!profile?.friendship) {
			return (
				<Button
					content="add friend"
					color="purple"
					style={{ display: "flex" }}
					onClick={() => handleFriendRequest()}
				/>
			);
		} else {
			if (profile?.friendship?.status === "PENDING") {
				if (profile.friendship.user1_id === targetId)
					return (
						<Button
							content="accept"
							color="purple"
							style={{ display: "flex" }}
							onClick={() => handleAcceptRequest()}
						/>
					);
				else
					return (
						<Button
							content="remove pending"
							color="purple"
							style={{ display: "flex" }}
							onClick={() => handleRemovePending()}
						/>
					);
			} else if (profile.friendship.status === "FRIENDS") {
				return (
					<Button
						content="remove friend"
						color="purple"
						style={{ display: "flex" }}
						onClick={() => handleRemoveFriend()}
					/>
				);
			} else {
				return <div></div>;
			}
		}
	};

	const addBlockButton = () => {
		if (profile?.friendship && profile.friendship.status == "BLOCKED") {
			if (profile.friendship.user2_id == targetId)
				return (
					<Button
						content="unblock"
						color="purple"
						style={{ display: "flex" }}
						onClick={handleUnblock}
					/>
				);
			else return <div></div>;
		} else
			return (
				<Button
					content="block"
					color="purple"
					style={{ display: "flex" }}
					onClick={() => handleBlockUser()}
				/>
			);
	};

	const buttons = selfProfile ? (
		//SELF USER BUTTON
		<div className="Buttons">
			<Button
				content="friends list"
				color="purple"
				style={{ display: "flex" }}
				onClick={handleOpenFriendsList}
			/>
			<Button
				content="blocked list"
				color="purple"
				style={{ display: "flex" }}
				onClick={handleOpenBlockedList}
			/>
		</div>
	) : (
		//OTHER USER BUTTON
		<div className="Buttons">
			{addFriendButton()}
			{addBlockButton()}
		</div>
	);

	const footer = selfProfile ?? (
		<div className="Footer">
			<Button
				content="delete account"
				color="red"
				style={{ display: "flex" }}
			/>
		</div>
	);

	return (
		<div className="Profile">
			<div className="Header">
				<div className="Avatar">
					<img
						src={profile?.avatar_url}
						className="Frame"
						alt={profile?.username.toLowerCase()}
					/>
				</div>

				<div className="Text">
					<div className="Name">{profile?.username ?? "No name"}</div>
					<div className="Stats">
						<div>
							<div className="Rank">
								<div className="Position">
									<div>Rank #{profile?.rank ?? 0}</div>
								</div>
								<div
									style={{ paddingRight: "4px" }}
									className="Ratio"
								>
									<div>
										W {profile?.win_count ?? 0} / L{" "}
										{profile?.loose_count ?? 0}
									</div>
								</div>
								<Button
									icon="Arrow"
									color="pink"
									style={{ display: "flex" }}
									onClick={handleOpenLadder}
								/>
							</div>
						</div>
					</div>
					<div className="ProfileAchievements">
						<div style={{ paddingRight: "4px" }}>
							Achievements lvl. {profile?.achievement_lvl}
						</div>
						<Button
							icon="Arrow"
							color="pink"
							style={{ display: "flex" }}
							onClick={() => handleOpenAchievements()}
						/>
					</div>
					{buttons}
				</div>
			</div>
			<div className="Body">
				<div className="Historic">
					<List>
						{historic?.map((match) => {
							return (
								<div className="Match" key={match.id}>
									<div
										className={`Player ${
											match.score1 > match.score2
												? "WinPlayer"
												: "LoosePlayer"
										}`}
									>
										<div>
											<div className="Outline">
												<div className="Avatar">
													<img
														src={
															match?.player1_avatar
														}
														className="Picture"
														alt={match?.player1.toLowerCase()}
													/>
												</div>
											</div>
											<div className="Username">
												{match?.player1}
											</div>
										</div>
									</div>
									<div className="Score">
										<div>
											{match?.score1 +
												" - " +
												match?.score2}
										</div>
									</div>
									<div
										className={`Player ${
											match.score1 < match.score2
												? "WinPlayer"
												: "LoosePlayer"
										}`}
										onClick={() =>
											handleOpenProfile(
												match.player2_id,
												match.player2
											)
										}
										style={{ cursor: "pointer" }}
									>
										<div>
											<div className="Outline">
												<div className="Avatar">
													<img
														src={
															match?.player2_avatar
														}
														className="Picture"
														alt={match?.player2.toLowerCase()}
													/>
												</div>
												<div className="Crown">
													<div></div>
												</div>
											</div>
											<div className="Username">
												{match?.player2}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</List>
				</div>
			</div>
			{footer}
		</div>
	);
}

export default Profile;
