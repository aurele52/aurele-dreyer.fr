import "./FriendsList.css";
import { connect, ConnectedProps } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import Button from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";

interface FriendsListProps extends ReduxProps {}

export function FriendsList({ dispatch }: FriendsListProps) {
	const {
		data: userId,
		isLoading: userIdLoading,
		error: userIdError,
	} = useQuery<number>({
		queryKey: ["userId"],
		queryFn: async () => {
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
		data: friendsList,
		isLoading: friendsListLoading,
		error: friendsListError,
	} = useQuery<
		{
			userid: number;
			username: string;
			avatar_url: string;
			online: boolean;
		}[]
	>({
		queryKey: ["friendsList", userId],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`/api/FriendsList/list/${userId}`
				);
				return response.data;
			} catch (error) {
				console.error("Error fetching FriendsList:", error);
				throw error;
			}
		},
		enabled: !!userId,
	});

	console.log(friendsList);

	if (friendsListLoading || userIdLoading) {
		return (
			<div className="Ladder">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (friendsListError) {
		return <div>Error loading users: {friendsListError.message}</div>;
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
			modal: true,
			handleBarButton: 7,
			color: WinColor.PURPLE,
			targetId: id,
		};
		dispatch(addWindow(newWindow));
	};

	return (
		<div className="FriendsList">
			<div className="Header">
				<div className="SearchBar">
					<input type="text" className="TypeBar" />
					<Button icon="Lens" color="purple" />
				</div>
			</div>
			<div className="Body">
				<List>
					{friendsList?.map((friend, index) => {
						return (
							<div className="FriendsListUser" key={index}>
								<Button
									icon="TripleDot"
									color="pink"
									onClick={() =>
										handleOpenProfile(
											friend.userid,
											friend.username
										)
									}
								/>
								<div className="Avatar">
									<img
										className="Frame"
										src={friend?.avatar_url}
									></img>
								</div>
								<div className="User">
									<div className="Frame">
										<div className="Player">
											<div className="Name">
												<div>{friend?.username}</div>
											</div>
											<div className="Status">
												<div className="Icon"></div>
												<div className="Text"></div>
											</div>
										</div>
										<div className="Buttons">
											<Button
												content="Match"
												color="blue"
											/>
											<div className="Other">
												<Button
													icon="Chat"
													color="pink"
												/>
												<Button
													icon="Heart"
													color="pink"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</List>
			</div>
		</div>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedFriendsList = connector(FriendsList);
export default ConnectedFriendsList;
