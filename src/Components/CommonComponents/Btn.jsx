import React from 'react'
import { twMerge } from 'tailwind-merge'

const Btn = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={twMerge(
        'px-12 py-4 bg-primary rounded-sm text-white font-medium block mx-auto mt-9.5 cursor-pointer',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Btn