import React, { useContext } from 'react'
import classes from "./product.module.css"
// : material ui rating for rating
import Rating from "@mui/material/Rating"
// : numeral js for number counting in my CurrencyFormat Component
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
// ` a tag to Link
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'


// ` Destructure the fetched product from Product component
const ProductCard = ({ product, flex, renderDetail, renderButton, marginBottomValue, sideBySide })  => {

    // ` Destructure the items in product
    const { image,title, id, rating, price,description } = product
    // console.log(product);

    // ` use useContext to import DataContext so we can access state and dispatch from useReducer

    const [state,dispatch] = useContext(DataContext)

    //` we can access the state when add to cart get clicked 
    // console.log(state);
    

// `
   const addToCart = () => {
    // ` dispatch the action to add the product to the basket
    dispatch({
        type:Type.ADD_TO_BASKET,
        item:{
            image,title, id, rating, price,description 
        }
    })

   }






    // ` To limit the css to the class it's called (add this by myself)
    const cardClass = `${classes.card_container} ${flex ? classes.product_flexed : ''} ${renderDetail ? classes.no_hover : ''} ${marginBottomValue ? classes.marginBottomValue : ''} ${sideBySide ? classes.card_side_by_side : ''}`;
const cardContentClass = `${classes.card_content} ${sideBySide ? classes.card_content_side_by_side : ''}`;

  

  return (
    <div className={cardClass}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className={cardContentClass}>
        <h3>{title}</h3>
        {renderDetail && <div style={{ maxWidth: '750px' }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div className={classes.price}>
          <CurrencyFormat amount={price} />
        </div>
        {renderButton && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard