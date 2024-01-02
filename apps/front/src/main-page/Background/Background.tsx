import "./Background.css";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
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
import Connection from "../../windows/Play/Connection";
import { MemberSettings } from "../../windows/Chat/AboutChan/MemberSettings/MemberSettings";
import ChannelSettings from "../../windows/Chat/AboutChan/ChannelSettings/ChannelSettings";
import { BanList } from "../../windows/Chat/AboutChan/BanList/BanList";
import ChatSession from "../../windows/Chat/ChatSession/ChatSession";
import TwoFA from "../../windows/Profile/TwoFA/TwoFA";

interface BackgroundProps extends ReduxProps {}

export function Background({ windows }: BackgroundProps) {
  interface WindowDimensions {
    width: string;
    height: string;
  }

  const windowDimensions: Record<string, WindowDimensions> = {
    PLAY: { width: "820px", height: "540px" },
    LADDER: { width: "450px", height: "600px" },
    CHAT: { width: "400px", height: "400px" },
    PROFILE: { width: "500px", height: "500px" },
    FINDCHAN: { width: "400px", height: "400px" },
    NEWCHAN: { width: "400px", height: "400px" },
    ABOUTCHAN: { width: "500px", height: "500px" },
    ACHIEVEMENTS: { width: "300px", height: "300px" },
    FRIENDSLIST: { width: "450px", height: "600px" },
    MODAL: { width: "390px", height: "200px" },
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
  };

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
            >
              {window.content.type === "PLAY" && <Connection />}
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
              {window.content.type === "MODAL" && (
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
                  winId={window.id}
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
