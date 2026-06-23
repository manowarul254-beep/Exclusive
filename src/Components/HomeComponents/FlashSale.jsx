import React from "react";
import SecHead from "../CommonComponents/SecHead";
import Container from "../CommonComponents/Container";
import CountDown from "../CommonComponents/CountDown";
import Card from "../CommonComponents/Card";
import console from "../../assets/gaming.png";
import console1 from "../../assets/keybord.png";
import console2 from "../../assets/computer.png";
import console3 from "../../assets/chair.png";
import Slider from "react-slick";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Btn from "../CommonComponents/Btn";


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



const FlashSale = () => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <div className="my-10 lg:my-38.5">
      <Container>
        <div className="flex gap-22 items-end">
          <SecHead 
                  title="Today’s"
                  heading="Flash Sales"
          />
          <CountDown />
        </div>
        <div className="mt-10 flex justify-between">
          <Slider {...settings} className="w-full text-center mx-auto ">
              <div>
              <Card
                imgSrc={console}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage="40"
              />
            </div>
            <div>
              <Card
                imgSrc={console1}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage="35"
              />
            </div>
            <div>
              <Card
                imgSrc={console2}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage="30"
              />
            </div>
            <div>
              <Card
                imgSrc={console3}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage="25"
              />
            </div>
            <div>
              <Card
                imgSrc={console}
                title="HAVIT HV-G92 Gamepad"
                price="120"
                discountPrice="160"
                ratings="(88)"
                percentage="40"
              />
            </div>
            <div>
              <Card
                imgSrc={console1}
                title="AK-900 Wired Keyboard"
                price="960"
                discountPrice="1160"
                ratings="(75)"
                percentage="35"
              />
            </div>
            <div>
              <Card
                imgSrc={console2}
                title="IPS LCD Gaming Monitor"
                price="370"
                discountPrice="400"
                ratings="(99)"
                percentage="30"
              />
            </div>
            <div>
              <Card
                imgSrc={console3}
                title="S-Series Comfort Chair "
                price="375"
                discountPrice="400"
                ratings="(99)"
                percentage="25"
              />
            </div>
          </Slider>
        </div>


        <Btn>View All Products</Btn>
      </Container>
    </div>
  );
};

export default FlashSale;
