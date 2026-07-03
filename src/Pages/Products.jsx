import Container from "../Components/CommonComponents/Container";
import ProductsCard from "../Components/CommonComponents/ProductsCard";
import console3 from "../../src/assets/chair.png";
import BreadCrumb from "../Components/CommonComponents/BreadCrumb";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialShow,setInitialShow]  = useState(6)

  const getAllCategories = async () => {
    let data = await axios.get("https://dummyjson.com/products/categories");
    setCategories(data.data);
  };

  const getAllProducts = async () => {
    let data = await axios.get("https://dummyjson.com/products");
    console.log(data);

    setProducts(data.data.products);
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  const handleShowCount = (value)=>{
   setInitialShow(value)
  }

  return (
    <div>
      <Container>
        <BreadCrumb className="mt-30 mb-10" />
      </Container>
      <Container>
        <div className="grid grid-cols-[300px_1fr] gap-10">
          <div className="pt-10">
            <ul className="grid gap-2">
              {categories?.map((category) => (
                <li key={category.slug}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div className="pt-10">
            <div className="flex justify-end gap-1 items-center">
               <h4>Show :</h4>
              {/* <input onChange={(e)=>handleShowCount(e.target.value)} className='w-20 h-8 px-6 border border-gray-400 rounded-sm' name="" id=""/> */}
                <select onChange={(e)=>handleShowCount(e.target.value)} className='py-1 px-10 border border-gray-400 rounded-sm' name="" id="">
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
            {products.slice(0,initialShow).map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;
