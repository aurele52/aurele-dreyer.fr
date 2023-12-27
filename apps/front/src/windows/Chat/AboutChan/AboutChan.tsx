import api from "../../../axios";
import "./AboutChan.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../../../shared/utils/StringUtils";
import List from "../../../shared/ui-components/List/List";
import { Button } from "../../../shared/ui-components/Button/Button";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow } from "../../../reducers";
import store from "../../../store";
import { User } from "../../../shared/ui-components/User/User";

interface AboutChanProps {
  chanId: number | undefined;
}

type ChannelData = {
  id: number;
  name: string;
  type: string;
  topic: string;
  userChannels: {
    id: number;
    user_id: number;
    User: {
      id: number;
      username: string;
      avatar_url: string;
    };
  }[];
};

function AboutChan({ chanId }: AboutChanProps) {
  const queryClient = useQueryClient();

  const chanApiUrl = "/channel/" + chanId;

  const { data: channel } = useQuery<ChannelData>({
    queryKey: ["chanAbout", chanId],
    queryFn: async () => {
      return api.get(chanApiUrl).then((response) => response.data);
    },
  });

  const { data: userId } = useQuery<number>({
    queryKey: ["userId", chanId],
    queryFn: async () => {
      return api.get("/id").then((response) => response.data);
    },
  });

  const { data: isMember } = useQuery<boolean>({
    queryKey: ["isMember", chanId],
    queryFn: async () => {
      return api.get(chanApiUrl + "/me").then((response) => response.data);
    },
  });

  const { mutateAsync: createUserChannel } = useMutation({
    mutationFn: async (param: { channelId: number }) => {
      return api.post("/user-channel", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["isMember", chanId] });
      queryClient.invalidateQueries({ queryKey: ["chanAbout", chanId] });
    },
  });

  const { mutateAsync: deleteUserChannel } = useMutation({
    mutationFn: async (userChannelId: number) => {
      return api.delete("/user-channel/" + userChannelId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["isMember", chanId] });
      queryClient.invalidateQueries({ queryKey: ["chanAbout", chanId] });
    },
  });
  const handleJoin = async (channelId: number | undefined) => {
    if (channelId) await createUserChannel({ channelId });
  };

  const handleLeave = async (channel: ChannelData | undefined) => {
    if (channel) {
      const userChannel = channel.userChannels.find(
        (uc) => uc.user_id === userId
      );
      if (userChannel) {
        deleteUserChannel(userChannel?.id);
      }
    }
  };

  const handleProfile = (id: number, username: string) => {
    const name = userId === id ? "Profile" : username;
    const newWindow = {
      WindowName: name,
      width: "500",
      height: "500",
      id: 0,
      content: { type: "PROFILE", id: id },
      toggle: false,
      handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
      color: WinColor.PURPLE,
    };
    store.dispatch(addWindow(newWindow));
  };

  return (
    <div className="AboutChan custom-scrollbar">
      <div className="headerAboutChan">
        <div className="chanDescription">
          <div className="heading-600">
            {capitalize(channel?.name || "channel name")}
          </div>
          <div className="heading-500">{channel?.topic}</div>
          <div className="text-400">
            {capitalize(channel?.type || "PUBLIC")} Channel
          </div>
          <div className="text-400">{channel?.userChannels.length} members</div>
        </div>
        <div className="joinBtn">
          {!isMember ? (
            <Button
              color="purple"
              content="join"
              onClick={() => handleJoin(channel?.id)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <List>
        {channel?.userChannels.map((uc, index) => {
          const user = uc.User;
					return <User key={index} userId={user.id} />;
        })}
      </List>
      <div className="leaveChanBtn">
        {isMember ? (
          <Button
            color="red"
            content="leave channel"
            onClick={() => handleLeave(channel)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AboutChan;
