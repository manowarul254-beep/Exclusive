import React from "react";
import { FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

const ProductsCard = ({product}) => {
    const {title,thumbnail,price,rating,discountPercentage} = product;
    const discountPrice = price * discountPercentage/100
  return (
    <div className="w-67.5 group">
      <div className="relative">
        <div className="overflow-hidden relative">
          <img src={thumbnail} alt="" />
          
          <button className="py-2 w-full bg-black font-medium text-white absolute -bottom-10.5 group-hover:bottom-0 left-0 duration-200 ease-linear">
            Add To Cart
          </button>
        
        </div>
        <div className="flex justify-between px-5 absolute top-5 left-0 w-full">
          <div>
           
            <span className="py-1 px-4 bg-primary rounded-sm text-xs text-white">
              -{discountPercentage}%
            </span> 
        
          </div>
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
              <CiHeart className="text-lg" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
              <IoEyeOutline className="text-lg" />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-start line-clamp-1">{title}</h3>
      <div className="flex gap-3 my-2">
        <h4 className="text-primary">${price}</h4>
        <h4 className="text-[#424040] line-through">${discountPrice}</h4>
      </div>
      <div className="flex text-amber-300 items-center gap-1">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <span className="text-[#424040]">{rating}</span>
      </div>
    </div>
  );
};


export default ProductsCard
