import React from 'react'
import Navbar from '../Components/HomeComponents/Navbar'
import Banner from '../Components/HomeComponents/Banner'
import FlashSale from '../Components/HomeComponents/FlashSale'
import Categories from '../Components/HomeComponents/Categories'
import BestSellingProducts from '../Components/HomeComponents/BestSellingProducts'
import MusicExperience from '../Components/HomeComponents/MusicExperience'
import ExploreOurProducts from '../Components/HomeComponents/ExploreOurProducts'
import NewArrival from '../Components/HomeComponents/NewArrival'
import Services from '../Components/HomeComponents/Services'
import Footer from '../Components/HomeComponents/Footer'

const Home = () => {
  return (
    <>
      <Banner/>
      <FlashSale/>
      <Categories/>
      <BestSellingProducts/>
      <MusicExperience/>
      <ExploreOurProducts/>
      <NewArrival/>
      <Services/>
      
    </>
  )
}

export default Home
