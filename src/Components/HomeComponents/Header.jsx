import React from 'react'
import Container from '../CommonComponents/Container'
import { IoIosArrowDown } from "react-icons/io";


const Header = () => {
  return (
    <div className='bg-black text-white py-3.75'>
        <Container>
            <div className='flex justify-between'>
                <div>
                    <p className='lg:pl-87 text-[#FAFAFA] lg:text-base text-xs'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!<a href="" className='font-semibold text-[14px] pl-2 border-b'>ShopNow</a></p>
                </div>            
                <div className=''>
                  <select className='bg-black lg:text-base text-xs cursor-pointer' name="" id=""><IoIosArrowDown />
                    <option value="">English</option>
                    <option value="">English</option>
                    <option value="">English</option>
                    <option value="">English</option>
                  </select>
                   
                </div>  
            </div>    
        </Container>
    </div>
  )
}

export default Header
