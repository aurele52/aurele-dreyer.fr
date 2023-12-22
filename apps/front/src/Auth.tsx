import Button from "./modules/Button";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const handleClick = () => {
  window.location.href =
    "https://api.intra.42.fr/oauth/authorize?client_id=MY_UID&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fauth%2Fcallback&response_type=code";
};

function Auth() {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const error = queryParameters.get("error");
  const error_description = queryParameters.get("error_description");

  return (
    <div>
      {code ? <p>my code is: {code}</p>:<p/>}
      {error? <p>error: {error_description}</p>:<p/>}
      <Button
        content="Sign In with 42Auth"
        color="purple"
        onClick={handleClick}
      />
    </div>
  );
}

export default Auth;
