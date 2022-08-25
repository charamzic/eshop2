import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect} from "react";
import {CartProvider} from "../context/CartContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        return () => {
            setIsSSR(false)
        };
    }, []);

    if (isSSR) return null;

    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>

    );
}

export default MyApp
