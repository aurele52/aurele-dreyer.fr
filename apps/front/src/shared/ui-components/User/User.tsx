import "./User.css";
import "./ReducedUser.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import { FaSpinner } from "react-icons/fa";
import {
	Button,
	HeartButton,
} from "../../../shared/ui-components/Button/Button";
import { addWindow } from "../../../reducers";
import { WinColor } from "../../../shared/utils/WindowTypes";
import store from "../../../store";
import { ReactNode } from "react";

export type UserRole = "MEMBER" | "ADMIN" | "OWNER";

interface UserProps {
	userId: number;
	channel?: {
		channelId: number;
		userRole: UserRole;
	};
}

export function User({ userId, channel }: UserProps) {
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
    const name = selfId === id ? "Profile" : username;
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

  /*
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
*/

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
			/*onClick={() => handleOpenChat(userId, user.username)}*/
		/>
	);
	const matchButton = (
		<Button
			content="Match"
			color="blue"
			/*onClick={() => handleMatch(userId, user.username)}*/
		/>
	);

	const channelSettingsButton = channel ? (
		<Button icon="Unblock" color="darkYellow" />
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
						<HeartButton
							userId={user.id}
							username={user.username}
						/>
					</div>
				</div>
			);
		}
	};

	const crownSvg = (
		<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect y="3" width="2" height="2" fill="#D3C43D" />
			<rect y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="3" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="9" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="11" width="2" height="2" fill="#D3C43D" />
			<rect x="16" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="13" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="7" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="5" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="3" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="5" width="2" height="2" fill="#D3C43D" />
			<rect y="7" width="2" height="2" fill="#D3C43D" />
			<rect y="9" width="2" height="2" fill="#D3C43D" />
			<rect y="11" width="2" height="2" fill="#D3C43D" />
			<rect y="13" width="2" height="2" fill="#D3C43D" />
		</svg>
	);

	const starSvg = (
		<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="6" y="4" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="4" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="4" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="6" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="8" width="2" height="2" fill="#D3C43D" />
			<rect x="12" y="10" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="12" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="12" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="12" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="10" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="8" width="2" height="2" fill="#D3C43D" />
			<rect x="2" y="8" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="2" width="2" height="2" fill="#D3C43D" />
			<rect x="14" y="8" width="2" height="2" fill="#D3C43D" />
			<rect x="8" y="14" width="2" height="2" fill="#D3C43D" />
			<rect x="4" y="6" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="6" width="2" height="2" fill="#D3C43D" />
			<rect x="6" y="10" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="10" width="2" height="2" fill="#D3C43D" />
			<rect x="10" y="6" width="2" height="2" fill="#D3C43D" />
		</svg>
	);

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
						{channel ? (
							<div className="Icon">
								{(() => {
									switch (channel.userRole) {
										case "ADMIN":
											return crownSvg;
										case "OWNER":
											return starSvg;
										default:
											return null; // You can handle other cases if needed
									}
								})()}
							</div>
						) : (
							<div></div>
						)}
						<div className="Name">
							<div>{user.username}</div>
						</div>
						{status}
					</div>
					{selfId !== user.id ? buttons() : ""}
				</div>
			</div>
			{channelSettingsButton}
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
							<div className="Name">Unexisting User</div>
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
						<div className="Name">{user.username}</div>
					</div>
					{children ?? children}
				</div>
			</div>
		</div>
	);
}
