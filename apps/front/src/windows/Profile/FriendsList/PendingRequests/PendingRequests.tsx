import "./PendingRequests.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { PendingButton } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";

export function PendingRequests() {
	const { data: pendingRequests, error: pendingRequestsError } = useQuery<
		| {
				id: number;
				username: string;
				type: "received" | "sent";
		  }[]
		| null
	>({
		queryKey: ["pendingRequests"],
		queryFn: async (): Promise<
			| {
					id: number;
					username: string;
					type: "received" | "sent";
			  }[]
			| null
		> => {
			try {
				const response = await api.get(`/friendships/pendingList`);
				console.log("Response : ", response.data);
				if (response.status === 404 || response.data === undefined)
					return [];
				if (!Array.isArray(response.data)) return null;
				return response.data;
			} catch (error) {
				console.error("Error fetching PendingRequests:", error);
				throw error;
			}
		},
	});

	if (pendingRequestsError) {
		return (
			<div>Error loading Requests: {pendingRequestsError.message}</div> //How to handle this
		);
	}

	if (!Array.isArray(pendingRequests)) {
		return (
			<div className="PendingRequestsComponent">
				<div className="Body">
					<List dark={false}>
						<div></div>
					</List>
				</div>
			</div>
		);
	}

	return (
		<div className="PendingRequestsComponent">
			<div className="Body">
				<List dark={false}>
					{pendingRequests?.filter(
						(request) => request.type === "received"
					).length ? (
						<div className="SectionName">Received</div>
					) : (
						""
					)}

					{pendingRequests
						?.filter((request) => request.type === "received")
						?.map((user, key) => (
							<ReducedUser key={key} userId={user.id}>
								<PendingButton userId={user.id} />
							</ReducedUser>
						))}
					{pendingRequests?.filter(
						(request) => request.type === "sent"
					).length ? (
						<div className="SectionName">Sent</div>
					) : (
						""
					)}
					{pendingRequests
						?.filter((request) => request.type === "sent")
						?.map((user, key) => (
							<ReducedUser key={key} userId={user.id}>
								<PendingButton userId={user.id} />
							</ReducedUser>
						))}
				</List>
			</div>
		</div>
	);
}
