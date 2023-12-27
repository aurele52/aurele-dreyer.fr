import { Button } from "../../shared/ui-components/Button/Button";
import "./Profile.css";
import { connect, ConnectedProps } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import api from "../../axios";
import List from "../../shared/ui-components/List/List";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { addWindow } from "../../reducers";
import { FaSpinner } from "react-icons/fa";
import store from "../../store";

interface ProfileProps {
	targetId?: number;
}

export function Profile({ targetId }: ProfileProps) {
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
			handleBarButton: HBButton.Close,
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
			handleBarButton: HBButton.Close,
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

	const handleFriendRequest = async (receiverId: number | undefined) => {
		if (!receiverId) return;
		try {
			const response = await api.post("/friendslist/add", {
				receiverId: receiverId,
			});
			return response.data;
		} catch (error) {
			console.error("Error sending friend request", error);
		}
	};

	const handleBlockUser = async (id: number) => {
		console.error("No function to block user : ", id);
	};

	const buttons = (
		<div className="Buttons">
			<Button
				content={selfProfile ? "friends list" : "add friend"}
				color="purple"
				style={{ display: "flex" }}
				onClick={
					selfProfile
						? handleOpenFriendsList
						: () => handleFriendRequest(targetId)
				}
			/>
			<Button
				content={selfProfile ? "blocked list" : "block"}
				color="purple"
				style={{ display: "flex" }}
				onClick={
					selfProfile
						? handleOpenBlockedList
						: () => handleBlockUser(targetId ?? 0)
				}
			/>
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
									icon="Plus"
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
							icon="Plus"
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
