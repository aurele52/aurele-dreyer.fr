import './AddMembers.css'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../../axios";
import { Button } from "../../../../shared/ui-components/Button/Button";
import List from "../../../../shared/ui-components/List/List";
import { ReducedUser } from "../../../../shared/ui-components/User/User";

interface AddMembersProps {
  channelId?: number;
}

function AddMembers({channelId}: AddMembersProps) {
  
  const queryClient = useQueryClient();
  
  const { data: users } = useQuery<{id: number}[]>({
    queryKey: ["users", channelId],
    queryFn: async () => {
      return api.get('/channel/' + channelId + '/nonmembers').then((response) => response.data);
    },
  });

  const {mutateAsync: createUserChannel} = useMutation({
    mutationFn: async (userId: number) => {
      return api.post('/user-channel/' + userId, {channelId});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["chanAbout", channelId]});
      queryClient.invalidateQueries({queryKey: ["users", channelId]});
    }
  })

  const handleAdd = (userId: number) => {
    createUserChannel(userId);
  }

  return (
    <div className="AddMembers">
      <List dark={false}>
					{users?.map((user, key) => {
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
  )
}

export default AddMembers;