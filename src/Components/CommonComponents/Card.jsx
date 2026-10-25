import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const Card = ({
  id,
  imgSrc,
  title,
  price,
  discountPrice,
  ratings,
  percentage,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // cart ও wishlist-এ যে প্রোডাক্ট যাবে তার ডাটা
  const product = {
    id,
    title,
    price,
    discountPrice,
    ratings,
    percentage,
    imgSrc,
    image: imgSrc,
    thumbnail: imgSrc,
  };

  const liked = isInWishlist(id);

  // login না থাকলে Login পেজে পাঠাবে, থাকলে কাজটা করবে
  const requireLogin = (action) => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    action();
  };

  return (
    <div className="w-full max-w-67.5 mx-auto group">
      <div className="relative">
        <div className="overflow-hidden relative bg-[#F5F5F5]">
          <img src={imgSrc} alt={title} className="w-full" />

          {/* মোবাইলে সবসময় দেখাবে, ডেস্কটপে hover করলে ওপরে উঠবে */}
          <button
            onClick={() => requireLogin(() => addToCart(product))}
            className="py-2 w-full bg-black font-medium text-white text-sm lg:text-base absolute bottom-0 lg:-bottom-10.5 lg:group-hover:bottom-0 left-0 duration-200 ease-linear cursor-pointer"
          >
            Add To Cart
          </button>
        </div>

        <div className="flex justify-between px-2 lg:px-5 absolute top-2 lg:top-5 left-0 w-full">
          <div>
            {percentage && (
              <span className="py-1 px-2 lg:px-4 bg-primary rounded-sm text-xs text-white">
                -{percentage}%
              </span>
            )}
          </div>
          <div className="space-y-2">
            {/* উইশলিস্ট হার্ট */}
            <div
              onClick={() => requireLogin(() => toggleWishlist(product))}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white flex justify-center items-center cursor-pointer"
            >
              {liked ? (
                <FaHeart className="text-lg text-[#DB4444]" />
              ) : (
                <CiHeart className="text-lg" />
              )}
            </div>
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white flex justify-center items-center">
              <IoEyeOutline className="text-lg" />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-start line-clamp-1 text-sm lg:text-base">
        {title}
      </h3>
      <div className="flex gap-3 my-2 text-sm lg:text-base">
        <h4 className="text-primary">${price}</h4>
        <h4 className="text-[#424040] line-through">${discountPrice}</h4>
      </div>
      <div className="flex flex-wrap text-amber-300 items-center gap-1 text-sm lg:text-base">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <span className="text-[#424040]">{ratings}</span>
      </div>
    </div>
  );
};

export default Card;