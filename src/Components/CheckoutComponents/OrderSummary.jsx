import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(2));

const OrderSummary = ({ cart, paymentMethod, onPaymentChange, onPlaceOrder }) => {
  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="w-full lg:w-117.5 mt-30">
      {/* প্রোডাক্টের তালিকা */}
      <div className="grid gap-8">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={item.imgSrc || item.thumbnail || item.image}
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
              <p>
                {item.title}
                {(item.quantity || 1) > 1 && (
                  <span className="text-gray-500"> x{item.quantity}</span>
                )}
              </p>
            </div>
            <p>${fmt(Number(item.price) * (item.quantity || 1))}</p>
          </div>
        ))}
      </div>

      {/* দামের হিসাব */}
      <div className="mt-8">
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
      </div>

      {/* Payment পদ্ধতি */}
      <div className="grid gap-6 mt-2">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => onPaymentChange(e.target.value)}
              className="w-6 h-6 accent-black"
            />
            <span>Bank</span>
          </div>
          <div className="flex items-center gap-2 text-3xl">
            <span className="text-sm font-bold text-pink-600">bKash</span>
            <FaCcVisa className="text-blue-800" />
            <FaCcMastercard className="text-red-500" />
            <span className="text-sm font-bold text-orange-500">Nagad</span>
          </div>
        </label>

        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="w-6 h-6 accent-black"
          />
          <span>Cash on delivery</span>
        </label>
      </div>

      {/* Coupon */}
      <div className="flex items-center gap-4 mt-8">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon Code"
          className="flex-1 min-w-0 py-4 px-6 border border-black rounded-sm outline-0"
        />
        <button className="px-8 py-4 bg-[#DB4444] text-white rounded-sm font-medium">
          Apply Coupon
        </button>
      </div>

      <button
        onClick={onPlaceOrder}
        className="mt-8 px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
