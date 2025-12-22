import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <div>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </div>,
)