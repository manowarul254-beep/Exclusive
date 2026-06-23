import React, { useEffect, useState } from 'react'
import { countDownDateAndTime } from 'countdown-date-time'; 

const CountDown = () => {


   const conduct_date = '2026-06-30 12:00:00';

     const[count,setCount] = useState({})

     useEffect(()=>{
      setInterval(()=>{
        const countDown = countDownDateAndTime(conduct_date);
         setCount(countDown)

      },1000)
     },[])

    

 

  return (
    <div className='flex items-center gap-4.5'>
      <div>
        <h3>Days</h3>
        <h2 className='text-[32px] font-bold'>{count.days}</h2>
      </div>
      <span className='text-primary text-3xl mt-4'>:</span>
      <div>
        <h3>Hours</h3>
        <h2 className='text-[32px] font-bold'>{count.hours}</h2>
      </div>
      <span className='text-primary text-3xl mt-4'>:</span>
      <div>
        <h3>Minutes</h3>
        <h2 className='text-[32px] font-bold'>{count.minutes}</h2>
      </div>
      <span className='text-primary text-3xl mt-4'>:</span>
      <div>
        <h3>Seconds</h3>
        <h2 className='text-[32px] font-bold'>{count.seconds}</h2>
      </div>
    </div>
  )
}

export default CountDown
