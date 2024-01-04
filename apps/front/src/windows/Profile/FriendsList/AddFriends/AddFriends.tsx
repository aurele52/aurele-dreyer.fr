import "./AddFriends.css";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import {
	HeartButton,
} from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../../../../shared/ui-components/SearchBar/SearchBar";

export function AddFriends() {
	const [placeholderValue, setPlaceholderValue] = useState<string>("");

	const {
		data: users,
		error: addFriendsListError,
		refetch: refetchaddFriendsList,
	} = useQuery<
		{
			id: number;
			username: string;
		}[]
	>({
		queryKey: ["addFriendsList"],
		queryFn: async () => {
			try {
				console.log("Update users");
				const response = await api.get(
					"/friendslist/potentialFriends",
					{
						params: {
							placeholderValue: placeholderValue,
						},
					}
				);
				return response.data;
			} catch (error) {
				console.error("Error fetching Users list:", error);
				throw error;
			}
		},
	});

	if (addFriendsListError) {
		return <div>Error loading users: {addFriendsListError.message}</div>;
	}

	useEffect(() => {
		const storedPlaceholderValue = localStorage.getItem("placeholderValue");

		if (storedPlaceholderValue) {
			setPlaceholderValue(storedPlaceholderValue);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("placeholderValue", placeholderValue);
		localStorage.setItem("users", JSON.stringify(users));
	}, [placeholderValue, users]);

	useEffect(() => {
		refetchaddFriendsList();
	}, [placeholderValue]);

	const handleButtonClick = async (value: string) => {
		setPlaceholderValue(value);
	};

	return (
		<div className="AddFriendsModule">
			<div className="Header">
				<SearchBar
					action={handleButtonClick}
					button={{ color: "purple", icon: "Lens" }}
				/>
			</div>
			<div className="Body">
				<List dark={false}>
					{users?.map((user, key) => {
						return (
							<ReducedUser userId={user.id} key={key}>
								<HeartButton
									userId={user.id}
									username={user.username}
								/>
							</ReducedUser>
						);
					})}
				</List>
			</div>
		</div>
	);
}
