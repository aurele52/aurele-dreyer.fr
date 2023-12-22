import axios from "axios";
import "./AboutChan.css";
import { useQuery } from "@tanstack/react-query";
import { capitalize } from "../../utils/StringUtils";

interface AboutChanProps {
  chanId: number;
}

type ChannelData = {
  id: number;
  name: string;
  type: string;
  userChannels: {
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
    <div className="AboutChan">
      <div className="heading-600">
        {capitalize(channel?.name || "channel name")}
      </div>
      {channel?.userChannels.map((uc) => {
        return <p>{uc.User.username}</p>;
      })}
    </div>
  );
}

export default AboutChan;
