import "./Your2FA.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import { FaSpinner } from "react-icons/fa";

export default function Your2FA() {
  const {
    data,
    error: enable2FAError,
    isLoading: enable2FALoading,
  } = useQuery<string>({
    queryKey: ["QRCode"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get("/auth/2fa/qr-code", { responseType: "blob" })
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
