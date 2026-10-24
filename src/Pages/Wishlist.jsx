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

  // আসল wishlist এখন context থেকে আসছে
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addManyToCart } = useCart();

  // "Just For You" অংশ আগের মতো API থেকে
  const [justForYou, setJustForYou] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=8");
      setJustForYou(res.data.products.slice(4, 8));
    };
    getProducts();
  }, []);

  // সবগুলো প্রোডাক্ট cart-এ পাঠানো, তারপর wishlist খালি করা
  const handleMoveAll = () => {
    if (wishlist.length === 0) return;
    addManyToCart(wishlist);
    clearWishlist();
  };

  return (
    <Container>
      {/* উইশলিস্ট অংশ */}
      <div className="flex items-center justify-between pt-20">
        <h3 className="text-xl">Wishlist ({wishlist.length})</h3>
        <Btn
          onClick={handleMoveAll}
          className="mt-0 mx-0 px-12 py-4 bg-white text-black border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
        >
          Move All To Bag
        </Btn>
      </div>

      {wishlist.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          আপনার উইশলিস্ট খালি
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-7.5 pt-15">
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

      {/* Just For You অংশ */}
      <div className="flex items-center justify-between pt-20">
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm" />
          <h3 className="text-xl">Just For You</h3>
        </div>
        <Btn
          onClick={() => navigate("/products")}
          className="mt-0 mx-0 px-12 py-4 bg-white text-black border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
        >
          See All
        </Btn>
      </div>

      <div className="grid grid-cols-4 gap-7.5 pt-15 pb-20">
        {justForYou.map((product) => (
          <ProductsCard
            key={product.id}
            product={product}
            type="justforyou"
          />
        ))}
      </div>
    </Container>
  );
};

export default Wishlist;