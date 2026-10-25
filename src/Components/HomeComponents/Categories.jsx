import React from "react";
import Container from "../CommonComponents/Container";
import SecHead from "../CommonComponents/SecHead";
import CategoryBox from "../CommonComponents/CategoryBox";
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { TbDeviceWatchStats } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { TbDeviceGamepad } from "react-icons/tb";

const categories = [
  { title: "Phones", icon: IoIosPhonePortrait },
  { title: "Computers", icon: HiOutlineComputerDesktop },
  { title: "SmartWatch", icon: TbDeviceWatchStats },
  { title: "Camera", icon: CiCamera },
  { title: "HeadPhones", icon: CiHeadphones },
  { title: "Gaming", icon: TbDeviceGamepad },
];

const Categories = () => {
  return (
    <div>
      <Container>
        <SecHead title="Categories" heading="Browse By Category" />

        <div className="my-8 lg:my-15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-7.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <CategoryBox key={cat.title} title={cat.title}>
                <Icon className="text-4xl md:text-[56px] group-hover:text-white" />
              </CategoryBox>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Categories;