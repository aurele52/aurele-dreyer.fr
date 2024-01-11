import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Button.css";
import { HTMLAttributes, useEffect, useState } from "react";
import api from "../../../axios";
import { ModalType, addModal } from "../../utils/AddModal";
import { HBButton, WinColor } from "../../utils/WindowTypes";
import store from "../../../store";
import { addWindow } from "../../../reducers";
import { IconSVG, IconSVGKey } from "../../utils/svgComponent";

type ButtonProps = {
  color: string;
  icon?: keyof typeof IconSVG;
  content?: string;
  type?: "button" | "submit" | "reset";
  blackContent?: boolean;
  notif?: number;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({
  icon,
  content,
  color,
  className,
  type,
  blackContent,
  notif,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={`${color} ${className || ""} ${
        blackContent ? "Blackcontent" : "Whitecontent"
      } Button`}
    >
      <div className={`ButtonInner ${content && "ButtonText"}`}>
        {icon && IconSVG[icon]}
        {content}
        {notif ? <div className="ButtonNotif"> {notif + " "}</div> : ""}
      </div>
    </button>
  );
}

type HeartButtonProps = {
  userId: number;
  username: string;
} & HTMLAttributes<HTMLButtonElement>;

type FriendshipData = {
  id: number;
  user1_id: number;
  user2_id: number;
  status: "FRIENDS" | "BLOCKED" | "PENDING";
};

export function HeartButton({
  className,
  userId,
  username,
  ...props
}: HeartButtonProps) {
  const queryClient = useQueryClient();

  const { data: friendship } = useQuery<FriendshipData>({
    queryKey: ["friendship", userId],
    queryFn: async () => {
      return api.get("/friendship/" + userId).then((response) => response.data);
    },
  });

  const { mutateAsync: createFriendship } = useMutation({
    mutationFn: async (user2_id: number) => {
      return api.post("/friendship", { user2_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendship", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["addFriendsList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });

  const [friendStatus, setFriendStatus] = useState<IconSVGKey>("EmptyHeart");

  useEffect(() => {
    let status: IconSVGKey = "EmptyHeart";

    if (friendship) {
      if (friendship === undefined) status = "EmptyHeart";
      else if (friendship.status === "FRIENDS") status = "Heart";
      else if (friendship.status === "PENDING") status = "PendingHeart";
      else if (friendship.status === "BLOCKED") status = "Unblock";
    }
    setFriendStatus(status);
  }, [friendship, userId]);

  const isBlocked = () => {
    if (friendship && friendship.status === "BLOCKED") return true;
    return false;
  };

  const isBlockedByMe = () => {
    if (friendship?.user2_id === userId && friendship.status === "BLOCKED")
      return true;
    return false;
  };

  const handleFriendshipBtn = () => {
    if (friendStatus === "Heart") {
      addModal(
        ModalType.WARNING,
        `Are you sure you want to remove ${username} from your friends?`,
        "deleteFriendship",
        userId
      );
    } else if (friendStatus === "PendingHeart") {
      const newWindow = {
        WindowName: "PENDING FRIEND REQUESTS",
        width: "300",
        height: "300",
        id: 0,
        content: { type: "PENDINGREQUESTS" },
        toggle: false,
        handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
        color: WinColor.PURPLE,
      };
      store.dispatch(addWindow(newWindow));
    } else if (friendStatus === "EmptyHeart") {
      createFriendship(userId);
    } else if (friendStatus === "Unblock") {
      addModal(
        ModalType.WARNING,
        `Are you sure you want to unblock ${username}?`,
        "deleteBlockedFriendship",
        userId
      );
    }
  };

  return !isBlocked() || isBlockedByMe() ? (
    <button
      type="button"
      {...props}
      className={`pink ${className || ""} Button`}
      onClick={handleFriendshipBtn}
    >
      <div className={`ButtonInner`}>{IconSVG[friendStatus]}</div>
    </button>
  ) : null;
}

type PendingButtonProps = {
  userId: number;
} & HTMLAttributes<HTMLButtonElement>;

export function PendingButton({
  userId,
  className,
  ...props
}: PendingButtonProps) {
  const queryClient = useQueryClient();

  const { data: friendship } = useQuery<FriendshipData>({
    queryKey: ["friendship", userId],
    queryFn: async () => {
      return api.get("/friendship/" + userId).then((response) => response.data);
    },
  });

  const [requestStatus, setRequestStatus] = useState<IconSVGKey>("EmptyHeart");

  useEffect(() => {
    let status: IconSVGKey = "EmptyHeart";

    if (friendship && friendship.status === "PENDING") {
      if (friendship.user1_id === userId) status = "EmptyHeart";
      else status = "Cross";
    }
    setRequestStatus(status);
  }, [friendship, userId]);

  const { mutateAsync: acceptFriendship } = useMutation({
    mutationFn: async () => {
      return api.patch("/friendship/accept/" + userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friendsList"] });
      queryClient.invalidateQueries({ queryKey: ["addFriendsList"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });

  const { mutateAsync: deletePendingFriendship } = useMutation({
    mutationFn: async () => {
      return api.delete("/relationship/pending/" + userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendship", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["addFriendsList"] });
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });

  const handlePendingBtn = () => {
    if (requestStatus === "EmptyHeart") {
      acceptFriendship();
    } else if (requestStatus === "Cross") {
      deletePendingFriendship();
    }
  };

  const handleRefuseRequest = () => {
    deletePendingFriendship();
  };

  return (
    <>
      <button
        type="button"
        {...props}
        className={`pink ${className || ""} Button`}
        onClick={handlePendingBtn}
      >
        <div className={`ButtonInner`}>{IconSVG[requestStatus]}</div>
      </button>
      {requestStatus === "EmptyHeart" ? (
        <Button color="pink" icon="Cross" onClick={handleRefuseRequest} />
      ) : (
        ""
      )}
    </>
  );
}
