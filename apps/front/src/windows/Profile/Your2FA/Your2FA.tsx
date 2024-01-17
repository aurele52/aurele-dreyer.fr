import "./Your2FA.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import { FaSpinner } from "react-icons/fa";
import store from "../../../store";
import { delWindow } from "../../../reducers";

interface Your2FAProps {
  winId: number;

}

export default function Your2FA({winId}: Your2FAProps) {
  const {
    data,
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
          store.dispatch(delWindow(winId))
          return null;
        });
    },
  });

  if (enable2FALoading) {
    return <FaSpinner className="loadingSpinner" />;
  }

  return (
    <div id="twofa-container">
      <h2>Scan with Google Authenticator app</h2>
      <div>Save it! You will need it to log in next time</div>
      <img src={data} id="qrcode" />
    </div>
  );
}
