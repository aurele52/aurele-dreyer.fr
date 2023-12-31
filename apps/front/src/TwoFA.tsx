import { useQuery } from "@tanstack/react-query";
import api from "./axios";
import axios from "axios";

function TwoFA() {
  const user_id = 3;
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["QRcode"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get(`/2fa/generate/${user_id}`, { responseType: "blob" })
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
      <div>
        <label>Double-Authentication Code:</label>
        <input
          type="number"
          id="validation-code"
          name="validation-code"
          required
          minlength="6"
          maxlength="8"
        />
      </div>
    </div>
  );
}

//api.post("2fa/turn-on", {body { code: lecode}})

export default TwoFA;
