import { useQuery } from "@tanstack/react-query";
import api from "../../axios.ts";
import { router } from "../../router.ts";
import axios from "axios";
import { useParams } from "@tanstack/react-router";
import "../bg.css";
import "./TwoFA.css";
import { Button } from "../../shared/ui-components/Button/Button.tsx";

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
        <p className="twofa-title">
          Two factor authentication
          <p>Scan this with the Google Authenticator app!</p>
        </p>
        <img src={data} id="qrcode" />
        <form
          id="twofa-form"
          action={`http://localhost:3000/api/auth/2fa/submit/${id}`}
          method="post"
        >
          <label htmlFor="validation-code">Your code here:</label>
          <input
            type="digit"
            placeholder="6 to 8 digits code"
            id="validation-code"
            name="google-authenticator-code"
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

const handleBackToSignIn = (id: string) => {
  axios.get(`/api/auth/abort/${id}`);
  router.navigate({ to: "/auth" });
};

export default TwoFA;
