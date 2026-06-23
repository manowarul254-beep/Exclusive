import React from 'react'
import Container from "../CommonComponents/Container";
import SecHead from '../CommonComponents/SecHead';
import CategoryBox from '../CommonComponents/CategoryBox';
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { TbDeviceWatchStats } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { TbDeviceGamepad } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="hidden absolute -top-17.5 right-4 w-11.5 h-11.5 bg-[#F5F5F5] lg:flex justify-center items-center rounded-full"
      onClick={onClick}
    >
      <FaArrowRight className="text-2xl text-black"/>
      </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="hidden absolute -top-17.5 right-15 w-11.5 h-11.5 bg-[#F5F5F5] lg:flex justify-center items-center rounded-full mr-2"
      onClick={onClick}
    >
      <FaArrowLeft className="text-2xl text-black"/>
      </div>
  );
}


const Categories = () => {

    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
   
  return (
      <div>
        <Container>
          <SecHead
                  title="Categories"
                  heading="Browse By Category"        
          />
          <div className='my-15 flex justify-between'>
            <CategoryBox title="Phones">
                <IoIosPhonePortrait className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
            <CategoryBox title="Computers">
                <HiOutlineComputerDesktop className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
            <CategoryBox title="SmartWatch">
                <TbDeviceWatchStats className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
            <CategoryBox title="Camera">
                <CiCamera className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
            <CategoryBox title="HeadPhones">
                <CiHeadphones className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
            <CategoryBox title="Gaming">
                <TbDeviceGamepad className="text-[56px] group-hover:text-white"/>               
            </CategoryBox>
          </div>
        </Container>
      </div>
  )
}

export default Categories
