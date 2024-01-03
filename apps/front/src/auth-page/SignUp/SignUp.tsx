import { router } from "../../router";
import { Button } from "../../shared/ui-components/Button/Button";
import "./SignUp.css";
import api from "../../axios";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Initialise() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [usernameValue, setUsernameValue] = useState<string | null>(null);

	const queryParameters = new URLSearchParams(window.location.search);
	const id = queryParameters.get("id");

	const { mutateAsync: postForm } = useMutation({
		mutationFn: async () => {
			const formData = new FormData();
			formData.append("username", usernameValue || "");
			formData.append("avatar", selectedFile || "");

			return api.post(`/auth/sign-up?id=${id}`, formData);
		},
		onSuccess: () => {
			window.location.href = `/api/auth/redirect-to-home?id=${id}`;
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
		postForm();
	};

	const handleReturn = () => {
		router.navigate({ to: "/auth" });
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
				<Button content="return" color="red" onClick={handleReturn} />
			</div>
		</div>
	);
}
