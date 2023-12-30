import "./ChannelSettings.css";
import { useState, FormEvent, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import api from "../../../../axios";
import { Button } from "../../../../shared/ui-components/Button/Button";

interface ValidationErrorResponse {
  [key: string]: string[];
}

interface ChannelSettingsProps {
  channelId?: number;
}

type ChannelData = {
  id: number;
  name: string;
  type: string;
  topic: string;
  password: string;
};

function ChannelSettings({ channelId }: ChannelSettingsProps) {
  const queryClient = useQueryClient();

  const { data: channel } = useQuery<ChannelData>({
    queryKey: ["channelSettings", channelId],
    queryFn: async () => {
      return api.get("/channel/" + channelId).then((response) => response.data);
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    type: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (channel) {
      setFormData({
        name: channel.name,
        topic: channel.topic,
        type: channel.type,
        password: channel.password || "",
        passwordConfirmation: "",
      });
    }
  }, [channel]);

  const { mutateAsync: updateChannel, error } = useMutation<
    AxiosResponse,
    AxiosError<ValidationErrorResponse>,
    Record<string, FormDataEntryValue>
  >({
    mutationFn: async (param) => {
      return api.put("/channel/" + channelId, param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chanAbout", channelId] });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateChannel({...formData});

  };

  const dataError = error?.response?.data;

  return (
    <form onSubmit={handleSubmit} className="ChanSettings">
      <div className="formNewChan custom-scrollbar lilac-list">
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Channel Name:</label>
          <div className="inputErrFormNewChan">
            <input
              className={`inputFormNewChan ${
                dataError?.name ? "errorBorderFormNewChan" : ""
              }`}
              placeholder="Type here"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            ></input>
            {dataError?.name ? (
              <p className="errorFormNewChan">{dataError["name"]}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Topic:</label>
          <div className="inputErrFormNewChan">
            <input
              className={`inputFormNewChan ${
                dataError?.topic ? "errorBorderFormNewChan" : ""
              }`}
              placeholder="Type here"
              name="topic"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            ></input>
            {dataError?.topic ? (
              <p className="errorFormNewChan">{dataError["topic"]}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="elFormNewChan typeFormNewChan">
          <label className="labelFormNewChan">Type:</label>
          <div className="listCheckboxFormNewChan">
            <div className="elFormNewChan">
              <label className="labelCheckboxNewChan">
                <input
                  type="radio"
                  value="PUBLIC"
                  name="type"
                  checked={formData.type === "PUBLIC"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
                <span className="checkmarkFormNewChan"></span>
              </label>
              <p className="descCheckboxNewChan">PUBLIC</p>
            </div>
            <div className="elFormNewChan">
              <label className="labelCheckboxNewChan">
                <input
                  type="radio"
                  value="PRIVATE"
                  name="type"
                  checked={formData.type === "PRIVATE"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
                <span className="checkmarkFormNewChan"></span>
              </label>
              <p className="descCheckboxNewChan">PRIVATE</p>
            </div>
            <div className="elFormNewChan">
              <label className="labelCheckboxNewChan">
                <input
                  type="radio"
                  value="PROTECTED"
                  name="type"
                  checked={formData.type === "PROTECTED"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
                <span className="checkmarkFormNewChan"></span>
              </label>
              <div className="pwdProtectedNewChan">
                <p className="descCheckboxNewChan">PASSWORD PROTECTED</p>
                <div
                  className={`passwordNewChan ${
                    formData.type !== "PROTECTED" ? "passwordHidden" : ""
                  }`}
                >
                  <div className="passwordInputNewChan">
                    <label className="descInputNewChan">CHOOSE PASSWORD:</label>
                    <div className="inputErrFormNewChan">
                      <input
                        className={`inputFormNewChan ${
                          dataError?.password ? "errorBorderFormNewChan" : ""
                        }`}
                        placeholder="Type here"
                        name="password"
                      ></input>
                      {dataError?.password ? (
                        <p className="errorFormNewChan">
                          {dataError["password"]}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="passwordInputNewChan">
                    <label className="descInputNewChan">
                      ENTER SAME PASSWORD:
                    </label>

                    <div className="inputErrFormNewChan">
                      <input
                        className={`inputFormNewChan ${
                          dataError?.passwordConfirmation
                            ? "errorBorderFormNewChan"
                            : ""
                        }`}
                        placeholder="Type here"
                        name="passwordConfirmation"
                      ></input>
                      {dataError?.passwordConfirmation ? (
                        <p className="errorFormNewChan">
                          {dataError["passwordConfirmation"]}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {dataError?.type ? (
              <p className="errorFormNewChan">{dataError["type"]}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Button content="save" color="purple" type="submit" />
    </form>
  );
}

export default ChannelSettings;
