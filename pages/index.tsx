import type { NextPage } from 'next'
import Head from "next/head";
import Store from "../components/Store";

const Home: NextPage = () => {

    return (
        <>
            <Head>
                <title>GroceryShop</title>
                <meta name="description" content="Grocery e-shop" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Store />
            </main>
        </>
    )
}

export default Home
