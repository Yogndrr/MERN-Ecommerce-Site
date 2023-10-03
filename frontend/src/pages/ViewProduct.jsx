import React from 'react';
import { useParams } from 'react-router-dom';
import { productData } from '../components/products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userRelated/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../components/buttonStyles';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentRole } = useSelector(state => state.user);

    const selectedProduct = productData.find(product => product.id === parseInt(productID));

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    const { productName, description, price, category, subcategory, productImage } = selectedProduct;

    return (
        <>
            <ProductContainer>
                <ProductImage src={productImage} alt={productName} />
                <ProductInfo>
                    <ProductName>{productName}</ProductName>
                    <PriceContainer>
                        <PriceCost>₹{price.cost}</PriceCost>
                        <PriceMrp>₹{price.mrp}</PriceMrp>
                        <PriceDiscount>{price.discountPercent}% off</PriceDiscount>
                    </PriceContainer>
                    <Description>{description}</Description>
                    <ProductDetails>
                        <p>Category: {category}</p>
                        <p>Subcategory: {subcategory}</p>
                    </ProductDetails>
                </ProductInfo>
            </ProductContainer>
            {
                currentRole === "Customer" &&

                <ButtonContainer>
                    <BasicButton
                        onClick={() => dispatch(addToCart(selectedProduct))}
                    >
                        Add to Cart
                    </BasicButton>
                </ButtonContainer>
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
