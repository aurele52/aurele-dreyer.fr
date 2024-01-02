import "./FriendsList.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import List from "../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";
import { User } from "../../../shared/ui-components/User/User";
import store from "../../../store";

export function FriendsList() {
	const {
		data: friendsList,
		isLoading: friendsListLoading,
		error: friendsListError,
	} = useQuery<
		{
			userid: number;
		}[]
	>({
		queryKey: ["friendsList"],
		queryFn: async () => {
			try {
				const response = await api.get(`/FriendsList/list`);
				return response.data;
			} catch (error) {
				console.error("Error fetching FriendsList:", error);
				throw error;
			}
		},
	});

	const {
		data: pendingRequests,
		isLoading: pendingRequestsLoading,
		error: pendingRequestsError,
	} = useQuery<number>({
		queryKey: ["pendingRequests", "Profile"],
		queryFn: async () => {
			try {
				const response = await api.get(`/friendships/pendingList`);
				return response.data?.filter(
					(content: { type: "sent" | "received" }) =>
						content.type === "received"
				).length;
			} catch {
				console.error(
					"Error pending invitations user:",
					pendingRequestsError
				);
				throw pendingRequestsError;
			}
		},
	});

	if (friendsListLoading || pendingRequestsLoading) {
		return (
			<div className="FriendsList">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (friendsListError) {
		return <div>Error loading users: {friendsListError.message}</div>;
	}

	const handlePendingRequests = () => {
		const newWindow = {
			WindowName: "Pending Requests",
			id: 0,
			content: { type: "PENDINGREQUESTS" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleOpenAddFriends = () => {
		const newWindow = {
			WindowName: "Add Friends",
			id: 0,
			content: { type: "ADDFRIENDS" },
			toggle: false,
			handleBarButton: 7,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
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
						return <User key={index} userId={friend.userid} />;
					})}
				</List>
			</div>
			<div className="Footer">
				<Button
					content="Pending Requests"
					color="purple"
					onClick={handlePendingRequests}
					notif={pendingRequests ? pendingRequests : 0}
				/>
				<div className="Frame"></div>
				<Button
					content="Add Friends"
					color="purple"
					onClick={handleOpenAddFriends}
				/>
			</div>
		</div>
	);
}

export default FriendsList;
