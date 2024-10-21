import React, { useEffect, useState } from 'react'
import classes from "./product.module.css"
import axios from "axios"
import ProductCard from './ProductCard'
import Loader from '../Loader/Loader'

const Product = () => {

     // ` useState for the loading from react spinner

  const [isLoading, setIsLoading] = useState(false)


    //` Fetch data from Fake Api. Create useState to store the data
    
    const [products,setProducts] = useState([])
    //` useEffect so it render when the component mount

    useEffect (()=>{
        // * before fetching the data
        setIsLoading(true)
        // ` axios to fetch the data
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            // console.log(res);
            setProducts(res.data)
             // * if we get the product
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        });
        

    },[])
// console.log(products);

// # use products from useState to map the fetched data
      return (
    <>
    {
        isLoading?(<Loader />):(
            <section className={classes.product_container}>
        
        {
            products.map((singleProduct)=>(
                <ProductCard
                 product ={singleProduct}
                  key={singleProduct.id}
                  renderButton={true}
                  />

            ))
        }
        
    </section>
        )
    }
    </>
  )
}

export default Product