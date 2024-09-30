import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CategoryForm from './pages/CategoryForm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la pantalla Home */}
        <Route path="/categories" element={<Home/>} />
        {/* Ruta para la pantalla CategoryForm */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<CategoryForm />} />
      </Routes>
    </Router>
  );
};

export default App;