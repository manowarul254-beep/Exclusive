import React from 'react'
import Container from '../CommonComponents/Container'
import SecHead from '../CommonComponents/SecHead'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import Card from "../CommonComponents/Card";
import console4 from "../../assets/Cart (4).png";
import console5 from "../../assets/Cart (5).png";
import console6 from "../../assets/Cart (6).png";
import console3 from "../../assets/chair.png";
import Btn from "../CommonComponents/Btn";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute -top-17.5 right-4 w-11.5 h-11.5 bg-[#F5F5F5] flex justify-center items-center rounded-full"
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
      className=" absolute -top-17.5 right-15 w-11.5 h-11.5 bg-[#F5F5F5] flex justify-center items-center rounded-full mr-2"
      onClick={onClick}
    >
      <FaArrowLeft className="text-2xl text-black"/>
      </div>
  );
}


const ExploreOurProducts = () => {

        var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };



  return (
    <div className='mb-[168px]'>
        <Container>
            <div>
            <SecHead
                 title="Our Products"
                 heading="Explore Our Products"
            />
            </div>
            <div className="mt-10">
          <Slider {...settings} className="w-full text-center mx-auto">
            <div>
            <div className="grid grid-cols-4 gap-6">
              <Card
                imgSrc={console4}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage={false}
              />
            
              <Card
                imgSrc={console4}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage={false}
              />
            
              <Card
                imgSrc={console5}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
           
              <Card
                imgSrc={console5}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            
              <Card
                imgSrc={console6}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage={false}
              />
            
              <Card
                imgSrc={console6}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage={false}
              />
            
              <Card
                imgSrc={console3}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            
              <Card
                imgSrc={console3}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            </div>
            </div>
            <div>
            <div className="grid grid-cols-4 gap-6">
              <Card
                imgSrc={console4}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage={false}
              />
            
              <Card
                imgSrc={console5}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage={false}
              />
            
              <Card
                imgSrc={console6}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            
              <Card
                imgSrc={console3}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            
              <Card
                imgSrc={console4}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage={false}
              />
           
              <Card
                imgSrc={console5}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage={false}
              />
            
              <Card
                imgSrc={console6}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            
              <Card
                imgSrc={console3}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage={false}
              />
            </div>
            </div>
          </Slider>
        </div>
        <Btn>View All Products</Btn>
        </Container>
      
    </div>
  )
}

export default ExploreOurProducts
