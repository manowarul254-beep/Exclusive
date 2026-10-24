import React from 'react'
import Navbar from '../src/Components/HomeComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from './Components/HomeComponents/Footer'
import Header from '../src/Components/HomeComponents/Header'
import ScrollToTop from './Components/CommonComponents/ScrollToTop'


const RootLayout = () => {
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout
