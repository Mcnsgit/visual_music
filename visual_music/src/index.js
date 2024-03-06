import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './components/App';
import HomePage from './components/HomePage.js';
import Callback from './components/Callback';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import About from './components/About.js'; 
import UserProfile from './components/UserProfile'; // Assuming you have this component
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/callback',
    element: <Callback />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/user-profile',
    element: <UserProfile />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
