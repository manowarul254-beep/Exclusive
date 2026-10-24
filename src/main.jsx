import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RootLayout from './RootLayout.jsx'
import Products from './Pages/Products.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import CartPage from './Pages/CartPage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import AccountPage from './Pages/AccountPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import ProtectedRoute from './Components/CommonComponents/ProtectedRoute.jsx'
import ContactPage from './Pages/ContactPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "Products", Component: Products },
      { path: "contact", Component: ContactPage },
      { path: "SignupPage", Component: SignupPage },
      { path: "Login", Component: LoginPage },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute>, },
      { path: "Cart", element: <ProtectedRoute><CartPage /></ProtectedRoute>,},
      { path: "Checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>, },
      { path: "account", element: <ProtectedRoute><AccountPage /></ProtectedRoute>,},
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
)