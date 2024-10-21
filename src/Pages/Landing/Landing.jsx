import React from 'react'
import CarouselEffect from '../../Components/Carousel/Carousel'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'
import ProductSlide from '../../Components/ProductSlide/ProductSlide'
import { productSlide } from "../../Components/ProductSlide/productSlideData"

const Landing = () => {
  return (
    <LayOut>
      
        <CarouselEffect/>
        <Category/>
        <ProductSlide productSlide={productSlide}/>
        <Product/>
    </LayOut>
  )
}

export default Landing