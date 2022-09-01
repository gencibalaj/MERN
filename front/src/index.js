import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { AuthProvider } from './context/AuthProvider'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  
);

