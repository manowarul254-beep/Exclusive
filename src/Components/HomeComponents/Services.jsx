import React from "react";
import Container from "../CommonComponents/Container";
import { FaShieldAlt } from "react-icons/fa";
import { CiHeadphones } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";

const services = [
  {
    icon: TbTruckDelivery,
    title: "FREE AND FAST DELIVERY",
    text: "Free delivery for all orders over $140",
  },
  {
    icon: CiHeadphones,
    title: "24/7 CUSTOMER SERVICE",
    text: "Friendly 24/7 customer support",
  },
  {
    icon: FaShieldAlt,
    title: "MONEY BACK GUARANTEE",
    text: "We return money within 30 days",
  },
];

const Services = () => {
  return (
    <div className="py-10 lg:py-20">
      <Container>
        {/* মোবাইলে একটার নিচে আরেকটা, ট্যাবলেট থেকে ৩ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center mx-auto">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex justify-center items-center text-2xl">
                    <Icon />
                  </div>
                </div>

                <h3 className="font-semibold mt-6">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-2">{item.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Services;