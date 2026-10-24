import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // প্রোডাক্ট উইশলিস্টে আছে কিনা চেক
  const isInWishlist = (id) => {
    return wishlist.some((item) => Number(item.id) === Number(id));
  };

  // উইশলিস্টে যোগ বা বাদ দেওয়া
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => Number(item.id) === Number(product.id));

      if (exists) {
        return prev.filter((item) => Number(item.id) !== Number(product.id));
      }

      return [...prev, product];
    });
  };

  // একটা প্রোডাক্ট উইশলিস্ট থেকে সরানো
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  // পুরো উইশলিস্ট খালি করা
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
};