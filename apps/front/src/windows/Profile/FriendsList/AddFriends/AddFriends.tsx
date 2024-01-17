import "./AddFriends.css";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { HeartButton } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../../../../shared/ui-components/SearchBar/SearchBar";
import store from "../../../../store";
import { delWindow } from "../../../../reducers";

interface AddFriendsProps {
	winId: number;
}

export function AddFriends({winId}: AddFriendsProps) {
	const [placeholderValue, setPlaceholderValue] = useState<string>("");

	const { data: users } = useQuery<
		{
			id: number;
			username: string;
		}[]
	>({
		queryKey: ["addFriendsList"],
		queryFn: async () => {
			try {
				const response = await api.get("/friendslist/potentialFriends");
				return response.data;
			} catch (error) {
				store.dispatch(delWindow(winId))
			}
		},
	});

	return (
		<div className="AddFriendsModule">
			<div className="Header">
				<SearchBar
					action={setPlaceholderValue}
					button={{ color: "purple", icon: "Lens" }}
				/>
			</div>
			<div className="Body">
				<List dark={false}>
					{users?.map((user, key) => {
						if (
							placeholderValue.length > 0 &&
							!user.username
								.toLowerCase()
								.includes(placeholderValue.toLowerCase())
						) {
							return null;
						}
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
