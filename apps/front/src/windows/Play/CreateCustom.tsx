import { Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import './CreateCustom.css';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function CreateCustom()
{
	return(
		<div className="CreateCustom">
			<Box sx={{ width: 300 }}>
			<Slider
  aria-label="Temperature"
  defaultValue={30}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={10}
  marks
  min={10}
  max={110}
/>
</Box>
		</div>
	)
}
