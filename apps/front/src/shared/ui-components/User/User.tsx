import "./User.css";
import "./ReducedUser.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../axios";
import { FaSpinner } from "react-icons/fa";
import {
  Button,
  HeartButton,
} from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import store from "../../../store";
import { ReactNode } from "react";
import { UserRole, userLvl } from "../../utils/User";
import { IconSVG } from "../../utils/svgComponent";
import { UserStatus } from "../UserStatus/UserStatus";

interface UserProps {
  userId: number;
  channel?: {
    channelId: number;
    userRole: UserRole;
  };
}

export function User({ userId, channel }: UserProps) {
  const queryClient = useQueryClient();

  const {
    data: self,
    isLoading: selfLoading,
    error: selfError,
  } = useQuery<{ userId: number; role: UserRole }>({
    queryKey: ["self"],
    queryFn: async () => {
      try {
        const response = await api.get(
          "/user-channel/" + channel?.channelId + "/current-user"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching self:", error);
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
        const response = await api.get(`/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
        throw error;
      }
    },
    enabled: !!self?.userId,
  });

  const { data: dmId } = useQuery<number>({
    queryKey: ["dmId", userId],
    queryFn: async () => {
      try {
        const response = await api.get("/dm/" + userId);
        return response.data;
      } catch (error) {
        console.error("Error fetching dmId:", error);
        throw error;
      }
    },
  });

  const { mutateAsync: createDM } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/dm", { userId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dmId", userId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  if (!userId) {
    return <div></div>;
  }

  if (userLoading || selfLoading) {
    return <FaSpinner className="loadingSpinner" />;
  }

  if (userError) {
    return <div>Error loading users: {userError.message}</div>;
  }

  if (selfError) {
    return <div>Error loading user: {selfError.message}</div>;
  }

  const handleOpenProfile = (id: number, username: string) => {
    const name = self?.userId === id ? "Profile" : username;
    const newWindow = {
      WindowName: name,
      id: 0,
      content: { type: "PROFILE", id: id },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: id,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleChannelSettings = () => {
    const newWindow = {
      WindowName: "Member Setting",
      id: 0,
      content: { type: "MEMBERSETTINGS" },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: userId,
      channelId: channel?.channelId,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleChatOpening = async () => {
    let updatedDmId = dmId;
    if (!dmId) {
      updatedDmId = await createDM();
    }
    const newWindow = {
      WindowName: user?.username || "",
      id: 0,
      content: { type: "CHATSESSION", id: updatedDmId || -1 },
      toggle: false,
      handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
      color: WinColor.PURPLE,
    };

    store.dispatch(addWindow(newWindow));
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

  const status = <UserStatus targetId={userId} displayText={true} />;

  const chatButton = (
    <Button icon="Chat" color="pink" onClick={handleChatOpening} />
  );

  const matchButton = (
    <Button
      content="Match"
      color="blue"
      /*onClick={() => handleMatch(userId, user.username)}*/
    />
  );

  const channelSettingsButton = channel ? (
    <Button
      icon="Wrench"
      color="lightYellow"
      className={
        userLvl[self?.role || UserRole.MEMBER] <= userLvl[channel.userRole] &&
        self?.userId !== user.id
          ? "btn-disabled"
          : ""
      }
      onClick={userLvl[self?.role || UserRole.MEMBER] <= userLvl[channel.userRole] &&
        self?.userId !== user.id
          ? () => {}
          : handleChannelSettings}
    />
  ) : (
    <div></div>
  );

  const buttons = () => {
    if (user.friendshipStatus === "BLOCKEDBYME") {
      return (
        <div className="Buttons">
          <HeartButton userId={user.id} username={user.username} />
        </div>
      );
    } else if (user.friendshipStatus !== "BLOCKEDBYUSER") {
      return (
        <div className="Buttons">
          {matchButton}
          <div className="Other">
            {chatButton}
            <HeartButton userId={user.id} username={user.username} />
          </div>
        </div>
      );
    }
  };

  const backgroundColor =
    user?.friendshipStatus === "BLOCKEDBYME" ||
    user?.friendshipStatus === "BLOCKEDBYUSER"
      ? "var(--Purple-Gradient-300, linear-gradient(180deg, #BBA0E9 67.71%, #9673D1 93.23%))"
      : "var(--Purple-Gradient-200, linear-gradient(180deg, #ece5f8 66.15%, #d0b9f8 86.98%))";

  return (
    <div className="UserComponent">
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
              {channel ? (
                <div className="Icon">
                  {(() => {
                    switch (channel.userRole) {
                      case UserRole.OWNER:
                        return IconSVG["Crown"];
                      case UserRole.ADMIN:
                        return IconSVG["Star"];
                      default:
                        return null;
                    }
                  })()}
                </div>
              ) : (
                <div></div>
              )}
              <div className="Text">{user.username}</div>
            </div>
            {status}
          </div>
          {self?.userId !== userId ? buttons() : ""}
        </div>
      </div>
      {self?.role === UserRole.ADMIN || self?.role === UserRole.OWNER
        ? channelSettingsButton
        : ""}
    </div>
  );
}

interface ReducedUserProps {
  userId: number;
  children: ReactNode;
}

export function ReducedUser({ children, userId }: ReducedUserProps) {
  const {
    data: selfId,
    isLoading: selfIdLoading,
    error: selfIdError,
  } = useQuery<number>({
    queryKey: ["selfId"],
    queryFn: async () => {
      try {
        const response = await api.get("/id");
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
    friendshipStatus: string;
  }>({
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
        throw error;
      }
    },
    enabled: !!selfId,
  });

  if (!userId) {
    return <div></div>;
  }

  if (userLoading || selfIdLoading) {
    return <FaSpinner className="loadingSpinner" />;
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
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: id,
    };
    store.dispatch(addWindow(newWindow));
  };

  if (!user) {
    return (
      <div className="UserComponent">
        <div className="User">
          <div className="Frame">
            <div className="Player">
              <div className="Name">
                <div className="Text">Unexisting User</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backgroundColor =
    user?.friendshipStatus === "BLOCKED"
      ? "var(--Purple-Gradient-300, linear-gradient(180deg, #BBA0E9 67.71%, #9673D1 93.23%))"
      : "var(--Purple-Gradient-200, linear-gradient(180deg, #ece5f8 66.15%, #d0b9f8 86.98%))";

  return (
    <div className="ReducedUserComponent">
      <Button
        icon="TripleDot"
        color="pink"
        onClick={() => handleOpenProfile(userId, user.username)}
      />

      <div
        className="User"
        style={{
          background: backgroundColor,
        }}
      >
        <div className="Frame">
          <div className="Avatar">
            <img className="Frame" src={user.avatar_url}></img>
          </div>
          <div className="Player">
            <div className="Name">
              <div className="Text">{user.username}</div>
            </div>
          </div>
          {children ?? children}
        </div>
      </div>
    </div>
  );
}
