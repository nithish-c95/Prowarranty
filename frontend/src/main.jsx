import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { WarrantyProvider } from './context/WarrantyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WarrantyProvider>
          <App />
        </WarrantyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
