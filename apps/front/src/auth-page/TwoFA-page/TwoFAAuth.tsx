import { useQuery } from "@tanstack/react-query";
import api from "../../axios.ts";
import { router } from "../../router.ts";
import axios from "axios";
import { useParams } from "@tanstack/react-router";
import "../bg.css";
import "./TwoFAAuth.css";
import { Button } from "../../shared/ui-components/Button/Button.tsx";
import { FormEvent } from "react";

export default function TwoFAAuth() {
  const { id } = useParams({ strict: false });
  return (
    <div className="bg-container bg-image">
      <div className="purple-container">
        <div className="twofa-title">
          Two factor authentication
          <div>Check your Google Authenticator app!</div>
        </div>
        <div id="code2fa-error"></div>
        <form id="twofa-form" onSubmit={(e) => handleSubmit(e, id)}>
          <label htmlFor="validation-code">Your code here:</label>
          <input
            type="number"
            placeholder="6 to 8 digits code"
            id="validation-code"
            name="code"
            required
            minLength={6}
            maxLength={8}
          />
          <Button content="submit" color="pink" type="submit" />
        </form>
        <Button
          content="back to sign in"
          color="red"
          onClick={() => handleBackToSignIn(id)}
        />
      </div>
    </div>
  );
}

const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const code = Object.fromEntries(new FormData(target));
  try {
    const token = await axios
      .post(`/api/auth/2fa/submit/${id}`, code)
      .then((response) => response.data.token);
    router.navigate({ to: `/auth/redirect/${token}` });
  } catch (error) {
    const element = document.getElementById("code2fa-error");
    if (element) {
      element.innerHTML = "Code is incorrect";
    }
  }
};

const handleBackToSignIn = (id: string) => {
  axios.get(`/api/auth/abort/${id}`);
  router.navigate({ to: "/auth" });
};
