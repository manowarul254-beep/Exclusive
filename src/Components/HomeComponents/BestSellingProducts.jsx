import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../CommonComponents/Container";
import SecHead from "../CommonComponents/SecHead";
import Btn from "../CommonComponents/Btn";
import Card from "../CommonComponents/Card";
import coatImg from "../../assets/Cart.png";
import bagImg from "../../assets/Cart (1).png";
import coolerImg from "../../assets/Cart (2).png";
import shelfImg from "../../assets/Cart (3).png";

// প্রতিটা প্রোডাক্টের নিজস্ব আলাদা id
const bestProducts = [
  { id: "best-1", imgSrc: coatImg, title: "The north coat", price: 260, discountPrice: 360, ratings: "(65)" },
  { id: "best-2", imgSrc: bagImg, title: "Gucci duffle bag", price: 960, discountPrice: 1160, ratings: "(65)" },
  { id: "best-3", imgSrc: coolerImg, title: "RGB liquid CPU Cooler", price: 160, discountPrice: 170, ratings: "(65)" },
  { id: "best-4", imgSrc: shelfImg, title: "Small BookSelf", price: 360, discountPrice: 400, ratings: "(65)" },
];

const BestSellingProducts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        {/* হেডার: ছোট screen-এ বাটন নিচে নামবে */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <SecHead title="This Month" heading="Best Selling Products" />
          <Btn
            onClick={() => navigate("/products")}
            className="mt-0 mx-0 px-8 lg:px-12"
          >
            View All
          </Btn>
        </div>

        {/* মোবাইলে ২টা, ট্যাবলেটে ৩টা, ডেস্কটপে ৪টা */}
        <div className="my-8 lg:my-15 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-7.5">
          {bestProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              imgSrc={item.imgSrc}
              title={item.title}
              price={item.price}
              discountPrice={item.discountPrice}
              ratings={item.ratings}
              showCart={false}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BestSellingProducts;