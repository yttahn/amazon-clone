import React, { useContext, useEffect, useState } from "react";
import classes from "./order.module.css";
import LayOut from "../../Components/LayOut/LayOut";
// ` import data base to access ordered product
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating"
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

const Order = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders,setOrders] = useState([])

  useEffect(() => {
    if(user){
     db.collection("users")
     .doc(user.uid)
     .collection("orders")
     .orderBy("created","desc")
     .onSnapshot((snapShot)=>{
      // console.log(snapShot); //` the data is in doc as a method
      setOrders(
        snapShot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
        }))
      )


     })


    }else{
      setOrders([])
    }
  }, []);


  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}
          <div>
            {orders.map((eachOrder, i) => (
              <div key={i}>
                <hr style={{ width: "100%", marginLeft: "0" }} />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder.data.basket.map((product) => (
                  <div key={product.id} className={classes.product}>
                    <Link to="">
                      <img src={product.image} alt={product.title} />
                    </Link>
                    <div className={classes.product_info}>
                      <h3 className={classes.product_title}>{product.title}</h3>
                      <div className={classes.product_details}>
                        <Rating value={product.rating?.rate} precision={0.1} />
                        <span className={classes.product_price}>
                          <CurrencyFormat amount={product.price} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Order;
