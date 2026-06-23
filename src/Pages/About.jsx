
import Container from '../Components/CommonComponents/Container'
import Card from "../Components/CommonComponents/Card";
import console3 from "../../src/assets/chair.png";
import BreadCrumb from '../Components/CommonComponents/BreadCrumb';
import React, { useState, useEffect } from 'react';


const About = () => {

   const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div>
      <Container>
        <BreadCrumb className='mt-30'/>
        <div className='flex justify-between items-center'>
                <h3 className='text-[#262626] text-xl font-bold' >Shop by Category</h3>
                <div className='flex gap-4 items-center'>
                  <h4>Show :</h4>
                  <div>
                  <select className='py-1 px-10 border border-gray-400 rounded-sm' name="" id="">
                    <option value="">6</option>
                    <option value="">5</option>
                    <option value="">7</option>
                  </select>
                  </div>
                </div>
          </div>
        <div className='flex justify-between mt-10'>         
            <div className='w-[20%]'>
                <ul className='space-y-4'>
                    <li>Woman’s Fashion</li>
                    <li>Men’s Fashion</li>
                    <li>Electronics</li>
                    <li>Home & Lifestyle</li>
                    <li>Medicine</li>
                    <li>Sports & Outdoor</li>
                    <li>Baby’s & Toys</li>
                    <li>Groceries & Pets</li>
                    <li>Health & Beauty</li>
                </ul>
            </div>
            <div className='w-[80%] flex flex-wrap justify-between'>
                {
                  products.map((item)=>{
                    return(
                      <Card
                          key={item.id}
                          imgSrc={item.thumbnail}
                          title={item.title}
                          price={item.price}
                          discountPrice="160"
                          ratings={item.rating}
                          percentage={item.discountPercentage}
                     />
                    )
                  })
                }
            </div>
        </div>
      </Container>
    </div>
  )
}

export default About
