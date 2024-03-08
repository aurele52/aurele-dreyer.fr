import { Button } from "../../shared/ui-components/Button/Button";
import api from "../../axios";
import "./list.css"
import { useQuery } from "@tanstack/react-query";
interface listEle {
        eng: string,
        fr: string,
        hint: string,
        level: number,
	id: number,
}

interface ListProps {
	returnToMenu: () => void;
}
export default function List(props: ListProps) {
  const { data: messages, isLoading, error} = useQuery<listEle[]>({
    queryKey: ["word"],
    queryFn: async () => {
      return api
        .get("/wordList/")
        .then((response) => response.data);
    },
  });
	function deleteWord(id: number) {
		api.delete("/word/" + id);
	}

	if (error) return <p>Error fetching data</p>
	if (isLoading) return <p>Fetching data...</p>
	const wordList : listEle[] = [...messages, 
		{
			eng: 'hello',
			fr: 'bonjour',
			hint: 'politesse',
			level: 0,
			id: 9000
		},
	]
	console.log(messages[0].fr);
	return (
		<div className="listPage">
		{wordList.map(i =>
		<div className="row" key={i.id}>
			<div className="listElement">
				<label className="listEng">Eng: {i.eng}</label>
				<label className="listFr">Fr: {i.fr}</label>
				<label className="listHint">Hint: {i.hint}</label>
				<label className="listLevel">Level: {i.level}</label>
			</div>
				<Button
					color="white"
					content="Delete"
					onClick={() => deleteWord(i.id)}
				/>
		</div>
	)
			}
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
