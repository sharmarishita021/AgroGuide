import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import FarmCheck from './pages/Farm-Check/farmCheck';
import CropDoctor from './pages/CropDoctor/CropDoctor';
import ProblemSolver from './pages/Problem&Solution/ProblemSolver';
import Cards from './pages/Schemes/Schemes';
import About from './pages/About/About';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farm-check" element={<FarmCheck />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
          <Route path="/problem-solver" element={<ProblemSolver />} />
          <Route path="/schemes" element={<Cards />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
