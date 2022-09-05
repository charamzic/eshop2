import React, {useState} from 'react';
import {useCartContext} from "../context/CartContext";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import Navbar from "./Navbar";
import products from "../public/products.json";

const Store = () => {
    const [filterInput, setFilterInput] = useState<string>("");
    // const {products} = useCartContext()

    return (
        <>
            <Navbar setFilterInput={setFilterInput} />
            <Grid container
                  padding={5}
                  spacing={3}

            >
                {products?.filter((val) => {
                    if (filterInput == "") {
                        return val;
                    } else if (val.name.toLowerCase().includes(filterInput.toLowerCase())) {
                        return val;
                    }
                }).map(item => (
                    <Grid key={item.id} item>
                        <Product  {...item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Store;
