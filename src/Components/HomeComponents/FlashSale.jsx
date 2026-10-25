import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SecHead from "../CommonComponents/SecHead";
import Container from "../CommonComponents/Container";
import CountDown from "../CommonComponents/CountDown";
import Card from "../CommonComponents/Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Btn from "../CommonComponents/Btn";

const FlashSale = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
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

  // তীরে ক্লিক করলে একটি কার্ড পরিমাণ সরবে
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    el.scrollBy({
      left: direction * el.firstElementChild.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-10 lg:my-38.5">
      <Container>
        <div className="flex flex-col md:flex-row gap-6 lg:gap-22 items-start md:items-end">
          <SecHead title="Today’s" heading="Flash Sales" />
          <CountDown />
        </div>

        <div className="relative mt-10 md:mt-24 w-full min-w-0">
          {loading ? (
            <p className="w-full text-center py-20 text-gray-500">
              লোড হচ্ছে...
            </p>
          ) : error ? (
            <p className="w-full text-center py-20 text-[#DB4444]">{error}</p>
          ) : (
            <>
              {/* বাঁ তীর */}
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="absolute z-10 top-1/3 left-1 w-8 h-8 bg-white shadow md:shadow-none md:bg-[#F5F5F5] md:w-11.5 md:h-11.5 md:left-auto md:-top-17.5 md:right-14 lg:right-15 flex justify-center items-center rounded-full cursor-pointer"
              >
                <FaArrowLeft className="text-base md:text-2xl text-black" />
              </button>

              {/* ডান তীর */}
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next"
                className="absolute z-10 top-1/3 right-1 w-8 h-8 bg-white shadow md:shadow-none md:bg-[#F5F5F5] md:w-11.5 md:h-11.5 md:-top-17.5 md:right-0 lg:right-4 flex justify-center items-center rounded-full cursor-pointer"
              >
                <FaArrowRight className="text-base md:text-2xl text-black" />
              </button>

              {/* কার্ডের সারি */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {products.map((item) => {
                  const originalPrice = (
                    item.price /
                    (1 - item.discountPercentage / 100)
                  ).toFixed(2);

                  return (
                    <div
                      key={item.id}
                      className="shrink-0 snap-start basis-1/2 md:basis-1/3 lg:basis-1/4 px-1.5 sm:px-3"
                    >
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
              </div>
            </>
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