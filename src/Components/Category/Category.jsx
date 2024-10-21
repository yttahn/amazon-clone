import React from 'react'
import { categoryInfo } from "./categoryFullInfo"
// ` We can map the info that we get from categoryInfo
import CategoryCard from './CategoryCard'
import classes from "./category.module.css"


const Category = () => {
  return (
    <section className={classes.category_container}>
      {
        categoryInfo.map((info)=>(
          <CategoryCard data = {info}/> //` We are passing the info to categoryCard component
        ))

      }

    </section>
  )
}

export default Category