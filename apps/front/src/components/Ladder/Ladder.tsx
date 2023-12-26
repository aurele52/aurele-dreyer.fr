import "./Ladder.css";
import { connect, ConnectedProps } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../List/List";
import { FaSpinner } from "react-icons/fa";
import { addWindow } from "../../reducers";
import { WinColor } from "../../utils/WindowTypes";

interface LadderProps extends ReduxProps {
	targetId?: number;
}

export function Ladder({ dispatch, targetId }: LadderProps) {
	const {
		data: userId,
		isLoading: userIdLoading,
		error: userIdError,
	} = useQuery<number>({
		queryKey: ["userId"],
		queryFn: async () => {
			if (targetId !== undefined) {
				return targetId;
			}

			try {
				const response = await axios.get("/api/id");
				return response.data;
			} catch (error) {
				console.error("Error fetching userId:", error);
				throw error;
			}
		},
	});

	const {
		data: users,
		isLoading: usersLoading,
		error: usersError,
	} = useQuery<
		{
			id: number;
			username: string;
			avatar_url: string;
			win_count: number;
			rank: number;
		}[]
	>({
		queryKey: ["users"],
		queryFn: async () => {
			return axios
				.get("/api/ladder/list")
				.then((response) => response.data);
		},
	});

	const {
		data: userRank,
		isLoading: userRankLoading,
		error: userRankError,
	} = useQuery<number>({
		queryKey: ["userRank", userId],
		queryFn: async () => {
			try {
				const response = await axios.get(`/api/ladder/rank/${userId}`);
				return response.data;
			} catch (error) {
				console.error("Error fetching userRank:", error);
				throw error;
			}
		},
		enabled: !!userId,
	});

	const { data: user } = useQuery<{
		id: number;
		username: string;
		avatar_url: string;
		win_count: number;
	}>({
		queryKey: ["user"],
		queryFn: async () => {
			return axios
				.get(`/api/profile/user/${userId}`)
				.then((response) => response.data);
		},
		enabled: !!userId,
	});

	if (usersLoading || userRankLoading || userIdLoading) {
		return (
			<div className="Ladder">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (usersError) {
		return <div>Error loading users: {usersError.message}</div>;
	}

	if (userRankError) {
		return <div>Error fetching userRank: {userRankError.message}</div>;
	}

	if (userIdError) {
		return <div>Error loading user: {userIdError.message}</div>;
	}

	const handleOpenProfile = (id: number, username: string) => {
		console.log("User ID : ", id);
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
		dispatch(addWindow(newWindow));
	};

	return (
		<div className="Ladder">
			<List>
				{users?.map((user) => {
					const isSelfUser = user.id === userId;
					const divClass = isSelfUser ? "SelfUser" : "OtherUser";
					return (
						<div
							className={`User ${divClass}`}
							key={user.id}
							onClick={() =>
								handleOpenProfile(user.id, user.username)
							}
						>
							<div className="Rank">
								<div>#{user?.rank ?? 0}</div>
							</div>
							<div className="Avatar">
								<img
									src={user?.avatar_url}
									className="Frame"
									alt={user?.username.toLowerCase()}
								/>
							</div>
							<div className="PlayerName">
								<div>{user.username}</div>
							</div>
							<div className="Stat">
								<div>{user?.win_count ?? 0} win</div>
							</div>
						</div>
					);
				})}
			</List>
			{userRank && userRank > 30 && (
				<div className="Footer">
					<div className="User SelfUser" key={31}>
						<div className="Rank">
							<div>#{userRank ?? 0}</div>
						</div>
						<div className="Avatar">
							<img
								src={user?.avatar_url}
								className="Frame"
								alt={user?.username.toLowerCase()}
							/>
						</div>
						<div className="PlayerName">
							<div>{user?.username}</div>
						</div>
						<div className="Stat">
							<div>{user?.win_count ?? 0} win</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedLadder = connector(Ladder);
export default ConnectedLadder;
