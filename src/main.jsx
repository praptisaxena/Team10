import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import CreatePlan from './create-plan/index.jsx'
import App from './App.jsx'
import Header from './components/custom/Header.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewPlan from './view-plan/[goalId]/index'
import MyPlan from './my-plan'

const router=createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/create-plan',
    element: <CreatePlan/>
  },
  {
    path: '/view-career-plan/:goalId',
    element: <ViewPlan/>
  },
  {
    path:'/my-plan',
    element:<MyPlan/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
