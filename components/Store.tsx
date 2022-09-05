import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Product from "./Product";
import Navbar from "./Navbar";
import {ProductItemProps} from "./Product";

const Store = () => {
    const [filterInput, setFilterInput] = useState<string>("");
    const [products, setProducts] = useState<ProductItemProps[]>([]);

    function getProducts() {
        fetch("products.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json: ProductItemProps[]) {
                setProducts(json);
            });
    }

    useEffect(() => {
        getProducts();
    }, []);


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
