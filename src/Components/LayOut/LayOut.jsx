import React from 'react'
import Header1 from '../Header/Header1'
import Footer from '../Footer/Footer'

// ` i18next for language

import i18next from "../../i18n"
import { I18nextProvider } from 'react-i18next'

// ` So when we call LayOut Component the header and the children will have the same order as LayOut function

const LayOut = ({children}) => {
  return (
    <div>
       
        <Header1/>
        {children}
        <Footer/>
    </div>
  )
}

export default LayOut