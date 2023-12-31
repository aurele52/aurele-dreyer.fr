import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../axios";
import List from "../../shared/ui-components/List/List";
import Channel from "../../shared/ui-components/Channel/Channel";
import { Button } from "../../shared/ui-components/Button/Button";
import { addWindow } from "../../reducers";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import store from "../../store";

export type ChatType = {
  id: number;
  name: string;
  type: string;
  interlocutor: { avatar_url: string; username: string; id: number };
};

export function Chat() {
  const { data: chats } = useQuery<ChatType[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      return api.get("/chats").then((response) => response.data);
    },
  });

  const handleFindChannel = () => {
    const newWindow = {
      WindowName: "Find Channel",
      id: 0,
      content: { type: "FINDCHAN" },
      toggle: false,
      handleBarButton: HBButton.Close,
      color: WinColor.LILAC,
    };
    store.dispatch(addWindow(newWindow));
  };

  const handleCreateChannel = () => {
    const newWindow = {
      WindowName: "New Channel",
      id: 0,
      content: { type: "NEWCHAN" },
      toggle: false,
      handleBarButton: HBButton.Close,
      color: WinColor.LILAC,
    };
    store.dispatch(addWindow(newWindow));
  };

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

  const handleDetails = (chat: ChatType) => {
    if (chat.type === "DM") {
      detailsWindow(true, chat.interlocutor.id, chat.interlocutor.username);
    } else {
      detailsWindow(false, chat.id, chat.name);
    }
  };

  const handleChatOpening = (chatId: number, chatName: string) => {
    const newWindow = {
      WindowName: chatName,
      id: 0,
      content: { type: "CHATSESSION", id: chatId },
      toggle: false,
      handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
      color: WinColor.PURPLE,
    };

    store.dispatch(addWindow(newWindow));
  };

  return (
    <div className="Chat">
      <List>
        {chats?.map((chat) => {
          const name = chat.type === "DM" ? chat.interlocutor.username : chat.name;
          return (
            <div className="chatRow" key={chat.id}>
              <Button
                icon="TripleDot"
                color="pink"
                title="About"
                onClick={() => handleDetails(chat)}
              />
              <Channel
                name={name}
                className={chat.type === "DM" ? chat.type.toLowerCase() : ""}
                image={
                  chat.type === "DM" ? chat.interlocutor.avatar_url : undefined
                }
                clickable={true}
                onClick={() => handleChatOpening(chat.id, name)}
              />
            </div>
          );
        })}
      </List>
      <div className="ChatFooter">
        <Button
          content="find channel"
          color="purple"
          onClick={handleFindChannel}
        />
        <Button
          content="create channel"
          color="purple"
          onClick={handleCreateChannel}
        />
      </div>
    </div>
  );
}

export default Chat;
