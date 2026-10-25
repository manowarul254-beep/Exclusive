import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const SearchBox = ({ className = "", onDone }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  // টাইপ থামার ০.৩ সেকেন্ড পরে খুঁজবে, প্রতি অক্ষরে নয়
  useEffect(() => {
    const q = query.trim();

    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=5`
        );
        setResults(res.data.products);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // বক্সের বাইরে ক্লিক করলে তালিকা বন্ধ হবে
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Products পেজে খোঁজার ফল দেখাতে নিয়ে যাওয়া
  const goSearch = (text) => {
    const q = text.trim();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
    setQuery("");
    setResults([]);
    setOpen(false);
    if (onDone) onDone();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goSearch(query);
  };

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#F5F5F5] rounded-sm"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="What are you looking for?"
          className="w-full py-2 pl-4 pr-10 bg-transparent outline-0 text-sm"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
        >
          <LuSearch className="text-xl" />
        </button>
      </form>

      {/* ভেসে ওঠা পরামর্শের তালিকা */}
      {open && query.trim() && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-64 z-50 bg-white rounded-md border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden">
          {loading ? (
            <p className="px-4 py-3 text-sm text-gray-500">খোঁজা হচ্ছে...</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              কোনো প্রোডাক্ট পাওয়া যায়নি
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => goSearch(item.title)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-10 h-10 object-contain bg-[#F5F5F5] rounded-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm truncate">{item.title}</p>
                    <p className="text-xs text-[#DB4444]">${item.price}</p>
                  </div>
                </li>
              ))}

              <li
                onClick={() => goSearch(query)}
                className="px-4 py-2.5 text-sm text-center font-medium text-[#DB4444] border-t border-gray-100 cursor-pointer hover:bg-gray-50"
              >
                সব ফলাফল দেখুন
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;