import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { LoginPage } from './pages/LoginPage';
import { OfficePage } from './pages/OfficePage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/office" element={<OfficePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
