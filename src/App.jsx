import { useEffect, useState } from 'react'

import './App.css'
import Routing from './Router'
import { useContext } from 'react'
import { DataContext } from './Components/DataProvider/DataProvider'
import { auth } from './Utility/firebase'
import { Type } from './Utility/action.type'


// ` i18next for language

import i18n from "./i18n"
import { I18nextProvider } from 'react-i18next'

function App() {
  // ` we can access the user from context
  const [{user},dispatch] = useContext(DataContext)
  
  useEffect(()=>{
    // ` check if there is authenticated user when the component mount
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        // ` when the component mount there is a user already logged in but the header part(globally) it isn't showing up.so to show the sign in globally use dispatch.
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        // console.log('no user');
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }

    })

  },[])

  return (


    <>
   <I18nextProvider i18next = {i18n}>
    <Routing/>
   </I18nextProvider>
       
    
   
      
  
    </>
  )
}

export default App
