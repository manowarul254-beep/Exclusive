
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaStar, FaHeart } from "react-icons/fa";
import {
  IoEyeOutline,
  IoCartOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductsCard = ({
  product,
  type = "default",
  onRemove,
}) => {
  const {
    id,
    title,
    thumbnail,
    price,
    rating,
    discountPercentage = 0,
  } = product;

  const { isInWishlist, toggleWishlist, removeFromWishlist } =
    useWishlist();

  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const liked = isInWishlist(id);

  const discount = Math.round(discountPercentage);

  const originalPrice =
    discountPercentage < 100
      ? (price / (1 - discountPercentage / 100)).toFixed(2)
      : Number(price).toFixed(2);

  // Login protection
  const requireLogin = (action) => {
    if (!currentUser) {
      navigate("/Login", {
        state: { from: location },
      });
      return;
    }

    action();
  };

  // Open Product Details
  const handleProductDetails = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="w-full min-w-0 max-w-67.5 mx-auto group">
      <div className="relative">
        {/* Product Image */}
        <div className="overflow-hidden relative bg-[#F5F5F5]">
          <button
            type="button"
            onClick={handleProductDetails}
            className="block w-full cursor-pointer"
            aria-label={`View ${title} details`}
          >
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="w-full aspect-square object-contain"
            />
          </button>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={() => requireLogin(() => addToCart(product))}
            className="py-2 w-full bg-black font-medium text-white text-sm lg:text-base absolute bottom-0 lg:-bottom-10.5 lg:group-hover:bottom-0 left-0 duration-200 ease-linear flex items-center justify-center gap-2 cursor-pointer"
          >
            <IoCartOutline className="text-lg lg:text-xl" />
            Add To Cart
          </button>
        </div>

        {/* Discount & Actions */}
        <div className="flex justify-between px-2 lg:px-3 absolute top-2 lg:top-3 left-0 w-full pointer-events-none">
          <div>
            {discount > 0 && (
              <span className="py-1 px-2 lg:px-3 bg-primary rounded-sm text-xs text-white">
                -{discount}%
              </span>
            )}
          </div>

          <div className="space-y-2 pointer-events-auto">
            {/* Remove from Wishlist */}
            {type === "wishlist" && (
              <button
                type="button"
                onClick={() =>
                  onRemove
                    ? onRemove()
                    : removeFromWishlist(id)
                }
                aria-label="Remove from wishlist"
                className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                <IoTrashOutline className="text-lg" />
              </button>
            )}

            {/* Wishlist Button */}
            {(type === "default" || type === "justforyou") && (
              <button
                type="button"
                onClick={() =>
                  requireLogin(() => toggleWishlist(product))
                }
                aria-label="Toggle wishlist"
                className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                {liked ? (
                  <FaHeart className="text-base text-primary" />
                ) : (
                  <CiHeart className="text-lg" />
                )}
              </button>
            )}

            {/* Product Details / Quick View */}
            {(type === "default" || type === "justforyou") && (
              <button
                type="button"
                onClick={handleProductDetails}
                aria-label="View product details"
                className="w-8.5 h-8.5 rounded-full bg-white flex justify-center items-center cursor-pointer hover:text-primary"
              >
                <IoEyeOutline className="text-lg" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Title */}
      <button
        type="button"
        onClick={handleProductDetails}
        className="mt-4 block w-full text-left line-clamp-1 text-sm lg:text-base cursor-pointer hover:text-primary"
      >
        {title}
      </button>

      {/* Price */}
      <div className="flex flex-wrap gap-3 my-2 text-sm lg:text-base">
        <h4 className="text-primary">${price}</h4>

        {discount > 0 && (
          <h4 className="text-[#424040] line-through">
            ${originalPrice}
          </h4>
        )}
      </div>

      {/* Rating */}
      {type !== "wishlist" && (
        <div className="flex flex-wrap text-amber-300 items-center gap-1 text-sm lg:text-base">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(rating)
                  ? ""
                  : "text-gray-300"
              }
            />
          ))}

          <span className="text-[#424040] ml-1">
            ({rating})
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductsCard;
