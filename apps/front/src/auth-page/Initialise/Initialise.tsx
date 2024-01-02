import { router } from "../../router";
import { Button } from "../../shared/ui-components/Button/Button";
import "./Initialise.css";
import api from "../../axios";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Initialise() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [usernameValue, setUsernameValue] = useState<string | null>(null);

	const { mutateAsync: uploadAvatar } = useMutation({
		mutationFn: async (formData: FormData) => {
			return api.post("/user/avatar", formData);
		},
		onSuccess: () => {
			const logdiv = document.getElementById("InitialiseAvatarUpload");
			if (logdiv) logdiv.innerHTML = "Avatar successfully uploaded !";
			setSelectedFile(null);
			return true;
		},
		onError: (error) => {
			const logdiv = document.getElementById("avatarLogDiv");
			if (logdiv) logdiv.innerText = error.message;
			return false;
		},
	});

	const { mutateAsync: setUsername } = useMutation({
		mutationFn: async (username: string) => {
			return api.post("/user/username/" + username);
		},
		onSuccess: () => {
			const logdiv = document.getElementById("InitialiseUsername");
			if (logdiv) logdiv.innerHTML = "Username successfully setted !";
			setUsernameValue(null);
		},
		onError: (error) => {
			const logdiv = document.getElementById("usernameLogDiv");
			if (logdiv) logdiv.innerText = error.message;
		},
	});

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setSelectedFile(file || null);
	};

	const handleContinue = () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append("avatar", selectedFile);
			uploadAvatar(formData).then((res) => {
				if (!res) return;
			});
		}

		if (usernameValue) {
			setUsername(usernameValue).then((res) => {
				if (!res) return;
			});
		}

		router.navigate({ to: "/home" });
	};

	const button_label = () => {
		if (!localStorage.getItem("token")) {
			return "Sign in with 42";
		} else {
			return "Back to main page";
		}
	};

	const avatarDiv = (
		<div className="AvatarUpload" id="InitialiseAvatarUpload">
			<label className="Label" htmlFor="fileInput">
				Upload your new Avatar:
			</label>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			{selectedFile ? (
				<img
					className="Avatar"
					src={URL.createObjectURL(selectedFile)}
				/>
			) : (
				""
			)}
			<div id="avatarLogDiv"></div>
		</div>
	);

	const usernameDiv = (
		<div className="UsernameSet" id="InitialiseUsername">
			<div className="Placeholder">
				<input
					value={usernameValue ? usernameValue : ""}
					onChange={(e) => setUsernameValue(e.target.value)}
				/>
			</div>
			<div id="usernameLogDiv"></div>
		</div>
	);

	return (
		<div className="bg-container">
			<div className="purple-container">
				{avatarDiv}
				{usernameDiv}
				<Button
					content="continue"
					color="pink"
					onClick={handleContinue}
				/>
			</div>
		</div>
	);
}
