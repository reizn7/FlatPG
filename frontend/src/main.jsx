import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ListingsProvider } from './context/ListingsContext';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ListingsProvider>
        <App />
      </ListingsProvider>
    </UserProvider>
  </React.StrictMode>
);
