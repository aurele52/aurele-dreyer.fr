import "./FindChan.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "./List";
import Channel from "./Channel";
import Button from "./Button";

function FindChan() {
  const apiUrl = "/api/channels";

  const { data: channels, isLoading } = useQuery<
    {
      id: number;
      name: string;
      type: string;
    }[]
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
    <div className="FindChan">
      <List dark={false}>
        {channels?.map((channel) => {
          return (
            <Channel name={channel.name}>
              <div>
                <Button icon="TripleDot" color="pink" />
                <Button icon="TripleDot" color="pink" />
              </div>
            </Channel>
          );
        })}
      </List>
    </div>
  );
}

export default FindChan;
