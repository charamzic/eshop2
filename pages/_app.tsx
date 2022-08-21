import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect} from "react";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        return () => {
            setIsSSR(false)
        };
    }, []);

    if (isSSR) return null;

    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>

    );
}

export default MyApp
