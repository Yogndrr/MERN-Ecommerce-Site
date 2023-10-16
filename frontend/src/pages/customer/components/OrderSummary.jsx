import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetailsFromCart } from '../../../redux/userSlice';

const OrderSummary = ({ handleNext, handleBack }) => {

    const dispatch = useDispatch();

    const params = useParams();
    const productID = params.id;

    const { currentUser, productDetailsCart } = useSelector((state) => state.user);

    React.useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    let cartDetails = currentUser.cartDetails;
    let shippingData = currentUser.shippingData;

    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalOGPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.mrp), 0);
    const totalNewPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                Order summary
            </Typography>
            {productID ?
                <React.Fragment>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={productDetailsCart.productName} secondary={`Quantity: ${productDetailsCart.quantity}`} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {`₹${productDetailsCart.price && productDetailsCart.price.mrp * productDetailsCart.quantity}`}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Discount" />
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                ₹{productDetailsCart.price && productDetailsCart.price.mrp - productDetailsCart.price.cost}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Shipping" />
                            <Typography variant="body2">
                                Free
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total Amount" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{productDetailsCart.price && productDetailsCart.price.cost * productDetailsCart.quantity}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>{currentUser.name}</Typography>
                            <Typography gutterBottom>{shippingData.address},{shippingData.city},{shippingData.state},{shippingData.country}</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
                :
                <React.Fragment>
                    <List disablePadding>
                        {cartDetails.map((product, index) => (
                            <ListItem key={index} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={product.productName} secondary={`Quantity: ${product.quantity}`} />
                                <Typography variant="body2">{`₹${product.quantity * product.price.mrp}`}</Typography>
                            </ListItem>
                        ))}
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={`Price (${totalQuantity} items)`} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{totalOGPrice}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Discount" />
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                ₹{totalOGPrice - totalNewPrice}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Shipping" />
                            <Typography variant="body2">
                                Free
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total Amount" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{totalNewPrice}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>{currentUser.name}</Typography>
                            <Typography gutterBottom>{shippingData.address},{shippingData.city},{shippingData.state},{shippingData.country}</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}

export default OrderSummary