import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoChevronUp, IoChevronDown } from "react-icons/io5";
import Container from "../Components/CommonComponents/Container";
import { useCart } from "../context/CartContext";

// দাম সুন্দরভাবে দেখানো: ৬৫০ হলে $650, ১২.৫ হলে $12.50
const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(2));

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Update Cart চাপার আগ পর্যন্ত quantity এখানে জমা থাকবে
  const [quantities, setQuantities] = useState({});
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const q = {};
    cart.forEach((item) => {
      q[item.id] = item.quantity || 1;
    });
    setQuantities(q);
  }, [cart]);

  const getQty = (item) => quantities[item.id] ?? item.quantity ?? 1;

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleUpdateCart = () => {
    cart.forEach((item) => {
      updateQuantity(item.id, getQty(item));
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * getQty(item),
    0,
  );

  if (cart.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center px-4">
          <h2 className="text-xl sm:text-2xl font-medium mb-6">
            আপনার কার্ট খালি
          </h2>
          <Link
            to="/products"
            className="inline-block bg-[#DB4444] text-white px-8 sm:px-12 py-4 rounded-sm"
          >
            Return To Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-10 md:pt-20 pb-20">
        {/* টেবিল হেডার: শুধু ট্যাবলেট ও বড় স্ক্রিনে */}
        <div className="hidden md:grid grid-cols-4 items-center px-10 py-6 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="text-right">Subtotal</p>
        </div>

        {/* প্রোডাক্টের সারি */}
        <div className="grid gap-6 md:gap-10 md:mt-10">
          {cart.map((item) => {
            const qty = getQty(item);
            const price = Number(item.price);

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 px-4 sm:px-6 md:px-10 py-5 md:py-6 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm"
              >
                {/* ছবি, নাম ও রিমুভ বাটন */}
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={item.imgSrc || item.thumbnail || item.image}
                      alt={item.title}
                      className="w-14 h-14 md:w-12 md:h-12 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#DB4444] text-white flex items-center justify-center cursor-pointer"
                    >
                      <IoClose className="text-sm" />
                    </button>
                  </div>
                  <p className="line-clamp-2">{item.title}</p>
                </div>

                {/* দাম */}
                <div className="flex items-center justify-between md:block">
                  <span className="md:hidden text-gray-500">Price:</span>
                  <p>${fmt(price)}</p>
                </div>

                {/* Quantity বাটন */}
                <div className="flex items-center justify-between md:block">
                  <span className="md:hidden text-gray-500">Quantity:</span>
                  <div className="flex items-center justify-between w-18.5 h-11.5 px-3 border border-gray-400 rounded-sm">
                    <span>{String(qty).padStart(2, "0")}</span>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => changeQty(item.id, 1)}
                        className="cursor-pointer"
                      >
                        <IoChevronUp className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={() => changeQty(item.id, -1)}
                        className="cursor-pointer"
                      >
                        <IoChevronDown className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between md:block md:text-right">
                  <span className="md:hidden text-gray-500">Subtotal:</span>
                  <p>${fmt(price * qty)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Return To Shop ও Update Cart */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-8 sm:px-12 py-4 border border-gray-400 rounded-sm font-medium hover:bg-gray-100 duration-200 cursor-pointer"
          >
            Return To Shop
          </button>
          <button
            type="button"
            onClick={handleUpdateCart}
            className="px-8 sm:px-12 py-4 border border-gray-400 rounded-sm font-medium hover:bg-gray-100 duration-200 cursor-pointer"
          >
            Update Cart
          </button>
        </div>

        {/* Coupon ও Cart Total */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-10 mt-12 md:mt-20">
          {/* Coupon */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon Code"
              className="w-full sm:w-75 py-4 px-6 border border-black rounded-sm outline-0"
            />
            <button
              type="button"
              className="px-8 sm:px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium cursor-pointer"
            >
              Apply Coupon
            </button>
          </div>

          {/* Cart Total */}
          <div className="w-full lg:w-117.5 border border-black rounded-sm p-5 sm:p-6">
            <h3 className="text-xl font-medium mb-6">Cart Total</h3>

            <div className="flex justify-between pb-4 border-b border-gray-400">
              <p>Subtotal:</p>
              <p>${fmt(subtotal)}</p>
            </div>
            <div className="flex justify-between py-4 border-b border-gray-400">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Total:</p>
              <p>${fmt(subtotal)}</p>
            </div>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium cursor-pointer"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;