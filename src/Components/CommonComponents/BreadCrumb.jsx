import React from 'react'
import { useLocation } from 'react-router'


const BreadCrumb = ({className}) => {

     let {pathname} = useLocation();
     let pathnameLocation = pathname.split('/');


  return (
    <div className={`${className}`}>
      <div className='flex gap-3.5 text-gray-500'>
        <h2>Home</h2>
        <h2>/</h2>
        <h2>{pathnameLocation}</h2>
      </div>
    </div>
  )
}

export default BreadCrumb
