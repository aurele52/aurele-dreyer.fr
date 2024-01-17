import * as React from 'react';
import './CheckboxComponent.css'

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
		<div className="frame-checkbox">  
			<div className= "label-checkbox" >{props.label}</div>
			<input type='checkbox' onChange={handleChange}></input>
		</div>

  );
}

