import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import './RangeSlider.css';

const CustomSlider = {
    '& .MuiSlider-thumb': {
        color: "#F3ACD4"
    },
    '& .MuiSlider-track': {
        color: "#49317B"
    },
    '& .MuiSlider-rail': {
        color: "#49317B"
    },
    '& .MuiSlider-active': {
        color: "#49317B"
    }
	,
    '& .MuiSlider-mark': {
        color: "#49317B"
    }
};

interface rangeProps{
	name: string,
	min: number,
	max: number,
	step: number,
	value: number,
	label: string;
	setValue: (Name: string, Value: number) => void;
}

export default function RangeComponent(props: rangeProps) {

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    props.setValue(props.name, newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, event.target.value === '' ? props.min : Number(event.target.value));
  };

  const handleBlur = () => {
	props.setValue(props.name, props.value - props.value % props.step);
    if (props.value < props.min) {
      props.setValue(props.name, 0);
    } else if (props.value > props.max) {
      props.setValue(props.name, 100);
    }
  };

	return (
		<div className="frame-rangeslider">  
			<div className= "label-rangeslider" >{props.label}</div>
			<Box>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						sx={CustomSlider}
						className="rangeslider"
						value={typeof props.value === 'number' ? props.value : 0}
						onChange={handleSliderChange}
						marks	
						step={props.step}
						min={props.min}
						max={props.max}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<input
						className="box-rangeslider"
						value={props.value}
						onChange={handleInputChange}
						onBlur={handleBlur}
						type="number"
						aria-labelledby="input-slider"
						step={props.step}
						min={props.min}
						max={props.max}
						inputMode="numeric"
					/>
				</Grid>
			</Grid>
		</Box>
		</div>

  );
}

