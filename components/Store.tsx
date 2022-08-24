import products from '../data/products.json' // pak to fetchnout
import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";
import Navbar from "./Navbar";

const Store = () => {
    const [filterInput, setFilterInput] = useState<string>("");
    return (
        <>
            <Navbar setFilterInput={setFilterInput} />
            <Grid container
                  padding={5}
                  spacing={3}

            >
                {products.filter((val) => {
                    if (filterInput == "") {
                        return val;
                    } else if (val.name.toLowerCase().includes(filterInput.toLowerCase())) {
                        return val;
                    }
                }).map(item => (
                    <Grid key={item.id} item>
                        <ProductItem  {...item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Store;
