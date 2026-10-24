import Container from "../Components/CommonComponents/Container";
import ProductsCard from "../Components/CommonComponents/ProductsCard";
import BreadCrumb from "../Components/CommonComponents/BreadCrumb";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Components/CommonComponents/Pagination";

// dummyjson-এ color নেই, তাই ডামি রঙের তালিকা
const COLORS = [
  { name: "black", label: "Black", value: "#000000" },
  { name: "red", label: "Red", value: "#FF0000" },
  { name: "green", label: "Green", value: "#00FF40" },
];
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialShow, setInitialShow] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getAllCategories = async () => {
    let data = await axios.get("https://dummyjson.com/products/categories");
    setCategories(data.data);
  };

  const getProducts = async (category) => {
    const url =
      category === "all"
        ? "https://dummyjson.com/products?limit=0"
        : `https://dummyjson.com/products/category/${category}`;

    let data = await axios.get(url);

    // প্রতিটি প্রোডাক্টে ডামি রঙ যোগ করা (id অনুযায়ী ঘুরিয়ে)
    const withColors = data.data.products.map((p) => ({
      ...p,
      color: COLORS[p.id % COLORS.length].name,
    }));
    setProducts(withColors);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ক্যাটাগরি বদলালেই নতুন প্রোডাক্ট আনবে
  useEffect(() => {
    getProducts(selectedCategory);
  }, [selectedCategory]);

  const handleShowCount = (value) => {
    setInitialShow(Number(value));
    setCurrentPage(1);
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    setSelectedColor(""); // নতুন ক্যাটাগরিতে রঙ রিসেট
    setCurrentPage(1);
  };

  // রঙ অনুযায়ী ফিল্টার
  const filteredProducts = selectedColor
    ? products.filter((p) => p.color === selectedColor)
    : products;

  // পেজ অনুযায়ী প্রোডাক্ট কাটা
  const startIndex = (currentPage - 1) * initialShow;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + initialShow,
  );

  return (
    <div>
      <Container>
        <BreadCrumb className="mt-30 mb-10" />
      </Container>
      <Container>
        <div className="grid grid-cols-[300px_1fr] gap-10">
          <div className="pt-10">
            <h4 className="font-bold text-[20px] mb-2">Shop by Category</h4>
            <ul className="grid gap-2">
              <li
                onClick={() => handleCategoryClick("all")}
                className={`cursor-pointer ${
                  selectedCategory === "all" ? "font-bold text-red-500" : ""
                }`}
              >
                All Products
              </li>
              {categories?.map((category) => (
                <li
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`cursor-pointer ${
                    selectedCategory === category.slug
                      ? "font-bold text-red-500"
                      : ""
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-[20px]mt-8 mb-2 pt-10">Shop by Color</h4>
            <ul className="grid gap-4">
              {COLORS.map((color) => (
                <li
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(
                      selectedColor === color.name ? "" : color.name,
                    );
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-3 cursor-pointer text-sm transition-colors hover:text-black ${
                    selectedColor === color.name
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10">
            <div className="flex justify-end gap-1 items-center">
              <h4>Show :</h4>
              <select
                onChange={(e) => handleShowCount(e.target.value)}
                className="py-1 px-10 border border-gray-400 rounded-sm"
              >
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {paginatedProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="pt-10 text-center text-gray-500">
                কোনো প্রোডাক্ট পাওয়া যায়নি
              </p>
            )}

            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={initialShow}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;
