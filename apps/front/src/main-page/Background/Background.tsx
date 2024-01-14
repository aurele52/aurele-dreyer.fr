import "./Background.css";
import { connect } from "react-redux";
import { AppState, delWindow } from "../../reducers";
import { ConnectedProps } from "react-redux";
import Window from "../../shared/ui-components/Window/Window";
import Chat from "../../windows/Chat/Chat";
import Ladder from "../../windows/Ladder/Ladder";
import Profile from "../../windows/Profile/Profile";
import FindChan from "../../windows/Chat/FindChan/FindChan";
import NewChan from "../../windows/Chat/NewChan/NewChan";
import AboutChan from "../../windows/Chat/AboutChan/AboutChan";
import Achievements from "../../windows/Achievements/Achievements";
import FriendsList from "../../windows/Profile/FriendsList/FriendsList";
import Modal from "../../shared/ui-components/Modal/Modal";
import { PendingRequests } from "../../windows/Profile/FriendsList/PendingRequests/PendingRequests";
import { BlockedUsers } from "../../windows/Profile/FriendsList/BlockedUsers/BlockedUsers";
import { AddFriends } from "../../windows/Profile/FriendsList/AddFriends/AddFriends";
import AddMembers from "../../windows/Chat/AboutChan/AddMembers/AddMembers";
import AvatarUpload from "../../windows/Profile/AvatarUpload/AvatarUpload";
import Play from "../../windows/Play/Play.tsx";
import { MemberSettings } from "../../windows/Chat/AboutChan/MemberSettings/MemberSettings";
import ChannelSettings from "../../windows/Chat/AboutChan/ChannelSettings/ChannelSettings";
import { BanList } from "../../windows/Chat/AboutChan/BanList/BanList";
import ChatSession from "../../windows/Chat/ChatSession/ChatSession";
import TwoFA from "../../windows/Profile/Your2FA/Your2FA";
import Preview from "../../windows/Play/Preview.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import api from "../../axios.ts";
import store from "../../store.tsx";

enum FriendshipEventType {
  FRIENDREQUESTRECEIVED = "FRIENDREQUESTRECEIVED",
  FRIENDSHIPREMOVED = "FRIENDSHIPREMOVED",
  FRIENDREQUESTREVOKED = "FRIENDREQUESTREVOKED",
  FRIENDREQUESTACCEPTED = "FRIENDREQUESTACCEPTED",
  USERBLOCKED = "USERBLOCKED",
  USERUNBLOCKED = "USERUNBLOCKED",
  NOEVENT = "NOEVENT",
}

interface BackgroundProps extends ReduxProps {}

export function Background({ windows }: BackgroundProps) {
  const queryClient = useQueryClient();

  interface WindowDimensions {
    width: string;
    height: string;
  }

  const windowDimensions: Record<string, WindowDimensions> = {
    LADDER: { width: "450px", height: "600px" },
    CHAT: { width: "400px", height: "400px" },
    PROFILE: { width: "500px", height: "500px" },
    FINDCHAN: { width: "400px", height: "400px" },
    NEWCHAN: { width: "400px", height: "400px" },
    ABOUTCHAN: { width: "500px", height: "500px" },
    ACHIEVEMENTS: { width: "300px", height: "300px" },
    FRIENDSLIST: { width: "450px", height: "600px" },
    MODAL: { width: "390px", height: "200px" },
    MODALREQUESTED: { width: "390px", height: "250px" },
    PENDINGREQUESTS: { width: "300px", height: "300px" },
    BLOCKEDUSERS: { width: "300px", height: "400px" },
    TWOFAQRCODE: { width: "300px", height: "400px" },
    ADDFRIENDS: { width: "300px", height: "400px" },
    ADDMEMBERS: { width: "300px", height: "400px" },
    AVATARUPLOAD: { width: "300px", height: "250px" },
    MEMBERSETTINGS: { width: "430px", height: "330px" },
    CHANSETTINGS: { width: "500px", height: "350px" },
    BANLIST: { width: "300px", height: "400px" },
    CHATSESSION: { width: "350px", height: "500px" },
    PLAY: { width: "820px", height: "540px" },
    PONG: { width: "820px", height: "540px" },
	PREVIEW: { width: "900px", height: "900px" },
	CREATECUSTOM: { width: "900px", height: "900px" },
	JOINCUSTOM: { width: "900px", height: "900px" },
  };

  const [currentTargetId, setCurrentTargetId] = useState(null);

  const { data: commonChannels } = useQuery<{ id: number }[]>({
    queryKey: ["commonChannels", currentTargetId],
    queryFn: () => {
      return api
        .get("/channels/common/" + currentTargetId)
        .then((response) => response.data);
    },
    enabled: !!currentTargetId,
  });

  const { data: currUserOnlyChannels } = useQuery<{ id: number }[]>({
    queryKey: ["currUserOnlyChannels", currentTargetId],
    queryFn: () => {
      return api
        .get("/channels/excluded/" + currentTargetId)
        .then((response) => response.data);
    },
    enabled: !!currentTargetId,
  });

  const { data: targetUser } = useQuery<{ id: number; username: string }>({
    queryKey: ["username", currentTargetId],
    queryFn: () => {
      return api
        .get("/user/" + currentTargetId)
        .then((response) => response.data);
    },
    enabled: !!currentTargetId,
  });

  const invalidateMessagesQueries = () => {
    commonChannels?.forEach((c) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", c.id],
      });
    });
  };

  const invalidateAddChannelQueries = () => {
    currUserOnlyChannels?.forEach((c) => {
      queryClient.invalidateQueries({
        queryKey: ["addChannel", c.id],
      });
    });
  };

  const closeDMWindow = () => {
    let windows = store.getState().windows;
    console.log(targetUser);
    windows = windows.filter(
      (window) =>
        window.WindowName === targetUser?.username &&
        window.content.type === "CHATSESSION"
    );
    windows.forEach((window) => store.dispatch(delWindow(window.id)));
  };

  const [friendshipEventType, setFriendshipEventType] = useState(
    FriendshipEventType.NOEVENT
  );

  useEffect(() => {
    switch (friendshipEventType) {
      case FriendshipEventType.FRIENDREQUESTRECEIVED:
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests", "Profile"],
        });
        break;
      case FriendshipEventType.FRIENDSHIPREMOVED:
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        break;
      case FriendshipEventType.FRIENDREQUESTREVOKED:
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests", "Profile"],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        break;
      case FriendshipEventType.FRIENDREQUESTACCEPTED:
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests", "Profile"],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        break;
      case FriendshipEventType.USERUNBLOCKED:
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        invalidateMessagesQueries();
        queryClient.invalidateQueries({
          queryKey: ["chats"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        invalidateAddChannelQueries();
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        break;
      case FriendshipEventType.USERBLOCKED:
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["pendingRequests", "Profile"],
        });
        queryClient.invalidateQueries({
          queryKey: ["addFriendsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendsList"],
        });
        invalidateAddChannelQueries();
        queryClient.invalidateQueries({
          queryKey: ["user", currentTargetId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendship", currentTargetId],
        });
        invalidateMessagesQueries();
        queryClient.invalidateQueries({
          queryKey: ["chats"],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", currentTargetId],
        });
        closeDMWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendshipEventType]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const eventSource = new EventSourcePolyfill(
        "api/stream/friendshipevents",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      eventSource.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        const type = parsedData.type;
        const targetId = parsedData.targetId;
        setCurrentTargetId(targetId);
        setFriendshipEventType(type);
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
      };

      return () => {
        eventSource.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, setCurrentTargetId]);

  return (
    <div id="Background">
      {Array.isArray(windows) &&
        windows.map((window) => {
          const dimensions = windowDimensions[window.content.type] || {
            width: "500px",
            height: "600px",
          };
          const { width, height } = dimensions;
          return (
            <Window
              key={window.id}
              WindowName={window.WindowName}
              width={width}
              height={height}
              id={window.id}
              handleBarButton={window.handleBarButton}
              color={window.color}
              zindex={window.zindex || 0}
              isModal={window.content.type === "MODAL"}
            >
              {window.content.type === "LADDER" && (
                <Ladder targetId={window.targetId} />
              )}
              {window.content.type === "CHAT" && <Chat />}
              {window.content.type === "PROFILE" && (
                <Profile targetId={window.content.id || undefined} />
              )}
              {window.content.type === "FINDCHAN" && <FindChan />}
              {window.content.type === "NEWCHAN" && (
                <NewChan winId={window.id} />
              )}
              {window.content.type === "ABOUTCHAN" && (
                <AboutChan chanId={window.content.id || undefined} />
              )}
              {window.content.type === "ACHIEVEMENTS" && (
                <Achievements targetId={window.targetId} />
              )}
              {window.content.type === "FRIENDSLIST" && <FriendsList />}
              {(window.content.type === "MODAL" ||
                window.content.type === "MODALREQUESTED") && (
                <Modal
                  content={window.modal?.content}
                  type={window.modal?.type}
                  winId={window.id}
                  action={window.modal?.action}
                  targetId={window.modal?.targetId}
                  channelId={window.modal?.channelId}
                />
              )}
              {window.content.type === "PENDINGREQUESTS" && <PendingRequests />}
              {window.content.type === "BLOCKEDUSERS" && <BlockedUsers />}
              {window.content.type === "TWOFAQRCODE" && <TwoFA />}
              {window.content.type === "ADDFRIENDS" && <AddFriends />}
              {window.content.type === "AVATARUPLOAD" && (
                <AvatarUpload winId={window.id} />
              )}
              {window.content.type === "ADDMEMBERS" && (
                <AddMembers channelId={window.content.id} />
              )}
              {window.content.type === "MEMBERSETTINGS" && (
                <MemberSettings
                  targetId={window.targetId ? window.targetId : 0}
                  channelId={window.channelId ? window.channelId : 0}
                />
              )}
              {window.content.type === "CHANSETTINGS" && (
                <ChannelSettings channelId={window.content.id} />
              )}
              {window.content.type === "BANLIST" && (
                <BanList channelId={window.channelId ? window.channelId : 0} />
              )}
              {window.content.type === "CHATSESSION" && (
                <ChatSession channelId={window.content.id} />
              )}
              {window.content.type === "PLAY" && (
								<Play
									windowId={window.id}
									privateLobby={
										window.targetId
											? { targetId: window.targetId }
											: undefined
									}
								/>
							)}
			{window.content.type === "PONG" && <Preview />}
			{window.content.type === "PREVIEW" && <Preview />}
			{window.content.type === "CREATECUSTOM" && <Preview />}
			{window.content.type === "JOINCUSTOM" && <Preview />}
            </Window>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  windows: state.windows,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedBackground = connector(Background);
export default ConnectedBackground;
