import "./FriendsList.css";
import { connect, ConnectedProps } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import Button from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";
import { User } from "../../../shared/ui-components/User/User";

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

	if (friendsListLoading || userIdLoading) {
		return (
			<div className="FriendsList">
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

	const handlePendingRequests = () => {
		const newWindow = {
			WindowName: "Pending Requests",
			id: 0,
			content: { type: "PENDINGREQUESTS" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
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
						console.log("ID :  ", friend.userid);
						return <User key={index} userId={friend.userid} />;
					})}
				</List>
			</div>
			<div className="Footer">
				<Button
					content="Pending Requests"
					color="purple"
					onClick={handlePendingRequests}
				/>
				<div className="Frame"></div>
				<Button content="Add Friends" color="purple" />
			</div>
		</div>
	);
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedFriendsList = connector(FriendsList);
export default ConnectedFriendsList;
