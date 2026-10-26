import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// id যে ধরনেরই হোক, লেখা বানিয়ে তুলনা করা
const same = (a, b) => String(a) === String(b);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // একটা প্রোডাক্ট কার্টে যোগ করা (product.quantity থাকলে সেই সংখ্যা, নইলে ১)
  const addToCart = (product) => {
    const qty = Number(product.quantity) || 1;

    setCart((prev) => {
      const exists = prev.find((item) => same(item.id, product.id));

      if (exists) {
        return prev.map((item) =>
          same(item.id, product.id)
            ? { ...item, quantity: (item.quantity || 1) + qty }
            : item
        );
      }

      return [...prev, { ...product, quantity: qty }];
    });
  };

  // অনেকগুলো প্রোডাক্ট একসাথে কার্টে যোগ করা (Move All To Bag এর জন্য)
  const addManyToCart = (products) => {
    setCart((prev) => {
      let updated = [...prev];

      products.forEach((product) => {
        const qty = Number(product.quantity) || 1;
        const exists = updated.find((item) => same(item.id, product.id));

        if (exists) {
          updated = updated.map((item) =>
            same(item.id, product.id)
              ? { ...item, quantity: (item.quantity || 1) + qty }
              : item
          );
        } else {
          updated.push({ ...product, quantity: qty });
        }
      });

      return updated;
    });
  };

  // নির্দিষ্ট প্রোডাক্টের quantity বদলানো
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        same(item.id, id)
          ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => !same(item.id, id)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addManyToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};