import React, { useState } from 'react'
import Container from '../CommonComponents/Container'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import banner from "../../assets/bannner.jpg"
import { BiCategory } from "react-icons/bi";

const Banner = () => {
   const [show,setShow] = useState(false)

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
     appendDots: dots => (
      <div >
        <ul className='absolute -top-16.25 left-[50%] translate-x-[-50%]' style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        className='w-3 h-3 rounded-full'
      >
    
      </div>
    )
  };
  return (
    <div className='mt-4 lg:mt-10'>
       <BiCategory onClick={()=>setShow (!show)} className='lg:hidden block text-2xl mb-2'/>
      <Container>
      <div className='lg:flex justify-between'>
        <div className='lg:w-[20%] lg:border-r border-[#0000003a]'>
          <ul className= {`${show ? "block" : "hidden"} lg:block space-y-5 text-sm cursor-pointer`}>
            <li className='flex items-center gap-4 lg:justify-between'>Woman’s Fashion <MdOutlineKeyboardArrowRight /></li>
            <li className='flex items-center gap-4 lg:justify-between'>Men’s Fashion<MdOutlineKeyboardArrowRight /></li>
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby's & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
          </ul>
        </div>

        <div className='lg:w-[80%] lg:ml-12.5'>
             <Slider {...settings} className='w-full text-center mx-auto'>
                <div>
                  <h3><img src={banner} alt="" className='w-full /></h3>
                 </div>
                 <div>
                  <h3><img src={banner} alt="" className='w-full/></h3>
                 </div>
                 <div>
                  <h3><img src={banner} alt="" className='w-full' /></h3>
                 </div>
                 <div>
                  <h3><img src={banner} alt="" className='w-full' /></h3>
                 </div>
              </Slider>
        </div>

      </div>
    </Container>
    </div>
  )
}

export default Banner