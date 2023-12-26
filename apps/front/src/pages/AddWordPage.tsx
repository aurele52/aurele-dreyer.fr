import React from "react";
export default class AddWord extends React.Component {
	render() {
			return (
				<div className="addWordPage">
					<label>Eng:</label>
					<input type="text"></input>
					<label>Fr:</label>
					<input type="text"></input>
					<label>Hint:</label>
					<input type="text"></input>
					<button>submit</button>
					<button>cancel</button>
				</div>
			);
		}
};
