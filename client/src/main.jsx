import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LocalStorageProvider } from './contexts/LocalStorageContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <LocalStorageProvider>
      <App />
    </LocalStorageProvider>
  </GoogleOAuthProvider>
  // </React.StrictMode>,
)
