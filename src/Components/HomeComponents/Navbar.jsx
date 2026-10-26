import React, { useState, useEffect, useRef } from "react";
import Container from "../CommonComponents/Container";
import SearchBox from "../CommonComponents/SearchBox";
import logo from "../../assets/Logo (3).png";
import { LuUser } from "react-icons/lu";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  IoCartOutline,
  IoHeartOutline,
  IoBagHandleOutline,
  IoCloseCircleOutline,
  IoStarOutline,
  IoLogOutOutline,
  IoClose,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// পেজের লিংক এক জায়গায়
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/products" },
];

// account মেনুর লিংক (ডেস্কটপ ড্রপডাউন আর মোবাইল মেনু দুটোতেই ব্যবহার হবে)
const accountItems = [
  { label: "Manage My Account", icon: LuUser, to: "/account" },
  { label: "My Order", icon: IoBagHandleOutline },
  { label: "My Cancellations", icon: IoCloseCircleOutline },
  { label: "My Reviews", icon: IoStarOutline },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const hideIconsOn = ["/signuppage", "/login"];
  const isSignupPage = hideIconsOn.includes(location.pathname.toLowerCase());

  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;

  const { theme, toggleTheme } = useTheme();

  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // পেজ বদলালে মেনু নিজে থেকে বন্ধ হবে
  useEffect(() => {
    setShow(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // মেনু বা ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const goTo = (path) => {
    if (path) navigate(path);
    setShow(false);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setShow(false);
    setShowDropdown(false);
    navigate("/login");
  };

  // ডেস্কটপ লিংকে বর্তমান পেজ লাল দেখাবে
  const desktopLinkClass = ({ isActive }) =>
    isActive ? "text-[#DB4444]" : "";

  // মোবাইল মেনুর লিংক
  const mobileLinkClass = ({ isActive }) =>
    `block py-3 border-b border-gray-100 transition-colors duration-200 ${
      isActive ? "text-[#DB4444] font-medium" : "text-black"
    }`;

  const badgeClass =
    "absolute -top-1 -right-2 w-4.5 h-4.5 bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center";

  return (
    <div className="border-b">
      <Container className="px-0">
        <nav
          ref={navRef}
          className="flex items-center justify-between py-4 lg:py-7 relative px-2.5 lg:px-0"
        >
          {/* লোগো: dark mode-এ উল্টে সাদা হবে */}
          <NavLink to="/" className="shrink-0">
            <img
              src={logo}
              alt="Exclusive"
              className="h-6 sm:h-7 lg:h-auto w-auto dark:invert"
            />
          </NavLink>

          {/* ডেস্কটপ মেনু */}
          <ul className="hidden lg:flex items-center gap-12 slide">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end className={desktopLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            {!isLoggedIn && (
              <li>
                <NavLink to="/SignupPage" end className={desktopLinkClass}>
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>

          {/* ডান দিক: সার্চ, theme বাটন, আইকন, hamburger */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
            {/* সার্চ বক্স শুধু ডেস্কটপে */}
            <SearchBox className="hidden lg:block w-60.75" />

            {/* dark / light বাটন */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="cursor-pointer"
            >
              {theme === "dark" ? (
                <IoSunnyOutline className="text-2xl lg:text-3xl" />
              ) : (
                <IoMoonOutline className="text-2xl lg:text-3xl" />
              )}
            </button>

            {!isSignupPage && (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* উইশলিস্ট */}
                <NavLink to="/wishlist" className="relative block">
                  <IoHeartOutline className="text-2xl lg:text-3xl" />
                  {wishlist.length > 0 && (
                    <span className={badgeClass}>{wishlist.length}</span>
                  )}
                </NavLink>

                {/* কার্ট */}
                <NavLink to="/cart" className="relative block">
                  <IoCartOutline className="text-2xl lg:text-3xl" />
                  {cartCount > 0 && (
                    <span className={badgeClass}>{cartCount}</span>
                  )}
                </NavLink>

                {/* প্রোফাইল ড্রপডাউন শুধু ডেস্কটপে */}
                {isLoggedIn && (
                  <div className="relative hidden lg:block" ref={dropdownRef}>
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
                        {accountItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li
                              key={item.label}
                              onClick={() => goTo(item.to)}
                              className="flex items-center gap-4 cursor-pointer hover:opacity-70"
                            >
                              <Icon className="text-2xl" /> {item.label}
                            </li>
                          );
                        })}
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

            {/* hamburger / বন্ধ করার বাটন */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label="Menu"
              className="lg:hidden cursor-pointer"
            >
              {show ? (
                <IoClose className="text-3xl" />
              ) : (
                <AiOutlineBars className="text-2xl" />
              )}
            </button>
          </div>

          {/* মোবাইল ও ট্যাবলেটের মেনু কার্ড */}
          <div
            className={`lg:hidden absolute top-full left-0 w-full z-30 transition-all duration-300 ${
              show
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="mx-2.5 mt-1 max-h-[75vh] overflow-y-auto bg-white rounded-md border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-5">
              {/* সার্চ: খোঁজার পর মেনু বন্ধ হবে */}
              <SearchBox onDone={() => setShow(false)} />

              {/* পেজের লিংক */}
              <ul className="mt-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} end className={mobileLinkClass}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* login অবস্থা অনুযায়ী নিচের অংশ */}
              {isLoggedIn ? (
                <div className="mt-4">
                  <div className="flex items-center gap-3 pb-3">
                    <div className="w-10 h-10 rounded-full bg-[#DB4444] text-white flex items-center justify-center font-semibold">
                      {currentUser?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.identifier}
                      </p>
                    </div>
                  </div>

                  <ul className="grid">
                    {accountItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={item.label}
                          onClick={() => goTo(item.to)}
                          className="flex items-center gap-3 py-2.5 text-sm cursor-pointer hover:text-[#DB4444] transition-colors duration-200"
                        >
                          <Icon className="text-xl" /> {item.label}
                        </li>
                      );
                    })}
                    <li
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-2.5 text-sm text-[#DB4444] cursor-pointer"
                    >
                      <IoLogOutOutline className="text-xl" /> Logout
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => goTo("/login")}
                    className="py-2.5 border border-gray-400 rounded-sm text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("/SignupPage")}
                    className="py-2.5 bg-[#DB4444] text-white rounded-sm text-sm font-medium cursor-pointer hover:bg-red-600 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;