import React from "react";
import Container from "../CommonComponents/Container";
import SecHead from "../CommonComponents/SecHead";
import Btn from "../CommonComponents/Btn";
import Card from "../CommonComponents/Card";
import cart from "../../assets/Cart.png";
import cart1 from "../../assets/Cart (1).png";
import cart2 from "../../assets/Cart (2).png";
import cart3 from "../../assets/Cart (3).png";

const BestSellingProducts = () => {
  return (
    <div>
      <Container>
        <div className="flex justify-between items-center">
          <SecHead title="This Month" heading="Best Selling Products" />
          <div className="justify-between"><Btn>View All</Btn></div>
        </div>
        <div className="my-15 flex justify-between">
            <Card
                imgSrc={cart}
                title="The north coat"
                price="260"
                discountPrice="360"
                ratings="(65)"
                showCart={false}
                
              />
            <Card
                imgSrc={cart1}
                title="Gucci duffle bag"
                price="960"
                discountPrice="360"
                ratings="(65)"
                showCart={false}
                
              />
            <Card
                imgSrc={cart2}
                title="RGB liquid CPU Cooler"
                price="260"
                discountPrice="360"
                ratings="(65)"
                showCart={false}
                
              />
            <Card
                imgSrc={cart3}
                title="Small BookSelf"
                price="260"
                discountPrice="360"
                ratings="(65)"
                showCart={false}
              />

        </div>
      </Container>
    </div>
  );
};

export default BestSellingProducts;
