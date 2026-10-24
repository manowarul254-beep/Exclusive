import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { IoEyeOutline, IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductsCard = ({ product, type = "default", onRemove }) => {
  const { title, thumbnail, price, rating, discountPercentage } = product;
  const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const liked = isInWishlist(product.id);
  const discount = Math.round(discountPercentage);
  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  // login না থাকলে Login পেজে পাঠাবে, থাকলে কাজটা করবে
  const requireLogin = (action) => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    action();
  };

  return (
    <div className="w-67.5 group">
      <div className="relative">
        <div className="overflow-hidden relative bg-[#F5F5F5]">
          <img src={thumbnail} alt={title} />

          <button
            onClick={() => requireLogin(() => addToCart(product))}
            className="py-2 w-full bg-black font-medium text-white absolute -bottom-10.5 group-hover:bottom-0 left-0 duration-200 ease-linear flex items-center justify-center gap-2 cursor-pointer"
          >
            <IoCartOutline className="text-xl" />
            Add To Cart
          </button>
        </div>

        <div className="flex justify-between px-3 absolute top-3 left-0 w-full">
          <div>
            <span className="py-1 px-3 bg-primary rounded-sm text-xs text-white">
              -{discount}%
            </span>
          </div>

          <div className="space-y-2">
            {type === "wishlist" && (
              <button
                onClick={() =>
                  onRemove ? onRemove() : removeFromWishlist(product.id)
                }
                className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                <IoTrashOutline className="text-lg" />
              </button>
            )}

            {/* হার্ট বাটন: default আর justforyou দুই জায়গাতেই কাজ করবে */}
            {(type === "default" || type === "justforyou") && (
              <button
                onClick={() => requireLogin(() => toggleWishlist(product))}
                className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                {liked ? (
                  <FaHeart className="text-base text-primary" />
                ) : (
                  <CiHeart className="text-lg" />
                )}
              </button>
            )}

            {(type === "default" || type === "justforyou") && (
              <div className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer">
                <IoEyeOutline className="text-lg" />
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-start line-clamp-1">{title}</h3>
      <div className="flex gap-3 my-2">
        <h4 className="text-primary">${price}</h4>
        <h4 className="text-[#424040] line-through">${originalPrice}</h4>
      </div>

      {type !== "wishlist" && (
        <div className="flex text-amber-300 items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.round(rating) ? "" : "text-gray-300"}
            />
          ))}
          <span className="text-[#424040] ml-1">({rating})</span>
        </div>
      )}
    </div>
  );
};

export default ProductsCard;