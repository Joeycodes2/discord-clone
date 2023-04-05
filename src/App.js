import React from 'react';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Header from './components/Header';
import Hero from "./components/Hero";
import Home from "./components/Home";


function App(){
    return (
        <Router>
        <div className="App">
        <Header />
        <Routes>
          
          <Route exact path="/" element={<Hero/>} />
          <Route exact path="/channels" element={<Home/>} />

        </Routes>
        </div>             
        </Router>   
    )
}

export default App;