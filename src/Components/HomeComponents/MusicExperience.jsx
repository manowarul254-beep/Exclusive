import React from 'react'
import Container from '../CommonComponents/Container'
import music from '../../assets/music.png'
import CountDown from '../CommonComponents/CountDown'
import Btn from '../CommonComponents/Btn'


const MusicExperience = () => {
  return (
    <div>
      <Container>
        <div style={{ backgroundImage: `url(${music})` }}
          className="bg-cover bg-center h-[500px] pl-14 pt-17.25 mt-45 mb-18">
            <div className='text-white'>            
            <div>
                <h2 className='font-semibold text-[#00FF66]'>Categories</h2>
                <h3 className='text-[48px] font-semibold leading-15 w-110.75 tracking-[4%] my-8'>Enhance Your Music Experience</h3>
            </div>
            <div>
              <CountDown/>
            </div>
            <div>
              <button className='px-12 py-4 bg-[#00FF66] rounded-sm text-white font-medium mt-10'>
                Buy Now!
             </button>
            </div>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default MusicExperience
