import api from "../../../../axios";
import store from "../../../../store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../../shared/ui-components/Button/Button";
import { useState } from "react";
import { delWindow } from "../../../../reducers";

interface MemberSettingsBodyProps {
	user: {
		id: number;
		isMuted: boolean;
		isBanned: boolean;
		mutedUntil: Date;
		bannedUntil: Date;
	};
	channelId: number;
	winId: number;
}

export function MemberSettingsBody({
	user,
	channelId,
	winId,
}: MemberSettingsBodyProps) {
	const queryClient = useQueryClient();

	const [muteTime, setMuteTime] = useState("");
	const [muteTimeUnit, setMuteTimeUnit] = useState("sec");

	const [banTime, setBanTime] = useState("");
	const [banTimeUnit, setBanTimeUnit] = useState("sec");

	const { mutateAsync: muteUser } = useMutation({
		mutationFn: async (endDate: Date) => {
			return api.post("/user-channel/moderate/mute", {
				data: { targetId: user.id, channelId, endDate },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["memberSettings", user.id, channelId],
			});
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
		},
	});

	const { mutateAsync: unmuteUser } = useMutation({
		mutationFn: async () => {
			return api.patch("/user-channel/moderate/unmute", {
				data: { targetId: user.id, channelId },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["memberSettings", user.id, channelId],
			});
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
		},
	});

	const { mutateAsync: banUser } = useMutation({
		mutationFn: async (endDate: Date) => {
			return api.post("/user-channel/moderate/ban", {
				data: { targetId: user.id, channelId, endDate },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["memberSettings", user.id, channelId],
			});
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
		},
	});

	const { mutateAsync: unbanUser } = useMutation({
		mutationFn: async () => {
			return api.patch("/user-channel/moderate/unban", {
				data: { targetId: user.id, channelId },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["memberSettings", user.id, channelId],
			});
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
		},
	});

	const { mutateAsync: kickUser } = useMutation({
		mutationFn: async () => {
			return api.post("/user-channel/moderate/kick", {
				data: { targetId: user.id, channelId },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["memberSettings", user.id, channelId],
			});
			queryClient.invalidateQueries({
				queryKey: ["chanAbout", channelId],
			});
			store.dispatch(delWindow(winId));
		},
	});

	const handleMute = () => {
		let muteTimeInSeconds;
		if (!muteTime || parseInt(muteTime, 10) === 0) {
			muteTimeInSeconds = 42 * 365 * 24 * 60 * 60;
		} else {
			switch (muteTimeUnit) {
				case "min":
					muteTimeInSeconds = parseInt(muteTime, 10) * 60;
					break;
				case "hour":
					muteTimeInSeconds = parseInt(muteTime, 10) * 60 * 60;
					break;
				case "day":
					muteTimeInSeconds = parseInt(muteTime, 10) * 60 * 60 * 24;
					break;
				default:
					muteTimeInSeconds = parseInt(muteTime, 10);
			}
		}

		const currentDate = new Date();
		const endDate = new Date(
			currentDate.getTime() + muteTimeInSeconds * 1000
		);
		muteUser(endDate);
	};

	const handleUnmute = () => {
		unmuteUser();
	};

	const handleBan = () => {
		let banTimeInSeconds;
		if (!banTime || parseInt(banTime, 10) === 0) {
			banTimeInSeconds = 42 * 365 * 24 * 60 * 60;
		} else {
			switch (banTimeUnit) {
				case "min":
					banTimeInSeconds = parseInt(banTime, 10) * 60;
					break;
				case "hour":
					banTimeInSeconds = parseInt(banTime, 10) * 60 * 60;
					break;
				case "day":
					banTimeInSeconds = parseInt(banTime, 10) * 60 * 60 * 24;
					break;
				default:
					banTimeInSeconds = parseInt(banTime, 10);
			}
		}
		const currentDate = new Date();
		const endDate = new Date(
			currentDate.getTime() + banTimeInSeconds * 1000
		);
		banUser(endDate);
	};

	const handleUnban = () => {
		unbanUser();
	};

	const handleKick = () => {
		kickUser();
	};

	const muteDiv = (
		<div className="Mute">
			{user.isMuted ? (
				<div className="Button" onClick={handleUnmute}>
					<div className="Frame">
						<div className="Label">Unmute</div>
					</div>
				</div>
			) : (
				<div className="Button" onClick={handleMute}>
					<div className="Frame">
						<div className="Label">Mute</div>
					</div>
				</div>
			)}
			{user.isMuted ? (
				<div className="Date">
					Muted until:{" "}
					{new Date(user.mutedUntil).toLocaleString("en-GB")}
				</div>
			) : (
				<div className="Typebar">
					<input
						className="Placeholder"
						onChange={(e) => setMuteTime(e.target.value)}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								handleMute;
							}
						}}
					/>
					<select
						className="Timeunit"
						name="muteTimeUnit"
						value={muteTimeUnit}
						onChange={(e) => setMuteTimeUnit(e.target.value)}
					>
						<option value="sec">sec</option>
						<option value="min">min</option>
						<option value="hour">hour</option>
						<option value="day">day</option>
					</select>
				</div>
			)}
		</div>
	);

	const banDiv = (
		<div className="Ban">
			{user.isBanned ? (
				<div className="Button" onClick={handleUnban}>
					<div className="Frame">
						<div className="Label">Unban</div>
					</div>
				</div>
			) : (
				<div className="Button" onClick={handleBan}>
					<div className="Frame">
						<div className="Label">Ban</div>
					</div>
				</div>
			)}
			{user.isBanned ? (
				<div className="Date">
					Banned until:{" "}
					{user.bannedUntil
						? new Date(user.bannedUntil).toLocaleString("en-GB")
						: "unknown"}
				</div>
			) : (
				<div className="Typebar">
					<input
						className="Placeholder"
						onChange={(e) => setBanTime(e.target.value)}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								handleBan;
							}
						}}
					/>
					<select
						className="Timeunit"
						name="banTimeUnit"
						value={banTimeUnit}
						onChange={(e) => setBanTimeUnit(e.target.value)}
					>
						<option value="sec">sec</option>
						<option value="min">min</option>
						<option value="hour">hour</option>
						<option value="day">day</option>
					</select>
				</div>
			)}
		</div>
	);

	const kickDiv = (
		<div className="Kick">
			<div className="Button" onClick={handleKick}>
				<div className="Frame">
					<div className="Label">Kick</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="MemberSettingsBody">
			<div className="Frame">
				{user.isBanned ? <div></div> : muteDiv}
				{banDiv}
				{kickDiv}
			</div>
			<div className="Srollbar">
				<div className="Background">
					<div className="Cursor"></div>
				</div>
			</div>
		</div>
	);
}
