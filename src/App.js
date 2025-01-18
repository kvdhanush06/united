import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostTournament from "./components/PostTournament";
import Signup from "./components/Signup";
import ViewTournaments from "./components/ViewTournaments";
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<PostTournament />} />
        <Route path="/view-tournaments" element={<ViewTournaments />} />
      </Routes>
    </Router>
  );
}
export default App;
