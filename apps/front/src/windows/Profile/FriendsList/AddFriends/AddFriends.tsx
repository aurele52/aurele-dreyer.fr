import "./AddFriends.css";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import {
	Button,
	HeartButton,
} from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

	const handleButtonClick = async () => {
		refetchaddFriendsList();
	};

	return (
		<div className="AddFriendsModule">
			<div className="Header">
				<div className="SearchBar">
					<div className="TypeBar">
						<input
							className="Placeholder"
							value={placeholderValue}
							onChange={(e) =>
								setPlaceholderValue(e.target.value)
							}
						/>
						<Button
							icon="Lens"
							color="purple"
							onClick={handleButtonClick}
						/>
					</div>
				</div>
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
