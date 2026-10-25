import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../Components/CommonComponents/Container";
import signupImg from "../assets/signup.png";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // protected পেজ থেকে এলে login-এর পর সেখানেই ফিরবে
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
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

    const result = await login({
      identifier: formData.emailOrPhone,
      password: formData.password,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <Container>
      <div className="grid lg:grid-cols-[minmax(0,630px)_1fr] items-center gap-10 lg:gap-0 pb-10 lg:pb-20 mt-20">
        {/* বাঁ পাশের ছবি: ডিজাইনের মাপ ৬৩০ × ৭৫২px */}
        <div className="hidden lg:block">
          <img
            src={signupImg}
            alt="Shopping cart and phone"
            className="w-full h-188 object-cover rounded-sm"
          />
        </div>

        {/* ডান পাশের ফর্ম */}
        <div className="flex justify-center lg:justify-start lg:pl-32 px-2 sm:px-4 lg:px-0 lg:pl-32 pt-6 lg:pt-0">
          <div className="w-full max-w-92.5">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-wide">
              Log in to Exclusive
            </h2>
            <p className="mt-6 text-base">Enter your details below</p>

            {/* protected পেজ থেকে পাঠানো হলে কারণ জানানো */}
            {location.state?.from && (
              <p className="mt-4 text-sm text-gray-500">
                এগিয়ে যেতে আগে login করুন
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-10 grid gap-8">
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
                className="w-full border-b border-gray-400 py-2 outline-0 placeholder:text-gray-400 focus:border-black"
              />

              {error && <p className="text-[#DB4444] text-sm -mt-4">{error}</p>}

              {/* Log In বাটন ও Forget Password পাশাপাশি */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-red-600"
                >
                  Log In
                </button>

                <button
                  type="button"
                  className="text-[#DB4444] cursor-pointer hover:underline"
                >
                  Forget Password?
                </button>
              </div>
            </form>

            <p className="mt-8 flex justify-center items-center gap-4 text-gray-600">
              Don't have an account?
              <NavLink
                to="/SignupPage"
                state={location.state}
                className="text-black border-b border-gray-400 pb-0.5 hover:border-black"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;