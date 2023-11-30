import './App.css';
import Navbar from './modules/Navbar';
import Background from './modules/Background';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addWindow, AppState } from './reducers';
import { useDispatch } from 'react-redux';

export function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setGreeting);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1>{greeting}</h1>
      <Background />
    </div>
  );
}
