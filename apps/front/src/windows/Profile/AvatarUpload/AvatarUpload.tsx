import "./AvatarUpload.css";
import api from "../../../axios";
import { useState, ChangeEvent } from "react";
import store from "../../../store";
import { delWindow } from "../../../reducers";
import { Button } from "../../../shared/ui-components/Button/Button";
import { ModalType, addModal } from "../../../shared/utils/AddModal";

interface AvatarUploadProps {
	winId: number;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ winId }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setSelectedFile(file || null);
	};

	const handleUpload = async () => {
		try {
			if (selectedFile) {
				const formData = new FormData();
				formData.append("avatar", selectedFile);

				await api.post("/profile/avatar", formData);

				//onClose();
			} else {
				addModal(ModalType.ERROR, "No file selected");
			}
		} catch (error) {
			addModal(ModalType.ERROR, "Error uploading file");
		}
	};

	const handleClose = (winId: number) => {
		store.dispatch(delWindow(winId));
	};

	return (
		<div className="AvatarUploadComponent">
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<Button
				content="Upload"
				color="purple"
				onClick={() => handleUpload()}
			/>
			<Button
				content="Cancel"
				color="red"
				onClick={() => handleClose(winId)}
			/>
		</div>
	);
};

export default AvatarUpload;
