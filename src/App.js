// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import Router here
import DishList from './components/DishList';
import DishDetails from './components/DishDetails';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DishList />} />
        <Route path="/dish/:name" element={<DishDetails />} />
      </Routes>
    </div>
  );
};

export default App;



