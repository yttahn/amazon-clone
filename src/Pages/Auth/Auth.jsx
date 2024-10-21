import React, { useState,useContext } from 'react'
import classes from "./signUp.module.css"
import amazonLogo from "../../assets/images/amazon-Logo.png"
import { Link, useNavigate,useLocation } from 'react-router-dom'

import {auth} from "../../Utility/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type'
import {ClipLoader} from "react-spinners"





const Auth = () => {

  // ` Hold the form(user) info in state
  // * using state in the from is called controlled and using ref is called unControlled

     const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")

    //`  to hold the error
     const [error,setError] = useState("")

    //  ` loading state and initially it is not spinning (false)
     const [isLoading, setIsLoading] = useState({
      signIn:false,
      signUp:false
     })
    
// * we will provide the user to other component by context
    const [{user}, dispatch] = useContext(DataContext)
    console.log(user); //` it's initially null from reducer.js then after some action applied from dispatch it'll have some value

    // ` to navigate
    const navigate = useNavigate()
// console.log(email,password);
    const navStateData = useLocation()
    // console.log(navStateData); //` by using this we can access the state that send to auth from ProtectedRoute


// ` function for sign in and sign up

const authHandler =  async(e)=>{
  // ` to prevent page reload
     e.preventDefault()
  // console.log(e.target.name); //* when signIn button clicked the name will be signIn
  if(e.target.name === "signIn"){
    //= when sign in get clicked
    setIsLoading({
     ...isLoading,
      signIn:true
    })
    // ` to sign in from firebase auth
    signInWithEmailAndPassword(auth,email,password)
    // ` to sign in from firebase auth
    signInWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      // console.log(userInfo);
      // ` dispatch
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user  
      })
      // = when sign in button clicking is successful
      setIsLoading({
        ...isLoading,
        signIn:false
      })
    //  `  navigate to the redirected page
    navigate(navStateData?.state?.redirect || "/")


    }).catch((error)=>{
      console.log(error.message);
      setError(error.message)
      setIsLoading({...isLoading,signIn:false})
    })

  }else{
      //= when sign up get clicked
      setIsLoading({...isLoading, signUp:true})

    createUserWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      // console.log(userInfo);
      // ` dispatch
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user  
      })
      // = when sign up button clicking is successful
      setIsLoading({...isLoading,signUp:false})
      //  `  navigate to the redirected page
    navigate(navStateData?.state?.redirect || "/")
    }
    ).catch((error)=>{
      console.log(error.message);
      setError(error.message)
      setIsLoading({...isLoading,signUp:false})
    })

  }

}


  return (
    <section className={classes.logIn}>
      {/* amazon Logo */}
     
      <Link to="/">
          <img src={amazonLogo} alt="" />
      </Link>

      {/* form */}
      <div className={classes.logIn_container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && (
            <small style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold",
            }}>
              {navStateData?.state?.msg}
            </small>
          )
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
          <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email" placeholder="Email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             type="password" placeholder="Password" id='password' />
          </div>
          
          
          <button 
          name='signIn'
          onClick={authHandler}
          type="submit" className={classes.logIn_signInButton}> 
          {
            isLoading.signIn?(<ClipLoader size={20} color="#000" />):("Sign In")
          }
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in you agree to AMAZON FAKE CLONE conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice  
        </p>

        {/* sign up button */}
          <button 
           name='signUp'
          onClick={authHandler}
          className=
          {classes.logIn_registerButton}>
            {
            isLoading.signUp?(<ClipLoader size={20} color="#000" />):(" Create your Amazon Account")
          }
          </button>
          
          {/* error */} 
          {
            error && <small style={{paddingTop:"5px",color:"red"}}>{error}</small>
          }
      </div>
      

    </section>
  )
}

export default Auth