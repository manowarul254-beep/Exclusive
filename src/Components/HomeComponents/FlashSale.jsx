import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SecHead from "../CommonComponents/SecHead";
import Container from "../CommonComponents/Container";
import CountDown from "../CommonComponents/CountDown";
import Card from "../CommonComponents/Card";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Btn from "../CommonComponents/Btn";

// মোবাইলে কার্ডের দুই পাশে ছোট তীর, ট্যাবলেট থেকে হেডারের ডানে বড় তীর
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-10 top-1/3 right-1 w-8 h-8 bg-white shadow md:shadow-none md:bg-[#F5F5F5] md:w-11.5 md:h-11.5 md:-top-17.5 md:right-0 lg:right-4 flex justify-center items-center rounded-full cursor-pointer"
    >
      <FaArrowRight className="text-base md:text-2xl text-black" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-10 top-1/3 left-1 w-8 h-8 bg-white shadow md:shadow-none md:bg-[#F5F5F5] md:w-11.5 md:h-11.5 md:left-auto md:-top-17.5 md:right-14 lg:right-15 flex justify-center items-center rounded-full cursor-pointer"
    >
      <FaArrowLeft className="text-base md:text-2xl text-black" />
    </div>
  );
}

const FlashSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        // ফ্ল্যাশ সেলের জন্য ১২টিই যথেষ্ট
        const res = await axios.get("https://dummyjson.com/products?limit=12");
        setProducts(res.data.products);
      } catch (err) {
        setError("প্রোডাক্ট লোড করা যায়নি, আবার চেষ্টা করুন");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="my-10 lg:my-38.5">
      <Container>
        <div className="flex flex-col md:flex-row gap-6 lg:gap-22 items-start md:items-end">
          <SecHead title="Today’s" heading="Flash Sales" />
          <CountDown />
        </div>

        <div className="mt-10 md:mt-24 w-full min-w-0 overflow-hidden">
          {loading ? (
            <p className="w-full text-center py-20 text-gray-500">
              লোড হচ্ছে...
            </p>
          ) : error ? (
            <p className="w-full text-center py-20 text-[#DB4444]">{error}</p>
          ) : (
            <Slider {...settings} key={products.length}>
              {products.map((item) => {
                const originalPrice = (
                  item.price /
                  (1 - item.discountPercentage / 100)
                ).toFixed(2);

                return (
                  <div key={item.id} className="px-1.5 sm:px-3">
                    <Card
                      id={item.id}
                      imgSrc={item.thumbnail}
                      title={item.title}
                      price={item.price}
                      discountPrice={originalPrice}
                      ratings={`(${item.rating})`}
                      percentage={Math.round(item.discountPercentage)}
                    />
                  </div>
                );
              })}
            </Slider>
          )}
        </div>

        <Btn onClick={() => navigate("/products")} className="mt-12">
          View All Products
        </Btn>
      </Container>
    </div>
  );
};

export default FlashSale;