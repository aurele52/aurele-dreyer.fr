import { router } from "../../router.ts";
import { AxiosError } from "axios";
import { useParams } from "@tanstack/react-router";
import "./Auth2FA.css";
import { Button } from "../../shared/ui-components/Button/Button.tsx";
import { FormEvent } from "react";
import { Input } from "../../shared/ui-components/Input/Input.tsx";
import { useMutation } from "@tanstack/react-query";
import api from "../../axios.ts";

interface ValidationErrorResponse {
	[key: string]: string[];
}

export default function Auth2FA() {
	const { id } = useParams({ strict: false });

	const { mutate: postForm, error } = useMutation({
		mutationFn: (code: string) => {
			return api
				.post(`/auth/2fa/submit?jwt_id=${id}`, {
					code,
				})
				.then((response) => response.data.token)
				.catch((error: AxiosError) => {
					if (error.response?.status === 400)
						throw error.response?.data as ValidationErrorResponse;
					else
						throw {
							code: [
								(error.response?.data as { message: string })
									.message,
							],
						};
				});
		},
		onSuccess: (token: string) => {
			router.navigate({ to: "/redirect/$token", params: { token } });
		},
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const formData = Object.fromEntries(new FormData(target));
		postForm(formData.code as string);
	};

	const handleBackToSignIn = () => {
		router.navigate({ to: "/auth" });
	};

	return (
		<>
			<div className="twofa-title">
				Two factor authentication
				<div>Check your Google Authenticator app!</div>
			</div>
			{/* <div id="code2fa-error"></div> */}
			<form id="twofa-form" onSubmit={handleSubmit}>
				<Input
					label="Enter your code:"
					errors={(error as any)?.code}
					type="number"
					placeholder="6 to 8 digits code"
					id="validation-code"
					name="code"
					required
					minLength={6}
					maxLength={8}
				></Input>
				<Button content="submit" color="pink" type="submit" />
			</form>
			<div className="rightside-button">
				<Button
					content="back to sign in"
					color="red"
					onClick={() => handleBackToSignIn()}
				/>
			</div>
		</>
	);
}
