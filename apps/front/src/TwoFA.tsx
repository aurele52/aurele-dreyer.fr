import { useQuery } from "@tanstack/react-query";
import api from "./axios";

function TwoFA() {
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["QRcode"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get("/2fa/generate", { responseType: "blob" })
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
    </div>
  );
}

//api.post("2fa/turn-on", {body { code: lecode}})

export default TwoFA;
