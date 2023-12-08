import './App.css';
import Navbar from './modules/Navbar';
import Background from './modules/Background';
//import { useSelector } from 'react-redux';
//import { addWindow, AppState } from './reducers';
//import { useDispatch } from 'react-redux';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Background />
    </div>
  );
}

export default App;