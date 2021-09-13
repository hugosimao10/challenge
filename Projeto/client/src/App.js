import React from 'react';
import Weather from './components/Weather';
import Header from './components/Header';
import "./components/Weather.css";
import "./App.css";

function App() {
  return (
    <div className="backg" style={{overflow: 'hidden'}}>
    <div className="App"><Header/></div>
      <div ><Weather /></div>
    </div>
  );
}

export default App;
