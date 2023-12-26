import "./User.css";
import { connect, ConnectedProps } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";

interface UserProps extends ReduxProps {
  key: number;
  userId: number;
  channelId?: number;
}

export function User({ dispatch, key, userId }: UserProps) {
  const {
    data: selfId,
    isLoading: selfIdLoading,
    error: selfIdError,
  } = useQuery<number>({
    queryKey: ["selfId"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/id");
        return response.data;
      } catch (error) {
        console.error("Error fetching selfId:", error);
        throw error;
      }
    },
  });

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<{
    id: number;
    username: string;
    avatar_url: string;
    status: string;
    friendshipStatus: string; //If not friends : 'NONE'
  }>({
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
        throw error;
      }
    },
    enabled: !!selfId,
  });

  if (userLoading || selfIdLoading) {
    return (
      <div className="User">
        <FaSpinner className="loadingSpinner" />
      </div>
    );
  }

  if (userError) {
    return <div>Error loading users: {userError.message}</div>;
  }

  if (selfIdError) {
    return <div>Error loading user: {selfIdError.message}</div>;
  }

  const handleOpenProfile = (id: number, username: string) => {
    const newWindow = {
      WindowName: username,
      width: "400",
      height: "600",
      id: 0,
      content: { type: "PROFILE", id: id },
      toggle: false,
      modal: true,
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: id,
    };
    dispatch(addWindow(newWindow));
  };

  const handleAddFriend = (id: number, username: string) => {
    //To Fill
  };

  const handleAcceptPending = (id: number, username: string) => {
    //To Fill
  };

  const handleRemovePending = (id: number, username: string) => {
    //To Fill
  };

  const handleMatch = (id: number, username: string) => {
    //To Fill
  };

  const handleOpenSettings = (id: number, username: string) => {
    //To Fill
  };

  const handleOpenChat = (id: number, username: string) => {
    //To Fill
  };

  const handleUnblockUser = (id: number, username: string) => {
    //To Fill
  };

  if (!user) {
    return (
      <div className="UserComponent">
        <div className="User">
          <div className="Frame">
            <div className="Player">
              <div className="Name">Unexisting User</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const status = //To change
    (
      <div className="Status">
        <div className="Icon"></div>
        <div className="Text">Maybe Online</div>
      </div>
    );

  const chatButton = (
    <Button
      icon="Chat"
      color="pink"
      onClick={() => handleOpenChat(userId, user.username)}
    />
  );
  const heartButton = (
    <Button
      icon="Heart"
      color="pink"
      onClick={() => handleAddFriend(userId, user.username)}
    />
  ); //To change
  const blockButton = (
    <Button
      icon="Close"
      color="pink"
      onClick={() => handleUnblockUser(userId, user.username)}
    />
  ); //Need to check who is blocked and change icon
  const matchButton = (
    <Button
      content="Match"
      color="blue"
      onClick={() => handleMatch(userId, user.username)}
    />
  );

  const buttons =
    user.friendshipStatus === "BLOCKED" ? (
      <div className="Buttons">
        <div className="Other">{blockButton}</div>
      </div>
    ) : (
      <div className="Buttons">
        {matchButton}
        <div className="Other">
          {chatButton}
          {heartButton}
        </div>
      </div>
    );
  const backgroundColor =
    user?.friendshipStatus === "BLOCKED"
      ? "var(--Purple-Gradient-300, linear-gradient(180deg, #BBA0E9 67.71%, #9673D1 93.23%))"
      : "var(--Purple-Gradient-200, linear-gradient(180deg, #ece5f8 66.15%, #d0b9f8 86.98%))";
  return (
    <div className="UserComponent" key={key}>
      <Button
        icon="TripleDot"
        color="pink"
        onClick={() => handleOpenProfile(userId, user.username)}
      />
      <div className="Avatar">
        <img className="Frame" src={user.avatar_url}></img>
      </div>
      <div
        className="User"
        style={{
          background: backgroundColor,
        }}
      >
        <div className="Frame">
          <div className="Player">
            <div className="Name">
              <div>{user.username}</div>
            </div>
            {status}
          </div>
          {buttons}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedUser = connector(User);
export default ConnectedUser;
