// ` For the context 

import React, {createContext, useReducer} from "react"


// ` create a context

export const DataContext = createContext()

// ` initiate provider function

// * pass children, reducer and initialState as props


 // ` children is the component that we want to pass to the provider

export const  DataProvider = ({children,reducer,initialState}) => {
    return (
        // ` provide the already created context to other component so we pass children as a props to indicate the components
         <DataContext.Provider value={useReducer(reducer, initialState)}>
        {children}
        </DataContext.Provider>
    )

}

// = so we will wrap the App.jsx inside main.jsx to provide the data to another component