import "./FindChan.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import List from "../List/List";
import Channel from "../Channel/Channel";
import Button from "../Button/Button";

function FindChan() {
  const queryClient = useQueryClient();

  const { data: channels } = useQuery<
    {
      id: number;
      name: string;
      type: string;
    }[]
  >({
    queryKey: ["channels"],
    queryFn: async () => {
      return axios.get("/api/channels").then((response) => response.data);
    },
  });

  const { mutateAsync: createUserChannel } = useMutation({
    mutationFn: async (param: { channelId: number }) => {
      return axios.post("/api/user-channel", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleAddChannel = async (channelId: number) => {
    await createUserChannel({ channelId });
  };

  return (
    <div className="FindChan">
      <List dark={false}>
        {channels?.map((channel) => {
          return (
            <div key={channel.id}>
              <Channel name={channel.name} clickable={false}>
                <div className="ButtonFindChan">
                  <Button icon="TripleDot" color="pink" />
                  <Button
                    icon="Plus"
                    color="pink"
                    onClick={() => {
                      handleAddChannel(channel.id);
                    }}
                  />
                </div>
              </Channel>
            </div>
          );
        })}
      </List>
    </div>
  );
}

export default FindChan;
