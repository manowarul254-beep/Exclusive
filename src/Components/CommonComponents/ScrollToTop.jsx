import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// browser-কে স্ক্রল-অবস্থান মনে রাখতে মানা করা
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // প্রথমবার লোড (refresh) আর প্রতিবার পেজ বদলালে ওপরে যাবে
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;