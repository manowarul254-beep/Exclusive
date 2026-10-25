import React from 'react'
import Navbar from '../src/Components/HomeComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from './Components/HomeComponents/Footer'
import Header from '../src/Components/HomeComponents/Header'
import ScrollToTop from './Components/CommonComponents/ScrollToTop'
import PageReveal from './Components/CommonComponents/PageReveal'

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Navbar/>
      <PageReveal>
        <Outlet/>
      </PageReveal>
      <Footer/>
    </div>
  )
}

export default RootLayout