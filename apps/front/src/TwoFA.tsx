import { useQuery } from "@tanstack/react-query";
import api from "./axios";
import { router } from "./router.ts";
import axios from "axios";
import { useParams } from "@tanstack/react-router";

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
    <div>
      <img src={data} />
      <form
        className="form-twofa"
        action={`http://localhost:3000/api/auth/2fa/submit/${id}`}
        method="post"
      >
        <div className="form-twofa">
          <label htmlFor="validation-code">
            Double-Authentication Code:
            <input
              type="digit"
              placeholder="6 to 8 digits code"
              id="validation-code"
              name="google-authenticator-code"
              required
              minLength={6}
              maxLength={8}
            />
          </label>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <button className="return-button" onClick={() => handleBackToSignIn(id)}>
        BACK TO SIGN-IN
      </button>
    </div>
  );
}

const handleBackToSignIn = (id: string) => {
  axios.get(`/api/auth/abort/${id}`);
  router.navigate({ to: "/auth" });
};

export default TwoFA;
