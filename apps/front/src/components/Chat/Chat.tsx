import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import List from "../List/List";
import Channel from "../Channel/Channel";
import Button from "../Button/Button";
import { addWindow } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { HBButton, WinColor } from "../../utils/WindowTypes";

interface ChatProps extends ReduxProps {}

export function Chat({ dispatch }: ChatProps) {
  const apiUrl = "/api/chats";

  const { data: chats } = useQuery<
    {
      id: number;
      name: string;
      type: string;
      image: string;
      interlocutor: string;
    }[]
  >({
    queryKey: ["chats"],
    queryFn: async () => {
      return axios.get(apiUrl).then((response) => response.data);
    },
  });

  const handleFindChannel = () => {
    const newWindow = {
      WindowName: "Find Channel",
      width: "242",
      height: "390",
      id: 0,
      content: { type: "FINDCHAN" },
      toggle: false,
      modal: true,
      handleBarButton: HBButton.Close,
      color: WinColor.LILAC,
    };
    dispatch(addWindow(newWindow));
  };

  const handleCreateChannel = () => {
    const newWindow = {
      WindowName: "New Channel",
      width: "485",
      height: "362",
      id: 0,
      content: { type: "NEWCHAN" },
      toggle: false,
      modal: true,
      handleBarButton: HBButton.Close,
      color: WinColor.LILAC,
    };
    dispatch(addWindow(newWindow));
  };

  const handleAbout = (isDm: boolean, chatId: number, chatName: string) => {
    if (!isDm) {
      const newWindow = {
        WindowName: "About " + chatName,
        width: "453",
        height: "527",
        id: 0,
        content: { type: "ABOUTCHAN", id: chatId },
        toggle: false,
        modal: false,
        handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
        color: WinColor.PURPLE,
      };
      dispatch(addWindow(newWindow));
    }
  };

  return (
    <div className="Chat">
      <List>
        {chats?.map((chat) => {
          return (
            <div className="chatRow" key={chat.id}>
              <Button
                icon="TripleDot"
                color="pink"
                title="About"
                onClick={() =>
                  handleAbout(chat.type === "DM", chat.id, chat.name)
                }
              />
              <Channel
                name={chat.type === "DM" ? chat.interlocutor : chat.name}
                className={chat.type === "DM" ? chat.type.toLowerCase() : ""}
                image={chat.type === "DM" ? chat.image : undefined}
                clickable={true}
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

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedChat = connector(Chat);
export default ConnectedChat;
