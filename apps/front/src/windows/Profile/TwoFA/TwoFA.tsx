import "./TwoFA.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../shared/ui-components/Button/Button";

export default function TwoFA() {
  const {
    data,
    error: enable2FAError,
    isLoading: enable2FALoading,
  } = useQuery<string>({
    queryKey: ["enable2FA"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get("/auth/2fa/enable", { responseType: "blob" })
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

  if (enable2FALoading) {
    return <FaSpinner className="loadingSpinner" />;
  }

  if (enable2FAError) {
    return <div>Error enabling 2FA: {enable2FAError.message}</div>;
  }

  return (   
    <div id="twofa-container">
      <h2>Scan with Google Authenticator app</h2>
      <div>Save it! You will need it to log in next time</div>
      <img src={data} id="qrcode" />
    </div>
  );
}
