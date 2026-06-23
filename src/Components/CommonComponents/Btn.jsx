import React from 'react'

const Btn = ({children,className}) => {
  return (
    <button className='px-12 py-4 bg-primary rounded-sm text-white font-medium block mx-auto mt-9.5'>
        {children}
    </button>
  )
}

export default Btn
