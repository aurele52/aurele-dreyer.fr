import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import List from "../../../shared/ui-components/List/List";
import "./ChatSession.css";
import api from "../../../axios";
import { Button } from "../../../shared/ui-components/Button/Button";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import store from "../../../store";
import { addWindow } from "../../../reducers";
import { ChatType } from "../Chat";
import Message from "../../../shared/ui-components/Message/Message";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

interface ChatSessionProps {
  channelId?: number;
}

export type MessageData = {
  id: number;
  content: string;
  created_at: Date;
  user: {
    id: number;
    username: string;
    avatar_url: string;
  };
};

function ChatSession({ channelId }: ChatSessionProps) {
  const queryClient = useQueryClient();

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

  const { data: chat } = useQuery<ChatType>({
    queryKey: ["chat", channelId],
    queryFn: async () => {
      return api.get("/chat/" + channelId).then((response) => response.data);
    },
  });

  const { data: messages } = useQuery<MessageData[]>({
    queryKey: ["messages", channelId],
    queryFn: async () => {
      return api
        .get("/messages/" + channelId)
        .then((response) => response.data);
    },
  });

  const [valueMessage, setValueMessage] = useState("");

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: async (param: {
      message: string;
      channel_id: number | undefined;
    }) => {
      return api.post("/message", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });
      setValueMessage("");
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const eventSource = new EventSourcePolyfill("api/stream/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      eventSource.onmessage = ({data}) => {
        if (data.user_id !== selfId)
          queryClient.invalidateQueries({ queryKey: ["messages", channelId] });
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [channelId, queryClient, selfId]);

  const detailsWindow = (isDm: boolean, id: number, name: string) => {
    let newWindow;
    if (!isDm) {
      newWindow = {
        WindowName: "About " + name,
        id: 0,
        content: { type: "ABOUTCHAN", id: id },
        toggle: false,
        handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
        color: WinColor.PURPLE,
      };
    } else {
      newWindow = {
        WindowName: name,
        id: 0,
        content: { type: "PROFILE", id: id },
        toggle: false,
        handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
        color: WinColor.PURPLE,
      };
    }
    store.dispatch(addWindow(newWindow));
  };

  const handleDetails = () => {
    if (chat?.type === "DM") {
      detailsWindow(true, chat?.interlocutor.id, chat.interlocutor.username);
    } else {
      detailsWindow(false, chat?.id || -1, chat?.name || "");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setValueMessage(textarea.value);
    const minHeight = 30;
    textarea.style.height = `${minHeight}px`;
    if (textarea.scrollHeight > textarea.clientHeight) {
      const maxHeight = 100;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  const handleSend = () => {
    sendMessage({ message: valueMessage, channel_id: channelId });
  };

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ChatSession">
      <div className="headerChatSession">
        <Button
          icon="TripleDot"
          color="pink"
          title="About"
          onClick={handleDetails}
        />
        <Button content="Match" color="blue" />
      </div>
      <List ref={listRef}>
        {messages?.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
      </List>
      <div className="footerChatSession">
        <textarea
          className="typeBarChatSession custom-scrollbar white-list"
          value={valueMessage}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        ></textarea>
        <Button color="purple" content="send" onClick={handleSend} />
      </div>
    </div>
  );
}

export default ChatSession;
