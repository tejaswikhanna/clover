import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import Lab from './pages/Lab';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Lab />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
