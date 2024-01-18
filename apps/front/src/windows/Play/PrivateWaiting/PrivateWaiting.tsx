import api from "../../../axios";
import { Button } from "../../../shared/ui-components/Button/Button";
import "./PrivateWaiting.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { delWindow } from "../../../reducers";
import store from "../../../store";

interface waitingProps {
  winId: number;
  opponentId: number;
  onPrivateAbort: () => void;
}
export default function PrivateWaiting(props: waitingProps) {
  const { data: opponent } = useQuery<{
    id: number;
    username: string;
    avatar_url: string;
  }>({
    queryKey: ["opponent", props.opponentId],
    queryFn: async () => {
      try {
        const response = await api.get(`/profile/user/${props.opponentId}`)
        return response.data;
      } catch (error) {
        store.dispatch(delWindow(props.winId));
      }
    },

  })

  return (
    <div className="PrivateWaiting">
      Waiting for {opponent?.username} to respond...
      <Button
        type="button"
        color="red"
        content="Cancel request"
        onClick={props.onPrivateAbort}
      />
    </div>
  );
}
