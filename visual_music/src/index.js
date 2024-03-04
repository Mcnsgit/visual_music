import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/Visual_Music';
import Callback from './components/Callback';
import PageNotFound from './PageNotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />

    },
    {
        path: '/callback',
        element: <Callback />
    },
    {
        path: '/about',
        element: <App />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path:'/spotify-service'
    },
    {
        path: '/visual-music',
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />
);

