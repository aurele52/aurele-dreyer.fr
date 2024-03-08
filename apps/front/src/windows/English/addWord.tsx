import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../axios";
import { Button } from "../../shared/ui-components/Button/Button";
import "./AddWord.css"

interface listEle {
        eng: string,
        fr: string,
        hint: string,
        level: number,
}

interface AddWordProps {
	returnToMenu: () => void;
}
export default function AddWord(props: AddWordProps) {
  const queryClient = useQueryClient();
  const [valueWord, setValueWord] = useState({eng: "", fr: "", hint: "", level: 0});

	const setValue = (name: string, value: number | string) => {
		setValueWord((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
  const { mutateAsync: sendWord } = useMutation({
    mutationFn: async (param: {
      word: listEle;
    }) => {
      return api.post("/word", param);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["word"],
      });
      setValueWord({eng: "", fr: "", hint: "", level: 0});
    },
  });
  const handleSend = () => {
    sendWord({ word: valueWord});
  };

  return (
		<div className="addWord">
			<div>
				<label>Eng :</label>
				<input
					className="input-eng"
					type="text"
					value={valueWord.eng}
					onChange={(e) => setValue("eng", e.target.value)}
				></input>
			</div>
			<div>
				<label>Fr :</label>
				<input
					className="input-fr"
					type="text"
					value={valueWord.fr}
					onChange={(e) => setValue("fr", e.target.value)}
				></input>
			</div>
			<div>
				<label>Hint :</label>
				<input
					className="input-hint"
					type="text"
					value={valueWord.hint}
					onChange={(e) => setValue("hint", e.target.value)}
				></input>
			</div>
			<Button color="purple" content="send" onClick={handleSend} />
			<div className="footer-list">
				<Button
					color="red"
					content="GO BACK"
					onClick={props.returnToMenu}
				/>
			</div>
		</div>
	);
}
