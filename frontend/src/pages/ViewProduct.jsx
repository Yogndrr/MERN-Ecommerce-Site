import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Box, Rating, TextField, Typography } from '@mui/material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };

    const reviewer = currentUser._id

    const fields = { rating, comment, reviewer }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateStuff(fields, currentUser._id, "ProductUpdate"));
        setRating(0);
        setComment('');
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                                <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>₹{productDetails && productDetails.price && productDetails.price.cost}</PriceCost>
                                            <PriceMrp>₹{productDetails && productDetails.price && productDetails.price.mrp}</PriceMrp>
                                            <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <Description>{productDetails && productDetails.description}</Description>
                                        <ProductDetails>
                                            <p>Category: {productDetails && productDetails.category}</p>
                                            <p>Subcategory: {productDetails && productDetails.subcategory}</p>
                                        </ProductDetails>
                                    </ProductInfo>
                                </ProductContainer>
                                {
                                    currentRole === "Customer" &&

                                    <ButtonContainer>
                                        <BasicButton
                                            onClick={() => dispatch(addToCart(productDetails))}
                                        >
                                            Add to Cart
                                        </BasicButton>
                                    </ButtonContainer>
                                }

                                <form onSubmit={handleSubmit}>
                                    <Typography variant="h6">Write a Review</Typography>
                                    <Box mb={2}>
                                        <Rating
                                            name="rating"
                                            value={rating}
                                            onChange={handleRatingChange}
                                        />
                                    </Box>
                                    <TextField
                                        label="Comment"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                    <Box mt={2}>
                                        <BasicButton type="submit">
                                            Submit Review
                                        </BasicButton>
                                    </Box>
                                </form>
                            </>
                    }
                </>
            }
        </>
    );
};

export default ViewProduct;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    /* width: 50%; */
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.h1`
    font-size: 24px;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const Description = styled.p`
    margin-top: 16px;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const ButtonContainer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
