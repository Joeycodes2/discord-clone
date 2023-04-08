import React from 'react';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Header from './components/Header';
import Hero from "./components/Hero";
import Home from "./components/Home";


function App(){
    return (
        
        <Router>
        <switch>
        <Routes>
        <Route exact path="/" element={<Header/> } />
        <Route exact path="/" element={<Hero/>} />
        
        
        <Route exact path="/Channels" element={<Home />} />
        </Routes>
        </switch>
        </Router>           
           
    )
}

export default App;