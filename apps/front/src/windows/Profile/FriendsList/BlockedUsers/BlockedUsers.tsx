import "./BlockedUsers.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import { HeartButton } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import store from "../../../../store";
import { delWindow } from "../../../../reducers";

interface BlockedUsersProps {
	winId: number;
}

export function BlockedUsers({winId}: BlockedUsersProps) {
	const {
		data: blockedUsers,
		isLoading: blockedUsersLoading,
	} = useQuery<
		{
			id: number;
			username: string;
		}[]
	>({
		queryKey: ["blockedUsers"],
		queryFn: async () => {
			try {
				const response = await api.get(`/friendships/blockedList`);
				return response.data;
			} catch (error) {
				store.dispatch(delWindow(winId))
			}
		},
	});

	if (blockedUsersLoading) {
		return <FaSpinner className="loadingSpinner" />;
	}

	if (!Array.isArray(blockedUsers)) {
		return (
			<div className="BlockedUsersComponent">
				<div className="Body">
					<List>
						<div></div>
					</List>
				</div>
			</div>
		);
	}

	return (
		<div className="BlockedUsersComponent">
			<div className="Body">
				<List>
					{blockedUsers?.map((user, key) => (
						<ReducedUser key={key} userId={user.id}>
							<HeartButton
								userId={user.id}
								username={user.username}
							/>
						</ReducedUser>
					))}
				</List>
			</div>
		</div>
	);
}
