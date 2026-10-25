
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Container from "../Components/CommonComponents/Container";
import ProductsCard from "../Components/CommonComponents/ProductsCard";
import Btn from "../Components/CommonComponents/Btn";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();

  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addManyToCart } = useCart();

  const [justForYou, setJustForYou] = useState([]);

  // Just For You products fetch
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products?limit=8"
        );

        setJustForYou(res.data.products.slice(4, 8));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProducts();
  }, []);

  // Move all wishlist products to cart
  const handleMoveAll = () => {
    if (wishlist.length === 0) return;

    addManyToCart(wishlist);
    clearWishlist();
  };

  return (
    <Container>
      {/* Wishlist Section */}
      <section className="pt-12 sm:pt-16 lg:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-medium">
            Wishlist ({wishlist.length})
          </h3>

          <Btn
            onClick={handleMoveAll}
            className="mt-0 mx-0 px-4 py-2.5 sm:px-8 sm:py-3 lg:px-12 lg:py-4 bg-white text-black border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
          >
            Move All To Bag
          </Btn>
        </div>

        {wishlist.length === 0 ? (
          <p className="py-16 sm:py-20 text-center text-gray-500">
            আপনার উইশলিস্ট খালি
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7.5 pt-8 sm:pt-12 lg:pt-15">
            {wishlist.map((product) => (
              <ProductsCard
                key={product.id}
                product={product}
                type="wishlist"
                onRemove={() => removeFromWishlist(product.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Just For You Section */}
      <section className="pt-14 sm:pt-16 lg:pt-20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="w-4 sm:w-5 h-8 sm:h-10 shrink-0 bg-[#DB4444] rounded-sm" />

            <h3 className="text-lg sm:text-xl font-medium">
              Just For You
            </h3>
          </div>

          <Btn
            onClick={() => navigate("/products")}
            className="mt-0 mx-0 shrink-0 px-4 py-2.5 sm:px-8 sm:py-3 lg:px-12 lg:py-4 bg-white text-black border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
          >
            See All
          </Btn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7.5 pt-8 sm:pt-12 lg:pt-15 pb-12 sm:pb-16 lg:pb-20">
          {justForYou.map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
              type="justforyou"
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Wishlist;
