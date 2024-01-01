import { useQuery } from "@tanstack/react-query";
import api from "../../axios.ts";
import { router } from "../../router.ts";
import axios from "axios";
import { useParams } from "@tanstack/react-router";
import "../bg.css";
import "./TwoFA.css";
import { Button } from "../../shared/ui-components/Button/Button.tsx";
import { FormEvent } from "react";

function TwoFA() {
  const { id } = useParams({ strict: false });
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["QRcode"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get(`/auth/2fa/generate/${id}`, { responseType: "blob" })
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          return imageUrl;
        })
        .catch((error) => {
          console.log("error", error);
          return error;
        });
    },
  });

  return (
    <div className="bg-container">
      <div className="purple-container">
        <div className="twofa-title">
          Two factor authentication
          <div>Scan this with the Google Authenticator app!</div>
        </div>
        <img src={data} id="qrcode" />
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

export default TwoFA;
