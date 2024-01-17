import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

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
		<div> 
			<div>{props.label}</div>
			<Box sx={{ width: 250 }}>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
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
					<Input
						value={props.value}
						size="small"
						onChange={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							step: props.step,
							min: props.min,
							max: props.max,
							type: 'number',
							'aria-labelledby': 'input-slider',
						}}
					/>
				</Grid>
			</Grid>
		</Box>
		</div>

  );
}

