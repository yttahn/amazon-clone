const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions/v2");
// ` initialize the dotenv
dotenv.config();

// ` When we import stripe we will integrate it with Stripe Secret key. If the key is in .env file we use dotenv.
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

setGlobalOptions({maxInstances: 10});



app.use(cors({ origin: true }));

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Hello World"
    })
})

// ` post request because we send total price  and async b/c it send request to stripe
app.post("/payment/create", async(req,res)=>{

    const total = parseInt(req.query.total) 

    //` if the total price is > 0

    if (total > 0){
        // ` create a payment intent with the total price and charge the card
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
        console.log(paymentIntent);

        // ` send the payment intent to the client
        res.status(201).json({
            clientSecret : paymentIntent.client_secret
        })  
    }
    else{
        res.status(403).json({
            message: "total must be greater than 0"
        })
    }
})







// ` our app will be serve by firebase
exports.api = onRequest(app)