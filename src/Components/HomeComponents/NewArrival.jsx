import React from "react";

import ps5 from "../../assets/playstation.png";
import women from "../../assets/collection.png";
import speaker from "../../assets/Frame 686.png";
import perfume from "../../assets/Frame 687.png";
import Container from '../CommonComponents/Container';
import SecHead from "../CommonComponents/SecHead";

const NewArrival = () => {
  return (
    <div>
      <Container>
        <SecHead
              title="Featured"
              heading="New Arrival"
        />
        <div className="grid grid-cols-2 gap-6 mt-15 mb-34">
          <div className="relative bg-black rounded overflow-hidden">
            <img
              src={ps5}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-semibold mb-2">
                PlayStation 5
              </h3>

              <p className="text-sm mb-4 max-w-[250px]">
                Black and White version of the PS5 coming out on sale.
              </p>

              <button className="border-b cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>

          


          <div className="grid grid-rows-2 gap-6">

            {/* Women */}
            <div className="relative bg-black rounded overflow-hidden">
              <img
                src={women}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">
                  Women's Collections
                </h3>

                <p className="text-sm mb-4 max-w-[250px]">
                  Featured woman collections that give you another vibe.
                </p>

                <button className="border-b cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>

           


            <div className="grid grid-cols-2 gap-6">

              


              <div className="relative bg-black rounded overflow-hidden">
                <img
                  src={speaker}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">
                    Speakers
                  </h3>

                  <p className="text-xs my-2">
                    Amazon wireless speakers
                  </p>

                  <button className="border-b text-sm cursor-pointer">
                    Shop Now
                  </button>
                </div>
              </div>

              


              <div className="relative bg-black rounded overflow-hidden">
                <img
                  src={perfume}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">
                    Perfume
                  </h3>

                  <p className="text-xs my-2">
                    GUCCI INTENSE OUD EDP
                  </p>

                  <button className="border-b text-sm cursor-pointer">
                    Shop Now
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </Container>    
    </div>
   
  );
};

export default NewArrival;