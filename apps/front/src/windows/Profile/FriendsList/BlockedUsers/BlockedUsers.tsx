import "./BlockedUsers.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";

interface BlockedUsersProps {}

export function BlockedUsers({}: BlockedUsersProps) {
	const {
		data: userId,
		isLoading: userIdLoading,
		error: userIdError,
	} = useQuery<number>({
		queryKey: ["userId"],
		queryFn: async () => {
			try {
				const response = await api.get("/id");
				return response.data;
			} catch (error) {
				console.error("Error fetching userId:", error);
				throw error;
			}
		},
	});

	const {
		data: blockedUsers,
		isLoading: blockedUsersLoading,
		error: blockedUsersError,
	} = useQuery<
		{
			id: number;
		}[]
	>({
		queryKey: ["blockedUsers", userId],
		queryFn: async () => {
			try {
				const response = await api.get(`/friendships/blockedList`);
				return response.data;
			} catch (error) {
				console.error("Error fetching BlockedUsers:", error);
				throw error;
			}
		},
		enabled: !!userId,
	});

	if (blockedUsersLoading || userIdLoading) {
		return <FaSpinner className="loadingSpinner" />;
	}

	if (blockedUsersError) {
		return <div>Error loading users: {blockedUsersError.message}</div>;
	}

	if (userIdError) {
		return <div>Error loading user: {userIdError.message}</div>;
	}

	return (
		<div className="BlockedUsersComponent">
			<div className="Body">
				<List>
					{blockedUsers?.map((user, key) => (
						<ReducedUser key={key} userId={user.id}>
							<Button icon="Unblock" color="pink" />
						</ReducedUser>
					))}
				</List>
			</div>
		</div>
	);
}
