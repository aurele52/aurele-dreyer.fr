import { useQuery } from "@tanstack/react-query";
import { MessageData } from "../../../windows/Chat/ChatSession/ChatSession";
import { formatDate, formatTime } from "../../utils/DateUtils";
import "./Message.css";
import api from "../../../axios";

interface MessageProps {
  message: MessageData;
}

function Message({ message }: MessageProps) {
  const { data: selfId } = useQuery<number>({
    queryKey: ["selfId"],
    queryFn: async () => {
      try {
        const response = await api.get("/id");
        return response.data;
      } catch (error) {
        console.error("Error fetching selfId:", error);
        throw error;
      }
    },
  });

  return (
    <div className="rowMessage">
      {message.user.id === selfId ? (
        <>
          <div className="contentMessage selfMessage">
            <div className="detailsBarMessage">
              <div className="timestampMessage">
                <div className="dateMessage">
                  {formatTime(new Date(message.created_at))}
                </div>
                <div className="dateMessage">
                  {formatDate(new Date(message.created_at))}
                </div>
              </div>
              <div className="nameMessage truncate">
                {message.user.username}
              </div>
            </div>
            <div className="bubbleMessage selfMessage">
              <div className="contentBubbleMessage">
                <div className="textBubbleMessage">{message.content}</div>
              </div>
            </div>
          </div>
          <div className="avatarWrapperMessage">
            <img src={message.user.avatar_url} className="avatarMessage" />
          </div>
        </>
      ) : (
        <>
          <div className="avatarWrapperMessage">
            <img src={message.user.avatar_url} className="avatarMessage" />
          </div>
          <div className="contentMessage">
            <div className="detailsBarMessage">
              <div className="nameMessage truncate">
                {message.user.username}
              </div>
              <div className="timestampMessage">
                <div className="dateMessage">
                  {formatTime(new Date(message.created_at))}
                </div>
                <div className="dateMessage">
                  {formatDate(new Date(message.created_at))}
                </div>
              </div>
              <div className="bubbleMessage">
                <div className="contentBubbleMessage">
                  <div className="textBubbleMessage">{message.content}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Message;
