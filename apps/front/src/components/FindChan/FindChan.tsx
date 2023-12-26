import "./FindChan.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import List from "../List/List";
import Channel from "../Channel/Channel";
import Button from "../Button/Button";
import { HBButton, WinColor } from "../../utils/WindowTypes";
import { addWindow } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";

interface FindChanProps extends ReduxProps {}

function FindChan({dispatch}: FindChanProps) {
  const queryClient = useQueryClient();

  const { data: channels } = useQuery<
    {
      id: number;
      name: string;
      type: string;
    }[]
  >({
    queryKey: ["channels"],
    queryFn: async () => {
      return axios.get("/api/channels").then((response) => response.data);
    },
  });

  const { mutateAsync: createUserChannel } = useMutation({
    mutationFn: async (param: { channelId: number }) => {
      return axios.post("/api/user-channel", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleAddChannel = async (channelId: number) => {
    await createUserChannel({ channelId });
  };

  const handleDetailsChan = (name: string, id: number) => {
    const newWindow = {
        WindowName: "About" + name,
        width: "453",
        height: "527",
        id: 0,
        content: { type: "ABOUTCHAN", id: id },
        toggle: false,
        handleBarButton: HBButton.Close + HBButton.Enlarge + HBButton.Reduce,
        color: WinColor.PURPLE,
      };
    dispatch(addWindow(newWindow));

  }

  return (
    <div className="FindChan">
      <List dark={false}>
        {channels?.map((channel) => {
          return (
            <div key={channel.id}>
              <Channel name={channel.name} clickable={false}>
                <div className="ButtonFindChan">
                  <Button icon="TripleDot" color="pink" onClick={() => handleDetailsChan(channel.name, channel.id)} />
                  <Button
                    icon="Plus"
                    color="pink"
                    onClick={() => {
                      handleAddChannel(channel.id);
                    }}
                  />
                </div>
              </Channel>
            </div>
          );
        })}
      </List>
    </div>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedFindChat = connector(FindChan);
export default ConnectedFindChat;
