import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../CommonComponents/Container'

const Header = () => {
  return (
    <div className='bg-black text-white py-3.75'>
      <Container>
        <div className='flex items-center justify-between gap-3 px-2 lg:px-0'>
          <p className='flex-1 text-[#FAFAFA] text-xs sm:text-sm lg:text-base text-center lg:pl-87'>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <Link
              to='/products'
              className='font-semibold text-xs sm:text-sm lg:text-[14px] pl-2 border-b whitespace-nowrap'
            >
              ShopNow
            </Link>
          </p>

          <select
            className='shrink-0 bg-black text-xs sm:text-sm lg:text-base cursor-pointer outline-0'
            defaultValue='en'
          >
            <option value='en'>English</option>
            <option value='bn'>বাংলা</option>
          </select>
        </div>
      </Container>
    </div>
  )
}

export default Header