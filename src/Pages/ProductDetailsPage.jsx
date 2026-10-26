import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import {
  IoHeartOutline,
  IoCarOutline,
  IoSyncOutline,
  IoRemoveOutline,
  IoAddOutline,
} from "react-icons/io5";

import Container from "../Components/CommonComponents/Container";
import ProductGallery from "../Components/ProductDetails/ProductGallery";
import RelatedItems from "../Components/ProductDetails/RelatedItems";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#202020");
  const [selectedSize, setSelectedSize] = useState("M");

  // ডান পাশের কন্টেন্টের উচ্চতা মাপার জন্য
  const rightRef = useRef(null);
  const [rightHeight, setRightHeight] = useState(null);

  const colors = [
    { name: "Black", value: "#202020" },
    { name: "Red", value: "#DB4444" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);

        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduct(response.data);
      } catch (err) {
        console.error("Product loading error:", err);
        setError("Product could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // ডান পাশের উচ্চতা মেপে বাঁ পাশের গ্যালারিকে সেই উচ্চতা দেওয়া (৭৬৮px থেকে)
  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setRightHeight(mq.matches ? el.offsetHeight : null);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    mq.addEventListener("change", update);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", update);
    };
  }, [product]);

  // login না থাকলে Login পেজে পাঠাবে, login করলে এই পেজেই ফিরবে
  const requireLogin = (action) => {
    if (!currentUser) {
      navigate("/Login", {
        state: { from: location },
      });
      return;
    }

    action();
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    requireLogin(() => {
      addToCart({ ...product, quantity });
    });
  };

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;

    requireLogin(() => {
      addToCart({ ...product, quantity });
      navigate("/Checkout");
    });
  };

  const handleWishlist = () => {
    if (!product) return;

    requireLogin(() => {
      toggleWishlist(product);
    });
  };

  if (loading) {
    return (
      <Container>
        <div className="py-20 text-center text-gray-500">
          Loading product...
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-red-500">{error || "Product not found."}</p>

          <Link
            to="/Products"
            className="mt-4 inline-block rounded bg-[#DB4444] px-5 py-2 text-white"
          >
            Back to Products
          </Link>
        </div>
      </Container>
    );
  }

  const rating = Number(product.rating || 0);
  const stock = Number(product.stock || 0);
  const price = Number(product.price || 0);
  const discount = Number(product.discountPercentage || 0);
  const liked = isInWishlist(product.id);

  const originalPrice =
    discount > 0 && discount < 100
      ? (price / (1 - discount / 100)).toFixed(2)
      : price.toFixed(2);

  return (
    <>
      <Container>
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 py-6 text-xs sm:py-8 sm:text-sm">
          <Link to="/" className="text-gray-400 transition hover:text-black">
            Home
          </Link>

          <span className="text-gray-400">/</span>

          <Link
            to="/Products"
            className="text-gray-400 transition hover:text-black"
          >
            {product.category}
          </Link>

          <span className="text-gray-400">/</span>

          <span className="max-w-[220px] truncate text-black sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Product Layout */}
        <section className="grid grid-cols-1 items-start gap-8 pb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:gap-6 lg:grid-cols-[55%_45%] lg:gap-0 lg:pb-16">
          {/* LEFT: Product Images
              ৭৬৮px থেকে উচ্চতা ঠিক ডান পাশের কন্টেন্টের সমান */}
          <div
            className="w-full min-w-0 md:pr-5 lg:pr-8"
            style={rightHeight ? { height: rightHeight } : undefined}
          >
            <ProductGallery product={product} />
          </div>

          {/* RIGHT: Product Information */}
          <div ref={rightRef} className="w-full min-w-0 md:pl-2 lg:pl-8">
            {/* Product Title */}
            <h1 className="break-words text-xl font-semibold leading-snug sm:text-2xl">
              {product.title}
            </h1>

            {/* Rating and Stock */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <div className="flex items-center gap-1 text-[#FFAD33]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= Math.round(rating) ? "" : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-gray-400">
                ({product.reviews?.length || 0} Reviews)
              </span>

              <span className="text-gray-300">|</span>

              <span className={stock > 0 ? "text-green-600" : "text-red-500"}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-medium">
                ${price.toFixed(2)}
              </span>

              {discount > 0 && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${originalPrice}
                  </span>

                  <span className="rounded bg-[#DB4444] px-2 py-1 text-xs text-white">
                    -{Math.round(discount)}%
                  </span>
                </>
              )}
            </div>

            {/* Description: লম্বা হলে সর্বোচ্চ ৪ লাইন */}
            <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600">
              {product.description}
            </p>

            <div className="my-5 border-t border-gray-300" />

            {/* Colours */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm sm:text-base">Colours:</span>

              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColor === color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-5 w-5 rounded-full border-2 transition ${
                    selectedColor === color.value
                      ? "border-white ring-1 ring-gray-700"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>

            {/* Sizes */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm sm:text-base">Size:</span>

              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded px-2 text-xs transition ${
                    selectedSize === size
                      ? "border border-[#DB4444] bg-[#DB4444] text-white"
                      : "border border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex h-10 items-center overflow-hidden rounded border border-gray-300">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-full w-9 items-center justify-center disabled:opacity-40"
                >
                  <IoRemoveOutline />
                </button>

                <span className="flex h-full min-w-10 items-center justify-center border-x border-gray-300 px-2">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= stock}
                  onClick={() =>
                    setQuantity((current) => Math.min(stock, current + 1))
                  }
                  className="flex h-full w-9 items-center justify-center bg-[#DB4444] text-white disabled:opacity-40"
                >
                  <IoAddOutline />
                </button>
              </div>

              <button
                type="button"
                disabled={stock <= 0}
                onClick={handleBuyNow}
                className="h-10 flex-1 rounded bg-[#DB4444] px-4 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-7"
              >
                Buy Now
              </button>

              <button
                type="button"
                aria-label="Toggle wishlist"
                aria-pressed={liked}
                onClick={handleWishlist}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-gray-300 transition hover:border-[#DB4444]"
              >
                {liked ? (
                  <FaHeart className="text-[#DB4444]" />
                ) : (
                  <IoHeartOutline className="text-xl" />
                )}
              </button>
            </div>

            {/* Delivery Information */}
            <div className="mt-6 rounded-sm border border-gray-300">
              <div className="flex items-center gap-4 p-4 sm:p-5">
                <IoCarOutline className="shrink-0 text-2xl" />

                <div className="min-w-0">
                  <h3 className="text-sm font-medium">Free Delivery</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Enter your postal code for delivery availability.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-300" />

              <div className="flex items-center gap-4 p-4 sm:p-5">
                <IoSyncOutline className="shrink-0 text-2xl" />

                <div className="min-w-0">
                  <h3 className="text-sm font-medium">Return Delivery</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Free 30-day returns. Details.
                  </p>
                </div>
              </div>
            </div>

            {/* Add To Cart */}
            <button
              type="button"
              disabled={stock <= 0}
              onClick={handleAddToCart}
              className="mt-4 w-full rounded-sm border border-gray-300 py-3 text-sm font-medium transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add To Cart
            </button>
          </div>
        </section>
      </Container>

      {/* একই category-র আরও প্রোডাক্ট, এই প্রোডাক্টটা বাদে */}
      <RelatedItems />
    </>
  );
};

export default ProductDetailsPage;