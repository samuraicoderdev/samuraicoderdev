import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';
import { testConnection } from './lib/firebase';
import { AuthProvider } from './lib/AuthContext';

// Check connection on boot
testConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
        <Toaster position="top-center" />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
