import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/CommonComponents/Container";
import BillingForm from "../Components/CheckoutComponents/BillingForm";
import OrderSummary from "../Components/CheckoutComponents/OrderSummary";
import { useCart } from "../context/CartContext";

const emptyForm = {
  firstName: "",
  companyName: "",
  street: "",
  apartment: "",
  city: "",
  phone: "",
  email: "",
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  // আগে "Save information" দিয়ে সেভ করা থাকলে সেটা দিয়ে form ভরে দেবে
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("billingInfo");
    return saved ? JSON.parse(saved) : emptyForm;
  });
  const [saveInfo, setSaveInfo] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // দরকারি ঘরগুলো ভরা হয়েছে কিনা দেখা
  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "নাম লিখুন";
    if (!form.street.trim()) newErrors.street = "ঠিকানা লিখুন";
    if (!form.city.trim()) newErrors.city = "শহরের নাম লিখুন";
    if (!form.phone.trim()) newErrors.phone = "ফোন নম্বর লিখুন";
    if (!form.email.trim()) newErrors.email = "ইমেইল লিখুন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    if (saveInfo) {
      localStorage.setItem("billingInfo", JSON.stringify(form));
    } else {
      localStorage.removeItem("billingInfo");
    }

    alert("আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
    clearCart();
    navigate("/");
  };

  // cart খালি থাকলে checkout দেখানোর মানে নেই
  if (cart.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-medium mb-6">আপনার কার্ট খালি</h2>
          <Link
            to="/products"
            className="inline-block bg-[#DB4444] text-white px-12 py-4 rounded-sm"
          >
            Return To Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-20 pb-20">
        {/* Breadcrumb */}
        <p className="text-gray-500 text-sm mb-20">
          Account / My Account / Product /{" "}
          <Link to="/cart" className="hover:underline">
            View Cart
          </Link>{" "}
          / <span className="text-black">CheckOut</span>
        </p>

        <div className="flex flex-col lg:flex-row justify-between gap-16">
          <BillingForm
            form={form}
            onChange={handleChange}
            saveInfo={saveInfo}
            onSaveInfoChange={(e) => setSaveInfo(e.target.checked)}
            errors={errors}
          />

          <OrderSummary
            cart={cart}
            paymentMethod={paymentMethod}
            onPaymentChange={setPaymentMethod}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;