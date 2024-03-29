import { Button } from "../../shared/ui-components/Button/Button";
import "./Profile.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../axios";
import List from "../../shared/ui-components/List/List";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { addWindow, delWindow } from "../../reducers";
import { FaSpinner } from "react-icons/fa";
import store from "../../store";
import { addModal, ModalType } from "../../shared/utils/AddModal";
import { FormEvent, useState } from "react";
import { UserStatus } from "../../shared/ui-components/UserStatus/UserStatus";
import MatchRecap from "../../shared/ui-components/MatchRecap/MatchRecap";
import { playerGameEndInfo } from "shared/src/gameEndInfo.interface";
import { Input } from "../../shared/ui-components/Input/Input";
import { AxiosError } from "axios";

interface ProfileProps {
  targetId?: number;
  winId: number;
}

interface ValidationErrorResponse {
  [key: string]: string[];
}

export function Profile({ targetId, winId }: ProfileProps) {
  const queryClient = useQueryClient();
  const [changingName, setChangingName] = useState<boolean>(false);
  const [placeholderValue, setPlaceholderValue] = useState<string>("");
  const [avatarIsHovered, setAvatarIsHovered] = useState(false);
  const [historicMaxDisplay, setHistoricMaxDisplay] = useState<number>(10);

  const { data: profile, isLoading: profileLoading } = useQuery<{
    id: number;
    username: string;
    avatar_url: string;
    win_count: number;
    loose_count: number;
    achievement_lvl: number;
    rank: number;
    is2FaEnabled?: boolean;
    friendship?: {
      status: "FRIENDS" | "PENDING" | "BLOCKED";
      user1_id: number;
      user2_id: number;
    };
  }>({
    queryKey: ["profile", targetId],
    queryFn: async () => {
      try {
        const response = targetId
          ? await api.get(`/profile/user/${targetId}`)
          : await api.get(`/profile/user`);
        return response.data;
      } catch (error) {
        store.dispatch(delWindow(winId));
      }
    },
  });

  const { data: pendingRequests, isLoading: pendingRequestsLoading } =
    useQuery<number>({
      queryKey: ["pendingRequests", "Profile"],
      queryFn: async () => {
        try {
          if (targetId) return 0;
          const response = await api.get(`/friendships/pendingList`);
          return response.data?.filter(
            (content: { type: "sent" | "received" }) =>
              content.type === "received"
          ).length;
        } catch {
          store.dispatch(delWindow(winId));
        }
      },
    });

  const { data: historic, isLoading: historicLoading } = useQuery<{
    matchHistory: {
      id: number;
      player1: playerGameEndInfo;
      player2: playerGameEndInfo;
    }[];
    length: number;
  }>({
    queryKey: ["historic", targetId, historicMaxDisplay],
    queryFn: async () => {
      try {
        const response = targetId
          ? await api.get(`/profile/historic/${targetId}`, {
              params: { historicMaxDisplay },
            })
          : await api.get(`/profile/historic`, {
              params: { historicMaxDisplay },
            });
        return response.data;
      } catch (error: unknown) {
        store.dispatch(delWindow(winId));
      }
    },
  });

  const { mutateAsync: setUsername, error: setUsernameError } = useMutation({
    mutationFn: async (formData) => {
      return api.post("/user/username", formData).catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          throw error.response?.data as ValidationErrorResponse;
        } else
          throw {
            username: [(error.response?.data as { message: string }).message],
          };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historic", targetId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", targetId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", targetId],
      });
    },
  });

  const { mutateAsync: createFriendship } = useMutation({
    mutationFn: async (user2_id: number) => {
      return api.post("/friendship", { user2_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendship", profile?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["addFriendsList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", profile?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profile?.id],
      });
    },
  });

  const { mutateAsync: acceptFriendship } = useMutation({
    mutationFn: async (userId: number) => {
      return api.patch("/friendship/accept/" + userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historic", targetId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", targetId],
      });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friendsList"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", targetId],
      });
    },
  });

  const selfProfile = targetId ? false : true;

  if (historicLoading || profileLoading || pendingRequestsLoading) {
    return (
      <div className="Ladder">
        <FaSpinner className="loadingSpinner" />
      </div>
    );
  }

  const handleOpenLadder = () => {
    const newWindow = {
      WindowName: "Ladder",
      width: "400",
      height: "600",
      id: 0,
      content: { type: "LADDER" },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.LILAC,
      targetId: targetId,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleOpenAchievements = () => {
    const newWindow = {
      WindowName: "Achievements",
      id: 0,
      content: { type: "ACHIEVEMENTS" },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.LILAC,
      targetId: targetId,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleOpenFriendsList = () => {
    const newWindow = {
      WindowName: "Friends List",
      id: 0,
      content: { type: "FRIENDSLIST" },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: targetId,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleOpenBlockedList = () => {
    const newWindow = {
      WindowName: "Blocked Users",
      id: 0,
      content: { type: "BLOCKEDUSERS" },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.PURPLE,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleFriendRequest = async () => {
    if (!targetId) return;
    createFriendship(targetId);
  };

  const handleAcceptRequest = async () => {
    if (!targetId) return;
    acceptFriendship(targetId);
  };

  const handleBlockUser = async () => {
    if (!targetId) return;
    addModal(
      ModalType.WARNING,
      `Are you sure you want to block ${profile?.username}?`,
      "addBlockedFriendship",
      targetId
    );
  };

  const handleRemovePending = async () => {
    if (!targetId) return;
    addModal(
      ModalType.WARNING,
      `Are you sure you want to remove your pending request?`,
      "deleteFriendship",
      targetId
    );
  };

  const handleUnblock = async () => {
    if (!targetId) return;
    addModal(
      ModalType.WARNING,
      `Are you sure you want to unblock ${profile?.username}?`,
      "deleteBlockedFriendship",
      targetId
    );
  };

  const handleRemoveFriend = async () => {
    if (!targetId) return;
    addModal(
      ModalType.WARNING,
      `Are you sure you want to remove ${profile?.username} from your friendlist?`,
      "deleteFriendship",
      targetId
    );
  };

  const handlePenButton = async () => {
    setChangingName(true);
    setPlaceholderValue(profile?.username || "Username");
  };

  const handleChangeName = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(target));
    setUsername(formData as any);
    setChangingName(false);
  };

  const handleUploadAvatar = async () => {
    const newWindow = {
      WindowName: "Upload New Avatar",
      id: 0,
      content: { type: "AVATARUPLOAD" },
      toggle: false,
      handleBarButton: HBButton.Close,
      color: WinColor.PURPLE,
      targetId: profile?.id,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleLoadMore = async () => {
    setHistoricMaxDisplay((prevValue) => prevValue + 10);
  };

  const handleDeleteAccount = async () => {
    addModal(
      ModalType.WARNING,
      `Are you sure you want to delete your account? All the channels that you own will be deleted`,
      "deleteUser"
    );
  };

  const handleEnableAndOpenTwoFA = async () => {
    addModal(
      ModalType.WARNING,
      `Are you sure you want to enable Two Factor Authentification ?`,
      "enableTwoFA"
    );
  };

  const handleDisableTwoFA = async () => {
    addModal(
      ModalType.WARNING,
      `Are you sure you want to disable Two Factor Authentification ?`,
      "disableTwoFA"
    );
  };

  const nameDiv = () => {
    if (!selfProfile)
      return (
        <div className="NameFrame">
          <UserStatus targetId={targetId} displayText={false} />
          <div className="Name">{profile?.username ?? "No name"}</div>
        </div>
      );
    else {
      if (!changingName) {
        return (
          <div className="NameFrame">
            <div className="Name">{profile?.username ?? "No name"}</div>
            <Button icon="Pen" color="purple" onClick={handlePenButton} />
          </div>
        );
      } else {
        return (
          <form className="TypeBarFrame" onSubmit={handleChangeName}>
            <Input
              name="username"
              value={placeholderValue}
              onChange={(e) => setPlaceholderValue(e.target.value)}
              errors={(setUsernameError as any)?.username}
            />
            <Button icon="Check" type="submit" color="purple" />
          </form>
        );
      }
    }
  };

  const avatarDiv = () => {
    if (selfProfile)
      return (
        <div
          className="Avatar"
          onMouseEnter={() => setAvatarIsHovered(true)}
          onMouseLeave={() => setAvatarIsHovered(false)}
          onClick={() => handleUploadAvatar()}
        >
          <img
            src={profile?.avatar_url}
            className="Frame FrameHover"
            alt={profile?.username.toLowerCase()}
          />
          {avatarIsHovered && avatarHoverSvg}
        </div>
      );
    else
      return (
        <div className="Avatar">
          <img
            src={profile?.avatar_url}
            className="Frame"
            alt={profile?.username.toLowerCase()}
          />
        </div>
      );
  };

  const addFriendButton = () => {
    if (!profile?.friendship) {
      return (
        <Button
          content="add friend"
          color="purple"
          style={{ display: "flex" }}
          onClick={() => handleFriendRequest()}
        />
      );
    } else {
      if (profile?.friendship?.status === "PENDING") {
        if (profile.friendship.user1_id === targetId)
          return (
            <Button
              content="accept"
              color="purple"
              style={{ display: "flex" }}
              onClick={() => handleAcceptRequest()}
            />
          );
        else
          return (
            <Button
              content="cancel request"
              color="pink"
              style={{ display: "flex" }}
              onClick={() => handleRemovePending()}
            />
          );
      } else if (profile.friendship.status === "FRIENDS") {
        return (
          <Button
            content="remove friend"
            color="red"
            style={{ display: "flex" }}
            onClick={() => handleRemoveFriend()}
          />
        );
      } else {
        return <div></div>;
      }
    }
  };

  const addBlockButton = () => {
    if (profile?.friendship && profile.friendship.status == "BLOCKED") {
      if (profile.friendship.user2_id == targetId)
        return (
          <Button
            content="unblock"
            color="pink"
            style={{ display: "flex" }}
            onClick={handleUnblock}
          />
        );
      else return <div></div>;
    } else
      return (
        <Button
          content="block"
          color="red"
          style={{ display: "flex" }}
          onClick={() => handleBlockUser()}
        />
      );
  };

  const buttons = selfProfile ? (
    //SELF USER BUTTON
    <div className="Buttons">
      <Button
        content="friends list"
        color="purple"
        style={{ display: "flex" }}
        onClick={handleOpenFriendsList}
        notif={pendingRequests ? pendingRequests : 0}
      />
      <Button
        content="blocked list"
        color="purple"
        style={{ display: "flex" }}
        onClick={handleOpenBlockedList}
      />
    </div>
  ) : (
    //OTHER USER BUTTON
    <div className="Buttons">
      {addFriendButton()}
      {addBlockButton()}
    </div>
  );

  const footer = selfProfile ? (
    <div className="Footer">
      <Button
        content="delete account"
        color="red"
        style={{ display: "flex" }}
        onClick={handleDeleteAccount}
      />
      <Button
        content={profile?.is2FaEnabled ? "disable 2fa" : "enable 2fa"}
        color={profile?.is2FaEnabled ? "red" : "purple"}
        style={{ display: "flex" }}
        onClick={
          profile?.is2FaEnabled ? handleDisableTwoFA : handleEnableAndOpenTwoFA
        }
      />
    </div>
  ) : (
    <div></div>
  );

  const avatarHoverSvg = (
    <svg
      className="HoverSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="48"
      height="48"
    >
      <g clipPath="url(#clip0_389_7713)">
        <rect x="10" width="2" height="2" fill="white" />
        <rect x="8" y="2" width="2" height="2" fill="white" />
        <rect x="6" y="4" width="2" height="2" fill="white" />
        <rect x="4" y="6" width="2" height="2" fill="white" />
        <rect x="2" y="8" width="2" height="2" fill="white" />
        <rect y="10" width="2" height="2" fill="white" />
        <rect y="14" width="2" height="2" fill="white" />
        <rect y="16" width="2" height="2" fill="white" />
        <rect x="2" y="16" width="2" height="2" fill="white" />
        <rect x="4" y="16" width="2" height="2" fill="white" />
        <rect x="6" y="16" width="2" height="2" fill="white" />
        <rect x="4" y="14" width="2" height="2" fill="white" />
        <rect x="2" y="14" width="2" height="2" fill="white" />
        <rect x="2" y="12" width="2" height="2" fill="white" />
        <rect x="4" y="12" width="2" height="2" fill="white" />
        <rect x="6" y="10" width="2" height="2" fill="white" />
        <rect x="8" y="8" width="2" height="2" fill="white" />
        <rect x="10" y="6" width="2" height="2" fill="white" />
        <rect x="12" y="4" width="2" height="2" fill="white" />
        <rect y="12" width="2" height="2" fill="white" />
        <rect x="12" y="2" width="2" height="2" fill="white" />
        <rect x="14" y="4" width="2" height="2" fill="white" />
        <rect x="16" y="6" width="2" height="2" fill="white" />
        <rect x="14" y="8" width="2" height="2" fill="white" />
        <rect x="12" y="10" width="2" height="2" fill="white" />
        <rect x="10" y="12" width="2" height="2" fill="white" />
        <rect x="8" y="14" width="2" height="2" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_389_7713">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="Profile">
      <div className="Header">
        {avatarDiv()}
        <div className="Text">
          {nameDiv()}
          <div className="Stats">
            <div>
              <div className="Rank">
                <div className="Position" onClick={handleOpenLadder}>
                  <div>Rank #{profile?.rank ?? 0}</div>
                </div>
                <div style={{ paddingRight: "4px" }} className="Ratio">
                  <div>
                    W {profile?.win_count ?? 0} / L {profile?.loose_count ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="ProfileAchievements"
            onClick={() => handleOpenAchievements()}
          >
            <div className="AchievementLink">
              Achievements lvl. {profile?.achievement_lvl}
            </div>
          </div>
        </div>
        {buttons}
      </div>
      <div className="Body">
        <div className="Historic">
          <List>
            <div className="Count">
              {historic?.matchHistory.length === historic?.length
                ? `MATCH HISTORY (${historic?.matchHistory.length}/${historic?.length})`
                : `MATCH HISTORY (${historic?.matchHistory.length}/${historic?.length})`}
            </div>
            {historic?.matchHistory.map((match) => {
              return (
                <MatchRecap
                  key={match.id}
                  bgColor={false}
                  player1={match.player1}
                  player2={match.player2}
                ></MatchRecap>
              );
            })}
            {historic && historic.matchHistory.length !== historic.length ? (
              <div className="Loadmore">
                <Button
                  content="Load More"
                  color="purple"
                  onClick={handleLoadMore}
                />
              </div>
            ) : (
              <div></div>
            )}
          </List>
        </div>
      </div>
      {footer}
    </div>
  );
}

export default Profile;
