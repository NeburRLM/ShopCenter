import { createContext, useState } from "react";

export const ShoppingCartContext = createContext("undefined")

export const ShoppingCartProvider = ({children}) => {
    const [shoppingCartItems, setShoppingCartItems] =  useState([])

    const sharedState = {
        shoppingCartItems: shoppingCartItems,
        setShoppingCartItems: setShoppingCartItems
    }
    return (
        <ShoppingCartContext.Provider value={sharedState}>
            {children}
        </ShoppingCartContext.Provider>
    )
}