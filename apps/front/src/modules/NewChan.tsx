import "./NewChan.css";
import Button from "./Button";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function NewChan() {
  const queryClient = useQueryClient();

  const [selectedOption, setSelectedOption] = useState("PUBLIC");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const { mutateAsync: createChannel } = useMutation({
    mutationFn: async ( param: Record<string, FormDataEntryValue> ) => {
      return axios.post("/api/channel", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(target));
    console.log(formData);
    await createChannel(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="NewChan">
      <div className="formNewChan">
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Channel Name:</label>
          <input className="inputFormNewChan" placeholder="Type here" name="name"></input>
        </div>
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Topic:</label>
          <input className="inputFormNewChan" placeholder="Type here" name="topic"></input>
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
                  checked={selectedOption === "PUBLIC"}
                  onChange={handleOptionChange}
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
                  checked={selectedOption === "PRIVATE"}
                  onChange={handleOptionChange}
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
                  checked={selectedOption === "PROTECTED"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkFormNewChan"></span>
              </label>
              <p className="descCheckboxNewChan">PASSWORD PROTECTED</p>
            </div>
            <div>
              <div className="passwordNewChan">
                <div className="passwordInputNewChan">
                  <label className="descInputNewChan">CHOOSE PASSWORD:</label>
                  <input
                    className="inputFormNewChan"
                    placeholder="Type here"
                    disabled={selectedOption !== "PROTECTED"}
                  ></input>
                </div>
                <div className="passwordInputNewChan">
                  <label className="descInputNewChan">
                    ENTER SAME PASSWORD:
                  </label>
                  <input
                    className="inputFormNewChan"
                    placeholder="Type here"
                    disabled={selectedOption !== "PROTECTED"}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button content="create" color="purple" type="submit" />
    </form>
  );
}

export default NewChan;
