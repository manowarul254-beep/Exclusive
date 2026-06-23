import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { CiHeadphones } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";


const Services = () => {
  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between">

          
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center mx-auto">
              <div className="w-14 h-14 rounded-full bg-black text-white flex justify-center items-center text-2xl">
                <TbTruckDelivery />

              </div>
            </div>

            <h3 className="font-semibold mt-6">
              FREE AND FAST DELIVERY
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Free delivery for all orders over $140
            </p>
          </div>


         
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center mx-auto">
              <div className="w-14 h-14 rounded-full bg-black text-white flex justify-center items-center text-2xl">
               <CiHeadphones />
              </div>
            </div>

            <h3 className="font-semibold mt-6">
              24/7 CUSTOMER SERVICE
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Friendly 24/7 customer support
            </p>
          </div>


         
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center mx-auto">
              <div className="w-14 h-14 rounded-full bg-black text-white flex justify-center items-center text-2xl">
                <FaShieldAlt />
              </div>
            </div>

            <h3 className="font-semibold mt-6">
              MONEY BACK GUARANTEE
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              We return money within 30 days
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Services;