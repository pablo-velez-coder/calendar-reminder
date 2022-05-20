import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './pages/App'
import Calendar from './pages/Calendar';

function Main() {
	return (
	  <div className="main">
	  <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
	  </div>
	);
}

export default Main;
