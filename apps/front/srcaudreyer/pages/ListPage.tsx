import "../css/ListPage.css";
interface word{
	fr:string,
	eng:string,
	hint:string,
	level:number
}
interface listProps{
	wordList: word[]
}
export default function List({wordList}:listProps) {
		const wl = wordList.map(i=> <div className="row"><div className="listElement"><label className="listEng">Eng: {i.eng}</label> <label className="listFr">Fr: {i.fr}</label> <label className="listHint">Hint: {i.hint}</label> <label className="listLevel">Level: {i.level}</label> </div> <button className='modifieButton'>modifie</button></div>);
			return (
				<div className="listPage">
					{wl}
				</div>
			);
}
