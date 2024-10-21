// = when the categories  got clicked

import React, { useEffect, useState } from 'react'
import classes from "./results.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom' 
import axios from "axios"
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

const Results = () => {
 // ` useState for the loading from react spinner

 const [isLoading, setIsLoading] = useState(false)
//  # the initial value of isLoading is false  indicates that the data has been successfully loaded from the API

  // ` Create useState to store the data
  const [results, setResults] = useState([])

  // ` use useParams for a dynamic path
  const { categoryName } = useParams()
  // console.log(categoryName);


  //` use useEffect so the data will be fetched when the component mounts
  useEffect(()=>{
    // ` before fetching the data
    setIsLoading(true)

     // *Fetch the baseUrl then and all the path and to make it dynamic we use useParams
axios.get(`${productUrl}/products/category/${categoryName}`)
  .then(res=>{ //* the response is named as data
    // console.log(res.data);
    setResults(res.data)
    setIsLoading(false)

  }).catch((err)=>{
    console.log(err)
    setIsLoading(false)
  })
  },[])


 

  return (
    <LayOut>
    <>
    {isLoading?(<Loader/>):(
      <section>
      <h1 style={{padding:"30px"}}>Results</h1>
      <p style={{padding:"30px"}}>Category/{categoryName}</p>
      <hr />

      <div className={classes.product_container}>
        {
          results?.map((product)=>(
            <ProductCard
              product = {product}
              key={product.id}
              renderButton={true}
            
            />

          ))

        }
      </div>
    </section>
    )}
    </>

      
    </LayOut>
  )
}

export default Results