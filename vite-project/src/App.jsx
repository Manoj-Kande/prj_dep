import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlipPage from './components/flip_card'; // Ensure the correct component path
import ScorePage from './components/ScorePage'; // Ensure the correct component path
import AdminPage from './components/Admin'; // Ensure the correct component path
import EditPage from './components/Edit'; // Ensure the correct component path
import './App.css'; // Ensure the correct path to your CSS file
import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/flash_cards" element={<FlipPage />} />
        <Route path="/flash_cards/score" element={<ScorePage />} />
        <Route path="/flash_cards/edit/:id" element={<EditPage />} />
        <Route path="/flash_cards/add-question" element={<AddQuestion />} />
        <Route path="/flash_cards/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
