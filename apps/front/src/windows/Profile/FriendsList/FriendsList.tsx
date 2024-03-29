import "./FriendsList.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import List from "../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../shared/ui-components/Button/Button";
import { addWindow, delWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";
import { User } from "../../../shared/ui-components/User/User";
import store from "../../../store";
import { useState } from "react";
import { SearchBar } from "../../../shared/ui-components/SearchBar/SearchBar";

interface FriendsListProps {
	winId: number;
}

export function FriendsList({winId}: FriendsListProps) {
	const [searchBarValue, setSearchBarValue] = useState("");

	const {
		data: friendsList,
		isLoading: friendsListLoading,
	} = useQuery<
		{
			userid: number;
			username: string;
		}[]
	>({
		queryKey: ["friendsList"],
		queryFn: async () => {
			try {
				const response = await api.get(`/FriendsList/list`);
				return response.data;
			} catch (error) {
				store.dispatch(delWindow(winId))
			}
		},
	});

	const {
		data: pendingRequests,
		isLoading: pendingRequestsLoading,
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
				store.dispatch(delWindow(winId))
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
				<SearchBar
					action={setSearchBarValue}
					button={{ color: "purple", icon: "Lens" }}
				/>
			</div>
			<div className="Body">
				<List>
					{friendsList?.map((friend, index) => {
						if (
							searchBarValue.length > 0 &&
							!friend.username
								.toLowerCase()
								.includes(searchBarValue.toLowerCase())
						) {
							return null;
						}
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
