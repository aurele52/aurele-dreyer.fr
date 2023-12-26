import "../FriendsList.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../../../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";

export function PendingRequests() {
  const {
    data: userId,
    isLoading: userIdLoading,
    error: userIdError,
  } = useQuery<number>({
    queryKey: ["userId"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/id");
        return response.data;
      } catch (error) {
        console.error("Error fetching userId:", error);
        throw error;
      }
    },
  });

  const {
    data: pendingRequests,
    isLoading: pendingRequestsLoading,
    error: pendingRequestsError,
  } = useQuery<
    {
      userid: number;
      username: string;
      avatar_url: string;
      online: boolean;
    }[]
  >({
    queryKey: ["pendingRequests", userId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/PendingRequests/pending/${userId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching PendingRequests:", error);
        throw error;
      }
    },
    enabled: !!userId,
  });

  console.log(pendingRequests);

  if (pendingRequestsLoading || userIdLoading) {
    return (
      <div className="PendingRequests">
        <FaSpinner className="loadingSpinner" />
      </div>
    );
  }

  if (pendingRequestsError) {
    return <div>Error loading users: {pendingRequestsError.message}</div>;
  }

  if (userIdError) {
    return <div>Error loading user: {userIdError.message}</div>;
  }

  return (
    <div className="PendingRequests">
      <div className="Body">
        <List>
          {pendingRequests?.map((user, index) => {
            return (
              <div className="PendingRequestsUser" key={index}>
                content
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
