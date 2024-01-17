import "./AddMembers.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../../axios";
import { Button } from "../../../../shared/ui-components/Button/Button";
import List from "../../../../shared/ui-components/List/List";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useState } from "react";
import { SearchBar } from "../../../../shared/ui-components/SearchBar/SearchBar";

interface AddMembersProps {
	channelId?: number;
}

function AddMembers({ channelId }: AddMembersProps) {
	const queryClient = useQueryClient();

	const [searchBarValue, setSearchBarValue] = useState("");

	const { data: users } = useQuery<{ id: number; username: string }[]>({
		queryKey: ["addChannel", channelId],
		queryFn: async () => {
			return api
				.get("/channel/" + channelId + "/nonmembers")
				.then((response) => response.data);
		},
	});

	const { mutateAsync: createUserChannel } = useMutation({
		mutationFn: async (userId: number) => {
			return api.post("/user-channel/" + userId, { channelId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
			queryClient.invalidateQueries({ queryKey: ["users", channelId] });
		},
	});

	const handleAdd = (userId: number) => {
		createUserChannel(userId);
	};

	return (
		<div className="AddMembers">
			<SearchBar
				action={setSearchBarValue}
				button={{ color: "purple", icon: "Lens" }}
			/>
			<List dark={false}>
				{users?.map((user, key) => {
					if (
						searchBarValue.length > 0 &&
						!user.username
							.toLowerCase()
							.includes(searchBarValue.toLowerCase())
					) {
						return null;
					}
					return (
						<ReducedUser userId={user.id} key={key}>
							<Button
								color="pink"
								icon="Plus"
								onClick={() => handleAdd(user.id)}
							/>
						</ReducedUser>
					);
				})}
			</List>
		</div>
	);
}

export default AddMembers;
