import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisualMusic from './components/Visual_Music';
import Callback from './components/Callback';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <VisualMusic />, // Main entry, acting as Home
    errorElement: <PageNotFound />
  },
  {
    path: '/login',
    element: <Login />, // Login page
  },
  {
    path: '/callback',
    element: <Callback />, // Spotify OAuth callback
  },
  {
    path: '*', // Catch-all for not found pages
    element: <PageNotFound />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />
);
