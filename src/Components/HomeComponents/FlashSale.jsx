import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SecHead from "../CommonComponents/SecHead";
import Container from "../CommonComponents/Container";
import CountDown from "../CommonComponents/CountDown";
import Card from "../CommonComponents/Card";
import Slider from "react-slick";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Btn from "../CommonComponents/Btn";

// তীর বাটন ট্যাবলেট থেকে দেখাবে, মোবাইলে swipe করেই চলবে
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="hidden absolute -top-17.5 right-0 lg:right-4 w-11.5 h-11.5 bg-[#F5F5F5] md:flex justify-center items-center rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className="text-2xl text-black" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="hidden absolute -top-17.5 right-14 lg:right-15 w-11.5 h-11.5 bg-[#F5F5F5] md:flex justify-center items-center rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowLeft className="text-2xl text-black" />
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
        const res = await axios.get("https://dummyjson.com/products?limit=0");
        setProducts(res.data.products);
      } catch (err) {
        setError("প্রোডাক্ট লোড করা যায়নি, আবার চেষ্টা করুন");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

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
        // ট্যাবলেট ও ছোট ল্যাপটপ
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        // বড় মোবাইল
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        // ছোট মোবাইল
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-10 lg:my-38.5">
      <Container>
        {/* হেডার: ছোট screen-এ countdown নিচে নামবে */}
        <div className="flex flex-wrap gap-6 lg:gap-22 items-end">
          <SecHead title="Today’s" heading="Flash Sales" />
          <CountDown />
        </div>

        {/* min-w-0 না দিলে slider পাশে ফুলে বেরিয়ে যায় */}
        <div className="mt-10 md:mt-16 w-full min-w-0">
          {loading ? (
            <p className="w-full text-center py-20 text-gray-500">
              লোড হচ্ছে...
            </p>
          ) : error ? (
            <p className="w-full text-center py-20 text-[#DB4444]">{error}</p>
          ) : (
            <Slider {...settings} className="w-full text-center mx-auto">
              {products.map((item) => {
                const originalPrice = (
                  item.price /
                  (1 - item.discountPercentage / 100)
                ).toFixed(2);

                return (
                  <div key={item.id} className="px-2 sm:px-3">
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

        <Btn onClick={() => navigate("/products")}>View All Products</Btn>
      </Container>
    </div>
  );
};

export default FlashSale;