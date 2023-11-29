import './App.css';
import { Navbar } from './modules/Navbar';
import { Background } from './modules/Background';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BoolState } from './store';

export function App() {

  return (
    <div className="App">
      <Navbar dispatch={useDispatch()} />
      <Background bool={useSelector((state: { bool: BoolState }) => state.bool)}/>
    </div>
  );
}
