import "./PendingRequests.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import Button from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";

interface PendingRequestsProps {}

export function PendingRequests({}: PendingRequestsProps) {
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
		data: pendingRequests,
		isLoading: pendingRequestsLoading,
		error: pendingRequestsError,
	} = useQuery<
		{
			id: number;
			senderId: number;
			type: "received" | "sent";
		}[]
	>({
		queryKey: ["pendingRequests", userId],
		queryFn: async () => {
			try {
				const response = await api.get(
					`/friendships/pendinglistList`
				);
				return response.data.map(
					(request: { id: number; senderId: number }) => ({
						...request,
						type: request.senderId === userId ? "sent" : "received",
					})
				);
			} catch (error) {
				console.error("Error fetching PendingRequests:", error);
				throw error;
			}
		},
		enabled: !!userId,
	});

	if (pendingRequestsLoading || userIdLoading) {
		return (
			<div className="PendingRequests">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (pendingRequestsError) {
		return <div>Error loading users: {pendingRequestsError.message}</div>;
	}

	if (userIdError) {
		return <div>Error loading user: {userIdError.message}</div>;
	}

	return (
		<div className="PendingRequestsComponent">
			<div className="Body">
				<List dark={false}>
					<div className="SectionName">Received</div>
					{pendingRequests
						?.filter((request) => request.type === "received")
						.map((user, key) => (
							<ReducedUser key={key} userId={user.id}>
								<Button icon="Heart" color="pink" />
							</ReducedUser>
						))}
					<div className="SectionName">Sent</div>
					{pendingRequests
						?.filter((request) => request.type === "sent")
						.map((user, key) => (
							<ReducedUser key={key} userId={user.id}>
								<Button icon="Heart" color="pink" />
							</ReducedUser>
						))}
				</List>
			</div>
		</div>
	);
}
