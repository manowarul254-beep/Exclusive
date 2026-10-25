import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../CommonComponents/Container";
import Slider from "react-slick";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import banner from "../../assets/bannner.jpg";
import { BiCategory } from "react-icons/bi";

// Banner-এর তালিকায় কয়টা category দেখাবে
const MAX_SHOW = 9;

const Banner = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        setCategories(res.data.slice(0, MAX_SHOW));
      } catch (err) {
        setCategories([]);
      }
    };
    getCategories();
  }, []);

  // category-তে ক্লিক করলে Products পেজে ওই category-র প্রোডাক্ট দেখাবে
  const handleCategoryClick = (slug) => {
    setShow(false);
    navigate(`/products?category=${slug}`);
  };

  var settings = {
    dots: true,
    arrows: false, // ডিফল্ট তীর পর্দার বাইরে বেরিয়ে পেজ নাড়াচ্ছিল
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div>
        <ul
          className="absolute -top-16.25 left-[50%] translate-x-[-50%]"
          style={{ margin: "0px" }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => <div className="w-3 h-3 rounded-full"></div>,
  };

  return (
    <div className="mt-4 lg:mt-10">
      <Container>
        {/* মোবাইল ও ট্যাবলেটে ক্যাটাগরি খোলার বাটন */}
        <button
          onClick={() => setShow(!show)}
          className="lg:hidden flex items-center gap-2 mb-3 cursor-pointer"
        >
          <BiCategory className="text-2xl" />
          <span className="text-sm font-medium">Categories</span>
        </button>

        <div className="lg:flex">
          {/* বাঁ দিকের ক্যাটাগরি তালিকা */}
          <div className="lg:w-[20%] lg:shrink-0 lg:border-r border-[#0000003a]">
            <ul
              className={`${
                show ? "grid" : "hidden"
              } grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 lg:flex lg:flex-col lg:gap-5 text-sm mb-6 lg:mb-0 lg:pr-4`}
            >
              {categories.map((cat) => (
                <li
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="flex items-center justify-between gap-4 cursor-pointer hover:text-[#DB4444] transition-colors duration-200"
                >
                  {cat.name}
                  <MdOutlineKeyboardArrowRight />
                </li>
              ))}

              {/* সব প্রোডাক্ট দেখার লিংক */}
              <li
                onClick={() => {
                  setShow(false);
                  navigate("/products");
                }}
                className="cursor-pointer font-medium hover:text-[#DB4444] transition-colors duration-200"
              >
                All Products
              </li>
            </ul>
          </div>

          {/* ডান দিকের slider */}
          <div className="flex-1 min-w-0 overflow-hidden lg:ml-12.5 pb-6">
            <Slider {...settings} className="w-full text-center mx-auto">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <img
                    src={banner}
                    alt="Banner"
                    className="w-full h-44 sm:h-64 md:h-80 lg:h-auto object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;