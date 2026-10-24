import React, { useState, useEffect, useRef } from "react";
import Container from "../CommonComponents/Container";
import logo from "../../assets/Logo (3).png";
import { LuSearch, LuUser } from "react-icons/lu";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  IoCartOutline,
  IoHeartOutline,
  IoBagHandleOutline,
  IoCloseCircleOutline,
  IoStarOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const hideIconsOn = ["/signuppage", "/login"];
  const isSignupPage = hideIconsOn.includes(location.pathname.toLowerCase());

  // login অবস্থা AuthContext থেকে আসছে
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;

  // উইশলিস্ট ও কার্টের ডাটা
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="border-b">
      <Container className="px-0">
        <nav className="flex items-center justify-between py-7 relative">
          <div className="pl-2 lg:pl-0">
            <img src={logo} alt="" />
          </div>
          <ul
            className={`${show ? "block" : "hidden"} z-10 p-4 absolute lg:static bottom-[-129%] left-0 bg-black lg:bg-transparent w-full lg:w-max text-white lg:text-black lg:flex items-center gap-12 slide`}
          >
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" end>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" end>
                About
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to="/SignupPage" end>
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>
          <div className="hidden lg:flex gap-6">
            <div className="w-60.75 bg-[#F5F5F5] relative items-center">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="py-1.75 pl-5 w-60.75 outline-0"
              />
              <LuSearch className="absolute top-2 right-0 text-2xl" />
            </div>
            {!isSignupPage && (
              <div className="hidden lg:flex items-center gap-4">
                {/* উইশলিস্ট হার্ট আইকন এবং কাউন্টার */}
                <NavLink to="/wishlist" className="relative block">
                  <IoHeartOutline className="text-3xl" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-2 w-4.5 h-4.5 bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>

                {/* কার্ট আইকন এবং কাউন্টার */}
                <NavLink to="/cart" className="relative block">
                  <IoCartOutline className="text-3xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 w-4.5 h-4.5 bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                {/* প্রোফাইল ড্রপডাউন */}
                {isLoggedIn && (
                  <div className="relative" ref={dropdownRef}>
                    <div
                      onClick={() => setShowDropdown(!showDropdown)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#DB4444] hover:text-white ${
                        showDropdown
                          ? "bg-[#DB4444] text-white"
                          : "bg-transparent text-black"
                      }`}
                    >
                      <LuUser className="text-xl" />
                    </div>

                    {showDropdown && (
                      <ul className="absolute right-0 top-12 z-20 w-56 grid gap-4 p-5 rounded-sm text-white text-sm bg-linear-to-br from-[#6b4a7a] via-[#2b2b2b] to-black backdrop-blur-md">
                        <li
                          onClick={() => {
                            navigate("/account");
                            setShowDropdown(false);
                          }}
                          className="flex items-center gap-4 cursor-pointer hover:opacity-70"
                        >
                          <LuUser className="text-2xl" /> Manage My Account
                        </li>
                        <li className="flex items-center gap-4 cursor-pointer hover:opacity-70">
                          <IoBagHandleOutline className="text-2xl" /> My Order
                        </li>
                        <li className="flex items-center gap-4 cursor-pointer hover:opacity-70">
                          <IoCloseCircleOutline className="text-2xl" /> My
                          Cancellations
                        </li>
                        <li className="flex items-center gap-4 cursor-pointer hover:opacity-70">
                          <IoStarOutline className="text-2xl" /> My Reviews
                        </li>
                        <li
                          onClick={handleLogout}
                          className="flex items-center gap-4 cursor-pointer hover:opacity-70"
                        >
                          <IoLogOutOutline className="text-2xl" /> Logout
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <AiOutlineBars
            onClick={() => setShow(!show)}
            className="lg:hidden block text-2xl pr-2 lg:pr-0"
          />
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;