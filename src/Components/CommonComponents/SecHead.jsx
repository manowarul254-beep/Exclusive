import React from 'react'

const SecHead = ({title,heading}) => {
  return (
    <div>
      <div className='flex items-center gap-2.5'>
        <div className='w-5 h-10 bg-primary rounded-sm'></div>
        <h5 className='text-primary font-semibold leading-5 text-xs lg:text-base'>{title}</h5>
      </div>
      <h2 className='text-2xl lg:text-[36px] font-semibold lg:leading-12 mt-6'>{heading}</h2>
    </div>
  )
}

export default SecHead
