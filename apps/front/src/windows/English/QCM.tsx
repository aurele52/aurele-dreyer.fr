import { Button } from "../../shared/ui-components/Button/Button";


interface QCMProps {
	returnToMenu: () => void;
}

export default function QCM(props: QCMProps) {
	return (
		<div className="QCM">
			<div className="footer-list">
				<Button
					color="red"
					content="GO BACK"
					onClick={props.returnToMenu}
				/>
			</div>
		</div>
	);
}
