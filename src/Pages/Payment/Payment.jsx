import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import Rating from "@mui/material/Rating"
// `stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// ` axios
import { axiosInstance } from "../../Api/axios";

import { ClipLoader } from "react-spinners";

// ` datat base from firebase
import { db } from "../../Utility/firebase";

import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const navigate = useNavigate();
  //` for cart count
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const totalItem = basket.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  console.log(user);

  // ` for the stripe

  const stripe = useStripe(); //` for confirmation
  const elements = useElements(); //` to grab elements from card

  // ` for card error
  const [cardError, setCardError] = useState(null);

  const handleChange = (e) => {
    // console.log(e);
    // ` if there is error on the card it will store the error message
    e?.error?.message ? setCardError(e?.error?.message) : "";
  };

  // ` for loading
  const [isLoading, setIsLoading] = useState(false);

  //` Calculate total price
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  // ` to handle payment
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // # contact backend(function) to access client_secret_id (user key)
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // ` total is the total price
      });
      // console.log(response.data); //` we get client_secret_id

      const clientSecret = response.data?.clientSecret;
      // # client side(react side) confirmation by using stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent); //`its confirmed so if we check the stripe it will say succeeded

      // # after confirmation --> save order in fires store data base, clear basket

      // ` collection called users on top of that create another collection specific to user id
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // # clear basket

      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setIsLoading(false);
      navigate("/orders", { state: "You have placed new order" });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout {totalItem} items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h1>Delivery Address</h1>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr style={{ width: "100%", marginLeft: "0" }} />
        {/* products */}

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          {/* product info */}

          <div>
            {basket?.map((item) => (
              <div key={item.id} className={classes.payment_card}>
                <img src={item.image} alt={item.title} />
                <div className={classes.payment_card_content}>
                  <h3>{item.title}</h3>
                  <div className={classes.rating}>
                    <Rating value={item.rating?.rate} precision={0.1} />
                    <small>{item.rating?.count}</small>
                  </div>
                  <div className={classes.price}>
                    <CurrencyFormat amount={item.price} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr style={{ width: "100%", marginLeft: "0" }} />
        {/* card setup */}

        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          {/* card input */}
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      {" "}
                      <p>Total order | </p>
                      <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button>
                    {isLoading ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
