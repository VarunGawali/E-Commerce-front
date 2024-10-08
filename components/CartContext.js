'use client'
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({})

export function CartContextProvider({children}){
    const ls = typeof window !== 'undefined' ? window.localStorage : null
    const [cartProducts, setCartProducts] = useState([])
    
    useEffect(()=>{
        if(cartProducts?.length>0){
            ls.setItem('cart',JSON.stringify(cartProducts))
        }
    },[cartProducts])

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    },[])

    function addProduct(productId){
        setCartProducts((prev) => {
            const updatedCart = [...prev, productId];
            ls.setItem('cart', JSON.stringify(updatedCart)); // Immediate localStorage update
            return updatedCart;
        });
    }

    function removeProduct(productId){
        setCartProducts(prev => {
            const pos = prev.indexOf(productId)
            if(pos !== -1){
                return prev.filter((value, index) => index !== pos)
            }
            return prev;
        })
    }

    function clearCart(){
        console.log("Clearing cart...");
        ls.removeItem('cart');
        setCartProducts([])
        console.log("Cart cleared, current cartProducts:", cartProducts);
    }

    return(
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>{children}</CartContext.Provider>
    )
}