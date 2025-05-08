
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import HomeUser from './pages/HomeUser'
const router = createBrowserRouter([
  {
      path: "/",
      element: <Login />
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />
  },
  { 
    path: "/homeUser",
    element: <HomeUser />
  }


])

createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
