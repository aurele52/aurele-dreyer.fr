import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "./List";
import Channel from "./Channel";

function Chat() {
  const apiUrl = "/api/channels";
  const { data: channels, isLoading } = useQuery<
    { id: number; name: string; type: string }[]
  >({
    queryKey: ["channels"],
    queryFn: async () => {
      return axios.get(apiUrl).then((response) => response.data);
    },
  });

  if (isLoading) {
    return <div>Tmp Loading...</div>;
  }

  return (
    <div className="Chat">
      <List>
        {channels?.map((channel) => {
          return (
            <Channel
              name={channel.name}
              key={channel.id}
              className={channel.type === 'DM' ? channel.type.toLowerCase() : '' }
            />
          );
        })}
      </List>
      <div className="ChatFooter">Footer</div>
    </div>
  );
}

export default Chat;
