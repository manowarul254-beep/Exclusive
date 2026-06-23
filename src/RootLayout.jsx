import React from 'react'
import Navbar from '../src/Components/HomeComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from './Components/HomeComponents/Footer'
import Header from '../src/Components/HomeComponents/Header'


const RootLayout = () => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout
