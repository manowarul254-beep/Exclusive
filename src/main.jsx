import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RootLayout from './RootLayout.jsx'
import Products from './Pages/Products.jsx'
import Contact from './Components/HomeComponents/Contact.jsx'

const router = createBrowserRouter([
   {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "Products", Component: Products },
      { path: "contact", Component: Contact },
        ],
      },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)