import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "../CommonComponents/Container";
import ProductsCard from "../CommonComponents/ProductsCard";

// কয়টা প্রোডাক্ট দেখাবে
const SHOW_COUNT = 4;

// props না দিলেও চলবে: URL-এর :id থেকে নিজেই প্রোডাক্টের category বের করে নেয়
const RelatedItems = ({ category, excludeId }) => {
  const { id: routeId } = useParams();
  const currentId = excludeId ?? routeId;

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError("");

      try {
        // category prop না এলে প্রোডাক্টটা আনিয়ে তার category নেওয়া
        let cat = category;
        if (!cat && currentId) {
          const current = await axios.get(
            `https://dummyjson.com/products/${currentId}`
          );
          cat = current.data.category;
        }

        if (!cat) {
          setProducts([]);
          setCategoryName("");
          return;
        }

        setCategoryName(cat);

        const res = await axios.get(
          `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`
        );

        const related = res.data.products
          .filter((p) => String(p.id) !== String(currentId))
          .slice(0, SHOW_COUNT);

        setProducts(related);
      } catch (err) {
        setError("প্রোডাক্ট লোড করা যায়নি, আবার চেষ্টা করুন");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category, currentId]);

  return (
    <Container>
      <div className="my-10 lg:my-20">
        {/* লাল দাগসহ শিরোনাম, পাশে category-র নাম */}
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm" />
          <h3 className="text-[#DB4444] font-semibold">Related Item</h3>
          {categoryName && (
            <span className="text-sm text-gray-400">({categoryName})</span>
          )}
        </div>

        {loading ? (
          <p className="py-20 text-center text-gray-500">লোড হচ্ছে...</p>
        ) : error ? (
          <p className="py-20 text-center text-[#DB4444]">{error}</p>
        ) : products.length === 0 ? (
          <p className="py-20 text-center text-gray-500">
            কোনো সম্পর্কিত প্রোডাক্ট পাওয়া যায়নি
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7.5 mt-8 lg:mt-15">
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default RelatedItems;