import React from 'react';
import Image from "next/image";
import Button from "@mui/material/Button";
import {Card, Grid, Typography} from "@mui/material";
import {useCartContext} from "../context/CartContext";

export type ProductItemProps = {
    name: string
    id: number
    image: string
    price: Price
}

type Price = {
    full: number
    currency: string
}

const Product = ({name, id, image, price}: ProductItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useCartContext()
    const quantity = getItemQuantity(id);
    return (
        <Card>
            <Grid container flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} width={250} height={300}>
                <Grid item>
                    <Image src={image}
                           alt="Picture of the product"
                           width={128}
                           height={128}
                           objectFit={"contain"}/>
                </Grid>


                <Grid item paddingX={1}>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                        {price.full} {price.currency}
                    </Typography>
                </Grid>

                {quantity === 0 ? (
                        <Grid container justifyContent={"center"} padding={1}>
                            <Grid item>
                                <Button variant="outlined" onClick={() => increaseCartQuantity(id)}>Add to cart</Button>
                            </Grid>
                        </Grid>
                    ) :
                    <>
                        <Grid container flexDirection={"row"} justifyContent={"space-between"} padding={1}>
                            <Grid item>
                                <Button variant="outlined" onClick={() => decreaseCartQuantity(id)}>-</Button>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {quantity}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => increaseCartQuantity(id)}>+</Button>
                            </Grid>
                        </Grid>
                    </>
                }
            </Grid>
        </Card>
    );
};

export default Product;
