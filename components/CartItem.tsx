import React from 'react';
import {useCartContext} from "../context/CartContext";
import {Stack, Typography} from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
// import products from '../data/products.json'

type CartItemProps = {
    id: number
    quantity: number
}

const CartItem = ({id, quantity}: CartItemProps) => {
    const {removeFromCart, products} = useCartContext()
    const item = products?.find(item => item.id === id)
    if (item == null) return null

    return (
        <>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
                <Image src={item.image} width={100} height={55} objectFit={"cover"} />
                <Typography variant={"h6"}>
                    {quantity}
                </Typography>
                <Typography variant={"subtitle2"}>
                    ks
                </Typography>
                <Button variant="outlined" onClick={() => removeFromCart(item.id)} color={"error"}>X</Button>
            </Stack>
        </>

    );
};

export default CartItem;
