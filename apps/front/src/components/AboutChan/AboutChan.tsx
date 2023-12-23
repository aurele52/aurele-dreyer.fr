import axios from "axios";
import "./AboutChan.css";
import { useQuery } from "@tanstack/react-query";
import { capitalize } from "../../utils/StringUtils";
import List from "../List/List";
import Button from "../Button/Button";
import Channel from "../Channel/Channel";

interface AboutChanProps {
  chanId: number;
}

type ChannelData = {
  id: number;
  name: string;
  type: string;
  topic: string;
  userChannels: {
    id: number;
    userId: number;
    User: {
      id: number;
      username: string;
      avatar_url: string;
    };
  }[];
};

function AboutChan({ chanId }: AboutChanProps) {
  const chanApiUrl = "/api/channel/" + chanId;

  const { data: channel } = useQuery<ChannelData>({
    queryKey: ["chanAbout"],
    queryFn: async () => {
      return axios.get(chanApiUrl).then((response) => response.data);
    },
  });

  return (
    <div className="AboutChan custom-scrollbar">
      <div className="headerAboutChan">
        <div className="chanDescription">
          <div className="heading-600">
            {capitalize(channel?.name || "channel name")}
          </div>
          <div className="heading-500">{channel?.topic}</div>
          <div className="text-400">
            Type {capitalize(channel?.type || "PUBLIC")}
          </div>
          <div className="text-400">{channel?.userChannels.length} members</div>
        </div>
        <div className="joinBtn">
          <Button color="purple" content="join" />
        </div>
      </div>
      <List>
        {channel?.userChannels.map((uc) => {
          const user = uc.User;
          return (
            <div className="chatRow" key={user.id}>
              <Button icon="TripleDot" color="pink" />
              <img src={user.avatar_url} className="avatar outsideCard" />
              <Channel
                name={user.username}
                className="dm"
                clickable={false}
              />
            </div>
          );
        })}
      </List>
    </div>
  );
}

export default AboutChan;
