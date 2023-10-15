import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import emptyCart from "../../../assets/cartimg.png"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { addToCart, removeAllFromCart, removeFromCart } from '../../../redux/userSlice';
import { BasicButton, LightPurpleButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { updateCustomer } from '../../../redux/userHandle';

const Cart = ({ setIsCartOpen }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    let cartDetails = currentUser.cartDetails;

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveAllFromCart = () => {
        dispatch(removeAllFromCart());
    };

    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalOGPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.mrp), 0);
    const totalNewPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const productViewHandler = (productID) => {
        navigate("/product/view/" + productID)
        setIsCartOpen(false)
    }

    const productBuyingHandler = (id) => {
        console.log(currentUser);
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false)
        navigate(`/product/buy/${id}`)
    }

    const allProductsBuyingHandler = () => {
        console.log(currentUser);
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false)
        navigate("/Checkout")
    }

    const priceContainerRef = useRef(null);

    const handleScrollToBottom = () => {
        if (priceContainerRef.current) {
            priceContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const firstCartItemRef = useRef(null);

    const handleScrollToTop = () => {
        if (firstCartItemRef.current) {
            firstCartItemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <StyledContainer>
            <TopContainer>
                <LightPurpleButton onClick={() => {
                    setIsCartOpen(false)
                }}>
                    <KeyboardDoubleArrowLeftIcon /> Continue Shopping
                </LightPurpleButton>
                {cartDetails.length > 0 && (
                    <IconButton
                        sx={{ backgroundColor: "#3a3939", color: "white" }}
                        onClick={handleScrollToTop}
                    >
                        <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                )}
            </TopContainer>
            {cartDetails.length === 0 ? (
                <CartImage src={emptyCart} />
            ) : (
                <CardGrid container spacing={2}>
                    {cartDetails.map((data, index) => (
                        <Grid
                            item xs={12}
                            key={index}
                            ref={index === 0 ? firstCartItemRef : null}
                        >
                            <CartItem>
                                <ProductImage src={data.productImage} />
                                <ProductDetails>
                                    <Typography variant="h6">
                                        {data.productName}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Original Price: ₹{data.price.mrp}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Discount: {data.price.discountPercent}% Off
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Final Price: ₹{data.price.cost}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Quantity: {data.quantity}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Total: ₹{data.quantity * data.price.cost}
                                    </Typography>
                                    <ButtonContainer>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveFromCart(data)}
                                        >
                                            -1
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleAddToCart(data)}
                                        >
                                            +1
                                        </Button>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <BasicButton
                                            sx={{ mt: 2 }}
                                            onClick={() => productViewHandler(data._id)}
                                        >
                                            View
                                        </BasicButton>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ mt: 2 }}
                                            onClick={() => productBuyingHandler(data._id)}
                                        >
                                            Buy
                                        </Button>
                                    </ButtonContainer>
                                </ProductDetails>
                            </CartItem>
                        </Grid>
                    ))}
                    <StyledPaper ref={priceContainerRef}>
                        <Title>
                            PRICE DETAILS
                        </Title>
                        <Divider sx={{ my: 1 }} />
                        <DetailsContainer>
                            Price ({totalQuantity} items) = ₹{totalOGPrice}
                            <br /><br />
                            Discount = ₹{totalOGPrice - totalNewPrice}
                            <Divider sx={{ my: 1 }} />
                            Total Amount = ₹{totalNewPrice}
                        </DetailsContainer>
                        <Divider sx={{ my: 1, mb: 4 }} />
                        {cartDetails.length > 0 && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={allProductsBuyingHandler}
                            >
                                Buy All
                            </Button>
                        )}
                    </StyledPaper>
                </CardGrid>
            )}

            {cartDetails.length > 0 && (
                <BottomContainer>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleScrollToBottom}>
                        View Bill
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleRemoveAllFromCart}
                    >
                        Remove All
                    </Button>
                </BottomContainer>
            )}

        </StyledContainer>
    );
};

export default Cart;

const StyledContainer = styled(Container)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 16px;
  background-color: #f8f8f8;
  z-index:1;
`;

const StyledPaper = styled(Paper)`
  padding: 26px;
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  height: 30vh;
`;

const CardGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const DetailsContainer = styled.div`
  margin-top: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const CartImage = styled.img`
 width: 100%
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 16px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
  padding: 16px;
  background-color: #f8f8f8;
`;
