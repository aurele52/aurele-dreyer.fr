import "./MemberSettings.css";
import api from "../../../../axios";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import { MemberSettingsBody } from "./MemberSettingsBody";
import { MemberSettingsHeader } from "./MemberSettingsHeader";
import { IconSVG } from "../../../../shared/utils/svgComponent";

interface MemberSettingsProps {
	targetId: number;
	channelId: number;
}

export function MemberSettings({ targetId, channelId }: MemberSettingsProps) {
	const {
		data: data,
		isLoading: dataLoading,
		error: dataError,
	} = useQuery<{
		member: {
			id: number;
			username: string;
			avatar_url: string;
			role: "OWNER" | "ADMIN" | "MEMBER";
			isMuted: boolean;
			isBanned: boolean;
			mutedUntil: Date;
			bannedUntil: Date;
		};
		selfMember: {
			id: number;
			userId: number;
			role: "OWNER" | "ADMIN" | "MEMBER";
		};
	}>({
		queryKey: ["memberSettings", channelId, targetId],
		queryFn: async () => {
			try {
				const responseMember = await api.get(
					`/user-channel/${channelId}/${targetId}`
				);
				const responseSelfMember = await api.get(
					`/user-channel/${channelId}/current-user`
				);
				return {
					member: responseMember.data,
					selfMember: responseSelfMember.data,
				};
			} catch (error) {
				console.error("Error fetching user:", error);
				throw error;
			}
		},
	});

	if (dataLoading) {
		return (
			<div className="Ladder">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (dataError || !data) {
		return (
			<div>
				Error loading member:{" "}
				{dataError ? dataError.message : "data is empty"}
			</div>
		);
	}

	const superiorUserDiv = (
		<div className="MemberSettings">
			<div className="MemberSettingsHeader">
				<div className="Avatar">
					<img src={data?.member?.avatar_url} className="Frame" />
				</div>
				<div className="Username">
					<div className="Text">{data?.member?.username}</div>

					{data?.member?.role === "ADMIN" ? (
						<div className="Role">
							<div className="Star">{IconSVG["Star"]}</div>
							<div className="Title">Admin</div>
						</div>
					) : (
						<div className="Role">
							<div className="Crown">{IconSVG["Crown"]}</div>
							<div className="Title">Owner</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	if (
		(data.selfMember.role !== "OWNER" && data.member.role !== "MEMBER") ||
		targetId === data.selfMember.userId
	)
		return superiorUserDiv;
	else {
		return (
			<div className="MemberSettings">
				<MemberSettingsHeader
					user={{
						id: targetId,
						username: data.member.username,
						avatarUrl: data.member.avatar_url,
						isAdmin: data.member.role === "ADMIN",
					}}
					isSelfOwner={data.selfMember.role === "OWNER"}
					channelId={channelId}
				/>

				<MemberSettingsBody
					user={{
						id: targetId,
						username: data.member.username,
						isMuted: data.member.isMuted,
						mutedUntil: data.member.mutedUntil,
					}}
					channelId={channelId}
				/>
			</div>
		);
	}
}
