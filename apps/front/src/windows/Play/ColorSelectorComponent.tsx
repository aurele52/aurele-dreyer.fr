import * as React from 'react';

interface rangeProps{
	value: string,
	label: string;
	setValue: (Value: string) => void;
}

export default function ColorSelectorComponent(props: rangeProps) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setValue(e.target.value);
  };

	return (
		<div> 
			<div>{props.label}</div>
					<div>
						<select onChange={(e) => handleChange(e)}>
							<option value='white'>white</option>
							<option value='red'>red</option>
							<option value='blue'>blue</option>
							<option value='purple'>purple</option>
							<option value='yellow'>yellow</option>
							<option value='grey'>grey</option>
							<option value='pink'>pink</option>
							<option value='orange'>orange</option>
							<option value='black'>black</option>
							<option value='brown'>brown</option>
							<option value='lime'>lime</option>
							<option value='green'>green</option>
						</select>
					</div>
		</div>

  );
}

