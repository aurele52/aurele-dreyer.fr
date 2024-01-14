import * as React from 'react';

interface rangeProps{
	name: string,
	value: string,
	label: string;
	setValue: (name: string, value: number | string) => void;
}

export default function ColorSelectorComponent(props: rangeProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, e.target.value);
  };

	return (
		<div> 
			<div>{props.label}</div>
			<input type='color' onChange={handleChange}></input>
		</div>

  );
}

