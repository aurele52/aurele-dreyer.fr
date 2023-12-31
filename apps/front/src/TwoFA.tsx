import { useQuery } from "@tanstack/react-query";
import api from "./axios";
import { router } from "./router.ts";
import axios from "axios";
import { FormEvent } from "react";
import { useParams } from "@tanstack/react-router";

// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const target = e.target as HTMLFormElement;
//   const formData = Object.fromEntries(new FormData(target));
//   console.log("formData: ", formData);
//   //send code to back
// }

function TwoFA() {
  const { id } = useParams({ strict: false });
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["QRcode"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return api
        .get(`/2fa/generate/${id}`, { responseType: "blob" })
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
      <form className="form-twofa" action={`http://localhost:3000/api/2fa/submit/${id}`} method="post">
        <div className="form-twofa">
          <label htmlFor="validation-code">Double-Authentication Code:</label>
          <input
            type="digit"
            placeholder="6 to 8 digits code"
            id="validation-code"
            name="validation-code"
            required
            minLength={6}
            maxLength={8}
          />
        </div>
      </form>
    </div>
  );
}

export default TwoFA;
