import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../CommonComponents/Container";
import SecHead from "../CommonComponents/SecHead";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import Card from "../CommonComponents/Card";
import Btn from "../CommonComponents/Btn";

// মোট কয়টা প্রোডাক্ট আনবে আর প্রতি slide-এ কয়টা দেখাবে
const TOTAL_PRODUCTS = 16;
const PER_SLIDE = 8;

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

const ExploreOurProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        // skip=30 দিয়েছি, যাতে Flash Sale-এর প্রথম দিকের প্রোডাক্টের সাথে হুবহু না মেলে
        const res = await axios.get(
          `https://dummyjson.com/products?limit=${TOTAL_PRODUCTS}&skip=30`
        );
        setProducts(res.data.products);
      } catch (err) {
        setError("প্রোডাক্ট লোড করা যায়নি, আবার চেষ্টা করুন");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // ৮টা করে প্রোডাক্ট নিয়ে এক একটা slide বানানো
  const pages = [];
  for (let i = 0; i < products.length; i += PER_SLIDE) {
    pages.push(products.slice(i, i + PER_SLIDE));
  }

  var settings = {
    dots: false,
    infinite: pages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="mb-16 lg:mb-42">
      <Container>
        <div>
          <SecHead title="Our Products" heading="Explore Our Products" />
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
              {pages.map((page, index) => (
                <div key={index}>
                  {/* মোবাইলে ২টা, ট্যাবলেটে ৩টা, ডেস্কটপে ৪টা */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {page.map((item) => {
                      // API-তে ছাড়ের আগের দাম নেই, তাই হিসাব করে বের করা হচ্ছে
                      const originalPrice = (
                        item.price /
                        (1 - item.discountPercentage / 100)
                      ).toFixed(2);

                      return (
                        <Card
                          key={item.id}
                          id={item.id}
                          imgSrc={item.thumbnail}
                          title={item.title}
                          price={item.price}
                          discountPrice={originalPrice}
                          ratings={`(${item.rating})`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <Btn onClick={() => navigate("/products")}>View All Products</Btn>
      </Container>
    </div>
  );
};

export default ExploreOurProducts;