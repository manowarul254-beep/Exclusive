import React, { useState } from 'react'
import Container from '../CommonComponents/Container'
import logo from '../../assets/Logo (3).png'
import { LuSearch } from "react-icons/lu";

import { IoCartOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router";




const Navbar = () => {

     const [show,setShow] = useState(false)

  return (
    <div className='border-b'>
        <Container className='px-0'>
            <nav className='flex items-center justify-between py-7 relative'>
                <div className='pl-2 lg:pl-0'>
                    <img src={logo} alt="" />
                </div>
                <ul className={`${show ? "block" : "hidden"} z-10 p-4 absolute lg:static bottom-[-129%] left-0 bg-black lg:bg-transparent w-full lg:w-max text-white lg:text-black lg:flex items-center gap-12 slide`}>
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/contact" end>Contact</NavLink></li>
                    <li><NavLink to="/products" end>About</NavLink></li>                   
                    <li>Sign Up</li>
                </ul>
                <div className='hidden lg:flex gap-6'>
                   <div className='w-60.75 bg-[#F5F5F5] relative items-center'>
                        <input type="text" placeholder='What are you looking for?' className='py-1.75 pl-5 w-60.75 outline-0'/>
                        <LuSearch className='absolute top-2 right-3 text-2xl'/>
                   </div>
                   <div className='hidden lg:flex items-center gap-4'>
                        <IoHeartOutline className='text-3xl'/>
                        <IoCartOutline className='text-3xl'/>
                    </div>
                </div>
                <AiOutlineBars onClick={()=> setShow (!show)} className='lg:hidden block text-2xl pr-2 lg:pr-0'/>
            </nav>
        </Container>
      
    </div>
  )
}

export default Navbar
