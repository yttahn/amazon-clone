import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

const ProtectedRoute = ({children, msg,redirect}) => {
    const navigate = useNavigate()
    const [{user},dispatch] = useContext(DataContext)

    useEffect(()=>{
        if(!user){
            // ` if there is no user it will direct to "/auth" but in out Auth component when user sign in it will direct to home page but now we want to direct to payment
            navigate("/auth", {state:{msg,redirect}})
        }

    },[user])
  return  children
}

export default ProtectedRoute