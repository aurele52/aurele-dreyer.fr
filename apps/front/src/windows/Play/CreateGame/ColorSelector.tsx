import * as React from 'react';
import './ColorSelector.css';

interface rangeProps{
	name: string,
	value: string,
	label: string;
	setValue: (name: string, value: number | string) => void;
}

export default function ColorSelector(props: rangeProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, e.target.value);
  };

	return (
		<div className="frame-color-selector"> 
			<div className= "label-color-selector" >{props.label}</div>
			<input className= "box-color-selector" type='color' onChange={handleChange}></input> 
		</div>

  );
}



