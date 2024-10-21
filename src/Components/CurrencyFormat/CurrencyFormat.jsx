import React from 'react'
// : numeral js for number counting
import numeral from "numeral"

const CurrencyFormat = ({amount}) => {
 const formattedAmount = numeral(amount).format("$0,0.00")
 return <div>{formattedAmount}</div>
}

export default CurrencyFormat