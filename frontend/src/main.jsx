import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './App/store.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordCheck from './dashboard/PasswordCheck.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path='/' element={ <App /> } />
          <Route path='/dashboard' element={ <PasswordCheck /> } />
          <Route path='/dashboard-4435966-mustafa' element={ <Dashboard /> } />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);