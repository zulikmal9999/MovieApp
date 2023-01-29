import './App.css';
import User from './components/User.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
// import Contact from './components/Contact';
import Movie from './components/Movie.js';
import Header from './components/Header.js';
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;


