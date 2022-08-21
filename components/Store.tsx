import products from '../data/products.json' // pak to fetchnout

import React from 'react';
import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";

const Store = () => {
    return (
        <Grid container
              padding={5}
              spacing={3}

        >
            {products.map(item => (
                <Grid key={item.id} item>
                    <ProductItem  {...item} />
                </Grid>
            ))}

        </Grid>
    );
};

export default Store;
