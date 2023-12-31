import { Button } from "../../../../shared/ui-components/Button/Button";
import { ModalType, addModal } from "../../../../shared/utils/AddModal";

interface MemberSettingsHeaderProps {
	user: {
		id: number;
		username: string;
		avatarUrl: string;
		isAdmin: boolean;
	};
	isSelfOwner: boolean;
	channelId: number;
}

export function MemberSettingsHeader({
	user,
	isSelfOwner,
	channelId,
}: MemberSettingsHeaderProps) {
	const handleMakeAdmin = async () => {
		addModal(
			ModalType.WARNING,
			`Are you sure you want to make ${user.username} admin?`,
			"makeAdmin",
			user.id,
			channelId
		);
	};

	const handleDemoteAdmin = async () => {
		addModal(
			ModalType.WARNING,
			`Are you sure you want to demote ${user.username} from admin?`,
			"demoteAdmin",
			user.id,
			channelId
		);
	};

	const handleMakeOwner = async () => {
		addModal(
			ModalType.WARNING,
			`Are you sure you want to make ${user.username} the owner?`,
			"makeOwner",
			user.id,
			channelId
		);
	};

	const buttonsDiv = (
		<div className="Buttons">
			{user.isAdmin ? (
				<Button
					content="Demote Admin"
					color="red"
					blackContent={true}
					onClick={handleDemoteAdmin}
				/>
			) : (
				<Button
					content="Make Admin"
					color="lightYellow"
					blackContent={true}
					onClick={handleMakeAdmin}
				/>
			)}
			{isSelfOwner ? (
				<Button
					content="Make Owner"
					color="lightYellow"
					blackContent={true}
					onClick={handleMakeOwner}
				/>
			) : (
				<div></div>
			)}
		</div>
	);
	return (
		<div className="MemberSettingsHeader">
			<div className="Avatar">
				<img src={user.avatarUrl} className="Frame" />
			</div>
			<div className="Username">
				<div className="Text">{user.username}</div>
			</div>
			{buttonsDiv}
		</div>
	);
}
