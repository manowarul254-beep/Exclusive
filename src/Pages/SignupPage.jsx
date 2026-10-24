import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signupImg from "../assets/signup.png";
import Btn from "../Components/CommonComponents/Btn";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();

  // protected পেজ থেকে এলে account খোলার পর সেখানেই ফিরবে
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signup({
      name: formData.name,
      identifier: formData.emailOrPhone,
      password: formData.password,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    // account তৈরি হয়ে নিজে থেকে login হয়ে গেছে
    navigate(from, { replace: true });
  };

  return (
    <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-0 pb-20">
      {/* বাঁ পাশের ছবি */}
      <div className="hidden lg:block">
        <img
          src={signupImg}
          alt="Shopping cart and phone"
          className="w-full h-[781px] object-cover rounded-br-sm"
        />
      </div>

      {/* ডান পাশের ফর্ম */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-92.5">
          <h2 className="text-4xl font-medium tracking-wide">
            Create an account
          </h2>
          <p className="mt-6 text-base">Enter your details below</p>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-8">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full border-b border-gray-400 py-2 outline-0 placeholder:text-gray-400 focus:border-black"
            />
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              required
              className="w-full border-b border-gray-400 py-2 outline-0 placeholder:text-gray-400 focus:border-black"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={6}
              className="w-full border-b border-gray-400 py-2 outline-0 placeholder:text-gray-400 focus:border-black"
            />

            {error && <p className="text-[#DB4444] text-sm -mt-4">{error}</p>}

            <div className="grid gap-4">
              <Btn
                type="submit"
                className="w-full mt-0 hover:bg-red-600 transition-colors duration-200"
              >
                Create Account
              </Btn>

              <Btn
                type="button"
                className="w-full mt-0 bg-white text-black flex items-center justify-center gap-4 border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
              >
                <FcGoogle className="text-2xl" />
                Sign up with Google
              </Btn>
            </div>
          </form>

          <p className="mt-8 flex justify-center items-center gap-4 text-gray-600">
            Already have account?
            <NavLink
              to="/login"
              state={location.state}
              className="text-black border-b border-gray-400 pb-0.5 hover:border-black"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;