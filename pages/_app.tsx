import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import {CartProvider} from "../context/StoreCartContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [isSSR, setIsSSR] = useState(true);
    const [filterInput, setFilterInput] = useState<string>("");

    useEffect(() => {
        return () => {
            setIsSSR(false)
        };
    }, []);

    if (isSSR) return null;

    return (
        <CartProvider>
            <Navbar setFilterInput={setFilterInput} />
            <Component {...pageProps} />
        </CartProvider>

    );
}

export default MyApp
