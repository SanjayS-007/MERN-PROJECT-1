// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './pages/Navbar'; // Adjust the import path as necessary

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
        <Navbar username="Sanjay" />
    <App />
  </BrowserRouter>
);
