import {createContext, ReactNode, useContext, useState} from "react";
import StoreCart from "../components/StoreCart";

type StoreCartProps = {
    children: ReactNode
}

type StoreCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const StoreCartContext = createContext({} as StoreCartContext)

export function useStoreCartContext() {
    return useContext(StoreCartContext);
}

export function CartProvider({children}: StoreCartProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id:number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <StoreCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity
            }}
        >
            {children}
            <StoreCart isOpen={isOpen}/>
        </StoreCartContext.Provider>
    )
}