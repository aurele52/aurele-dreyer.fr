import Connection from './connection';
import "../css/HomePage.css";

interface homePageProps{
	toggleReduxDisplay: () => void
}
export default function homePage({ toggleReduxDisplay}:homePageProps) {
			return (
				<div className="homePage">
					<div className="home-menu">
						<button className='mainButton' onClick={() => toggleReduxDisplay()}>Redux</button>
					<Connection />
					</div>
				</div>
			);
}
