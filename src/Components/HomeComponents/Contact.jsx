import React from 'react'
import Container from '../CommonComponents/Container'
import BreadCrumb from '../CommonComponents/BreadCrumb'

const Contact = () => {
  return (
    <div>
      <Container>
       <BreadCrumb className='mt-30'/>
       <div className='border-2 w-100 h-50 space-y-5 pl-20 pt-5 my-30 bg-gray-700 text-white'>
        <label className='' htmlFor="">Your Name :</label>
        <input className='border-1 rounded-[5px] pl-3 text-white' type="text" name="" id=""  placeholder='whats your name'/> <br />
        <label htmlFor="">Your Name :</label>
        <input type="text" name="" id=""  placeholder='whats your name'/><br />
        <label htmlFor="">Your Name :</label>
        <input type="text" name="" id=""  placeholder='whats your name'/><br />
        <label htmlFor="">Your Name :</label>
        <input type="text" name="" id=""  placeholder='whats your name'/><br />
       </div>
      </Container>
    </div>
  )
}

export default Contact
