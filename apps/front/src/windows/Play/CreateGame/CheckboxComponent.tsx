import * as React from 'react';

interface checkboxProps{
	name: string,
	value: boolean,
	label: string,
	setValue: (name: string, value: number | string | boolean) => void;
}

export default function CheckboxComponent(props: checkboxProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, e.target.value);
  };

	return (
		<div> 
			<div>{props.label}</div>
			<input type='checkbox' onChange={handleChange}></input>
		</div>

  );
}

