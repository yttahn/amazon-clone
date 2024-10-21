import React from 'react'
import { BrowserRouter as Router,Routes ,Route } from "react-router-dom"

import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Order'
import Cart from './Pages/Cart/Cart'
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
// ` for stripe
import {Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// ` protect payment route

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51PFQaDF1gwwXFrEcRwo2fwJQSPB9y94Yzs4MPTYPQ6KaLo30fahVryssuXfYAwJpgK6UEAg6J22tG7FRelA0ceJn00CDB79Ucg');

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/payments" element={
              <ProtectedRoute 
              redirect={"/payments"}
              msg={"You must log in to pay"}>
                <Elements stripe={stripePromise}>
                <Payment/>
              </Elements>
              </ProtectedRoute>             
            }
            />
            <Route path="/orders" element={
              <ProtectedRoute 
              redirect={"/orders"}
              msg={"You must log in to access your orders"}>
                <Orders/>
              </ProtectedRoute>
            } 
            />
            <Route path="/category/:categoryName" element={<Results/>}/>
            <Route path="/products/:productId" element={<ProductDetail/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </Router>
  )
}

export default Routing