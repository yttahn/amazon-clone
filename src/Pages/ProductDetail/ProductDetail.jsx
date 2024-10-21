import React, { useEffect, useState } from 'react'
import classes from "./productDetail.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from "axios" 
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

const ProductDetail = () => {
  const { productId } = useParams()
   // console.log(productId);

  //` use useState to store the data
  const [products,setProducts] = useState({})

  // ` useState for the loading from react spinner

  const [isLoading, setIsLoading] = useState(false)

 

  // ` use useEffect so it'll be fetched when the component mount

  useEffect (()=> {
    // * before fetching the data
    setIsLoading(true)

    // ` axios to fetch data
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      // console.log(res);
      setProducts(res.data)
      // * if we get the product
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      // * if there is error
      setIsLoading(false)
    })
  },[])
  return (
    <LayOut>
    {isLoading?(<Loader/>):(
      <ProductCard
      product = {products}
      key = {products.id}
      flex = {true}
      renderDetail = {true}
      renderButton={true}
      marginBottomValue = {true}

      
      />
    )}

    </LayOut>
  )
}

export default ProductDetail