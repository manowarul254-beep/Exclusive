import React from "react";
import { useNavigate } from "react-router-dom";

import ps5 from "../../assets/playstation.png";
import women from "../../assets/collection.png";
import speaker from "../../assets/Frame 686.png";
import perfume from "../../assets/Frame 687.png";
import Container from "../CommonComponents/Container";
import SecHead from "../CommonComponents/SecHead";

// প্রতিটা কার্ডের চেহারা ও hover effect এক জায়গায়
const ArrivalCard = ({
  img,
  title,
  text,
  minHeight,
  titleClass,
  textClass,
  posClass,
  onClick,
}) => {
  return (
    <div className="group relative bg-black rounded overflow-hidden cursor-pointer">
      {/* ছবি: hover করলে ধীরে ধীরে বড় হবে */}
      <img
        src={img}
        alt={title}
        className={`w-full h-full ${minHeight} object-cover transition-transform duration-500 ease-out group-hover:scale-110`}
      />

      {/* হালকা কালো পর্দা: hover করলে ফুটে উঠবে */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

      {/* লেখা ও বাটন */}
      <div className={`absolute ${posClass} text-white`}>
        <h3 className={`${titleClass} font-semibold`}>{title}</h3>
        <p className={textClass}>{text}</p>
        <button
          onClick={onClick}
          className="border-b border-white cursor-pointer transition-colors duration-300 group-hover:border-[#DB4444] group-hover:text-[#DB4444]"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

const NewArrival = () => {
  const navigate = useNavigate();
  const goShop = () => navigate("/products");

  return (
    <div>
      <Container>
        <SecHead title="Featured" heading="New Arrival" />

        {/* মোবাইল ও ট্যাবলেটে একটার নিচে আরেকটা, ডেস্কটপে পাশাপাশি */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-15 mb-16 lg:mb-34">
          {/* PlayStation */}
          <ArrivalCard
            img={ps5}
            title="PlayStation 5"
            text="Black and White version of the PS5 coming out on sale."
            minHeight="min-h-72"
            titleClass="text-2xl lg:text-3xl mb-2"
            textClass="text-sm mb-4 max-w-62.5"
            posClass="bottom-5 left-5 lg:bottom-8 lg:left-8"
            onClick={goShop}
          />

          <div className="grid grid-rows-[auto_auto] gap-4 lg:gap-6">
            {/* Women */}
            <ArrivalCard
              img={women}
              title="Women's Collections"
              text="Featured woman collections that give you another vibe."
              minHeight="min-h-56"
              titleClass="text-xl lg:text-2xl mb-2"
              textClass="text-sm mb-4 max-w-62.5"
              posClass="bottom-5 left-5 lg:bottom-8 lg:left-8"
              onClick={goShop}
            />

            {/* Speakers আর Perfume: বড় মোবাইল থেকে পাশাপাশি */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <ArrivalCard
                img={speaker}
                title="Speakers"
                text="Amazon wireless speakers"
                minHeight="min-h-56"
                titleClass="text-xl"
                textClass="text-xs my-2"
                posClass="bottom-5 left-5 lg:bottom-6 lg:left-6"
                onClick={goShop}
              />

              <ArrivalCard
                img={perfume}
                title="Perfume"
                text="GUCCI INTENSE OUD EDP"
                minHeight="min-h-56"
                titleClass="text-xl"
                textClass="text-xs my-2"
                posClass="bottom-5 left-5 lg:bottom-6 lg:left-6"
                onClick={goShop}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewArrival;