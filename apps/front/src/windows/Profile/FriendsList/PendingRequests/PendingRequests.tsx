import "./PendingRequests.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axios";
import List from "../../../../shared/ui-components/List/List";
import { PendingButton } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import store from "../../../../store";
import { delWindow } from "../../../../reducers";

interface PendingRequestsProps {
  winId: number;
}

export function PendingRequests({winId}: PendingRequestsProps) {
  const { data: pendingRequests } = useQuery<
    | {
        id: number;
        username: string;
        type: "received" | "sent";
      }[]
    | null
  >({
    queryKey: ["pendingRequests"],
    queryFn: async (): Promise<
      | {
          id: number;
          username: string;
          type: "received" | "sent";
        }[]
      | null
    > => {
      try {
        const response = await api.get(`/friendships/pendingList`);
        if (response.status === 404 || response.data === undefined) return [];
        if (!Array.isArray(response.data)) return null;
        return response.data;
      } catch (error) {
        store.dispatch(delWindow(winId))
      }
    },
  });

  if (!Array.isArray(pendingRequests)) {
    return (
      <div className="PendingRequestsComponent">
        <div className="Body">
          <List dark={false}>
            <div></div>
          </List>
        </div>
      </div>
    );
  }

  return (
    <div className="PendingRequestsComponent">
      <div className="Body">
        <List dark={false}>
          {pendingRequests?.filter((request) => request.type === "received")
            .length ? (
            <div className="SectionName">Received</div>
          ) : (
            ""
          )}

          {pendingRequests
            ?.filter((request) => request.type === "received")
            ?.map((user, key) => (
              <ReducedUser key={key} userId={user.id}>
                <PendingButton userId={user.id} />
              </ReducedUser>
            ))}
          {pendingRequests?.filter((request) => request.type === "sent")
            .length ? (
            <div className="SectionName">Sent</div>
          ) : (
            ""
          )}
          {pendingRequests
            ?.filter((request) => request.type === "sent")
            ?.map((user, key) => (
              <ReducedUser key={key} userId={user.id}>
                <PendingButton userId={user.id} />
              </ReducedUser>
            ))}
        </List>
      </div>
    </div>
  );
}
