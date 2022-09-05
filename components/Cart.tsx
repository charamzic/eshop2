import React from 'react';
import Drawer from '@mui/material/Drawer';
import {useCartContext} from "../context/CartContext";
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Stack} from "@mui/material";
import CartItem from "./CartItem";
import products from "../public/products.json";

const drawerWidth = 240;

type StoreCartProps = {
    isOpen: boolean
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


const Cart = ({isOpen}: StoreCartProps) => {
    const {closeCart, cartItems} = useCartContext()
    const theme = useTheme();
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={isOpen}
        >
            <DrawerHeader>
                <IconButton onClick={closeCart}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <br/>
            <Stack spacing={2} paddingX={1}>
                {cartItems.map(item => (<CartItem key={item.id} {...item} /> ))}
            </Stack>
            {cartItems.length > 0 ? (
                <Stack direction={"row"} justifyContent={"space-between"} paddingX={1}>
                    <Typography variant={"h6"} textAlign={"right"} paddingTop={3}>
                        Celkem:
                    </Typography>
                    <Typography variant={"h6"} textAlign={"right"} paddingTop={3}>
                        {cartItems.reduce((total, cartItem) => {
                            const item = products?.find(item => item.id === cartItem.id)
                            return total + (item?.price.full || 0) * cartItem.quantity}, 0).toFixed(2)}
                        Kč
                    </Typography>
                </Stack>
            ) : null}

        </Drawer>
    );
};

export default Cart;
