import {createContext, ReactNode, useContext, useState} from "react";
import Cart from "../components/Cart";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {GetStaticProps, InferGetStaticPropsType} from "next";


export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/hello");
    const data: Product[] = await res.json()

    console.log(data)

    return {
        props: {
            products: data,
        },
    }
}

type CartProps = {
    children: ReactNode
}

type CartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    products: Product[]
}

type CartItem = {
    id: number
    quantity: number
}

type Product = {
    name: string
    id: number
    image: string
    price: {
        full: number
        currency: string
    }
}

const CartContext = createContext({} as CartContext)

export function useCartContext() {
    return useContext(CartContext);
}

export function CartProvider({children}: CartProps, {products}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', [])
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    console.log(products)

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
        <CartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
                products
            }}
        >
            {children}
            <Cart isOpen={isOpen}/>
        </CartContext.Provider>
    )
}