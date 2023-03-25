import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { productsApi } from './features/api/productsApi'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApiProvider api={productsApi}>
        <App />
      </ApiProvider>
    </React.StrictMode>
  </BrowserRouter>
);

