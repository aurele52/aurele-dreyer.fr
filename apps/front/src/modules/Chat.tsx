import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "./List";
import Channel from "./Channel";
import Button from "./Button";

function Chat() {
  const apiUrl = "/api/channels";
  const { data: channels, isLoading } = useQuery<
    { id: number; name: string; type: string; image: string; interlocutor: string }[]
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
            <div className="chatRow" key={channel.id}>
              <Button icon="TripleDot" color="pink"/>
              <Channel
                name={channel.type === "DM" ? channel.interlocutor : channel.name}
                className={
                  channel.type === "DM" ? channel.type.toLowerCase() : ""
                }
                image={channel.type === "DM" ? channel.image : undefined }
              />
            </div>
          );
        })}
      </List>
      <div className="ChatFooter">
        <Button content="find channel" color="purple"/>
        <Button content="create channel" color="purple"/>
      </div>
    </div>
  );
}

export default Chat;
