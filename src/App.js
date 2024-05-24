import React from 'react'
import NavBar from './components/NavBar/NavBar'
import HomePage from "./components/homePage/HomePage";
import "react-alice-carousel/lib/alice-carousel.css";

function App() {
  return (
    <div className='overflow-hidden'>
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
