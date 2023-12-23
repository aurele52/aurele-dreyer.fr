import axios from "axios";
import "./AboutChan.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../../utils/StringUtils";
import List from "../List/List";
import Button from "../Button/Button";
import Channel from "../Channel/Channel";
import { HBButton, WinColor } from "../../utils/WindowTypes";
import { addWindow } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";

interface AboutChanProps extends ReduxProps {
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

function AboutChan({ chanId, dispatch }: AboutChanProps) {
  const queryClient = useQueryClient();

  const chanApiUrl = "/api/channel/" + chanId;

  const { data: channel } = useQuery<ChannelData>({
    queryKey: ["chanAbout", chanId],
    queryFn: async () => {
      return axios.get(chanApiUrl).then((response) => response.data);
    },
  });

  const { data: userId } = useQuery<number>({
    queryKey: ["userId", chanId],
    queryFn: async () => {
      return axios.get("/api/id").then((response) => response.data);
    },
  });

  const { data: isMember } = useQuery<boolean>({
    queryKey: ["isMember", chanId],
    queryFn: async () => {
      return axios.get(chanApiUrl + "/me").then((response) => response.data);
    },
  });

  const { mutateAsync: createUserChannel } = useMutation({
    mutationFn: async (param: { channelId: number }) => {
      return axios.post("/api/user-channel", param);
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
      return axios.delete("/api/user-channel/" + userChannelId);
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
      console.log(
        "channel_id:",
        channel.id,
        "user_id",
        userId,
        "userChannel_id",
        userChannel?.id
      );
      if (userChannel) {
        deleteUserChannel(userChannel?.id);
      }
    }
  };

  const handleProfile = (userId: number, username: string) => {
    const newWindow = {
      WindowName: username,
      width: "500",
      height: "500",
      id: 0,
      content: { type: "PROFILE", id: userId },
      toggle: false,
      modal: false,
      handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
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
            Type {capitalize(channel?.type || "PUBLIC")}
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
        {channel?.userChannels.map((uc) => {
          const user = uc.User;
          return (
            <div className="chatRow" key={user.id}>
              <Button
                icon="TripleDot"
                color="pink"
                onClick={() => handleProfile(user.id, user.username)}
              />
              <img src={user.avatar_url} className="avatar outsideCard" />
              <Channel name={user.username} className="dm" clickable={false} />
            </div>
          );
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

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedAboutChat = connector(AboutChan);
export default ConnectedAboutChat;

