import "./AddMembers.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../../axios";
import { Button } from "../../../../shared/ui-components/Button/Button";
import List from "../../../../shared/ui-components/List/List";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useState } from "react";
import { SearchBar } from "../../../../shared/ui-components/SearchBar/SearchBar";
import store from "../../../../store";
import { delWindow } from "../../../../reducers";

interface AddMembersProps {
  channelId?: number;
  winId: number;
}

function AddMembers({ channelId, winId }: AddMembersProps) {
  const queryClient = useQueryClient();

  const [searchBarValue, setSearchBarValue] = useState("");

  const { data: users } = useQuery<{ id: number; username: string }[]>({
    queryKey: ["addChannel", channelId],
    queryFn: async () => {
      try {return api
        .get("/channel/" + channelId + "/nonmembers")
        .then((response) => response.data);
      } catch {
        store.dispatch(delWindow(winId))
      }
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
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({ queryKey: ["addChannel", channelId] });
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
            !user.username.toLowerCase().includes(searchBarValue.toLowerCase())
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
