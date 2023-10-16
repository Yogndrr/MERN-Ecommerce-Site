import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BlueButton, DarkRedButton, GreenButton } from '../../../utils/buttonStyles';
import { deleteStuff, getProductDetails, updateStuff } from '../../../redux/userHandle';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Avatar, Box, Card, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';
import altImage from "../../../assets/altimg.png";
import Popup from '../../../components/Popup';
import { generateRandomColor, timeAgo } from '../../../utils/helperFunctions';
import { underControl } from '../../../redux/userSlice';
import AlertDialogSlide from '../../../components/AlertDialogSlide';

const ViewProductSeller = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = params.id;

  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit product details';

  useEffect(() => {
    dispatch(getProductDetails(productID));
  }, [productID, dispatch]);

  const { loading, status, error, productDetails, responseDetails } = useSelector(state => state.user);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState({});
  const [mrp, setMrp] = useState("");
  const [cost, setCost] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  console.log(price);

  useEffect(() => {
    if (productDetails) {
      setProductName(productDetails.productName || '');
      setPrice(productDetails.price || '');
      setSubcategory(productDetails.subcategory || '');
      setProductImage(productDetails.productImage || '');
      setCategory(productDetails.category || '');
      setDescription(productDetails.description || "");
      setTagline(productDetails.tagline || "");
    }
    if (productDetails.price) {
      setMrp(productDetails.price.mrp || '');
      setCost(productDetails.price.cost || '');
      setDiscountPercent(productDetails.price.discountPercent || '');
    }
  }, [productDetails]);

  const fields = {
    productName,
    price: {
      mrp: mrp,
      cost: cost,
      discountPercent: discountPercent,
    },
    subcategory,
    productImage,
    category,
    description,
    tagline,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStuff(fields, productID, "ProductUpdate"));
  };

  const deleteHandler = (reviewId) => {
    console.log(reviewId);

    const fields = { reviewId };

    dispatch(updateStuff(fields, productID, "deleteProductReview"));
  };

  const deleteAllHandler = () => {
    dispatch(deleteStuff(productID, "deleteAllProductReviews"))
  }

  useEffect(() => {
    if (status === "updated" || status === "deleted") {
      setLoader(false);
      dispatch(getProductDetails(productID));
      setShowPopup(true);
      setMessage("Done Successfully");
      setShowTab(false)
      dispatch(underControl());
    } else if (error) {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, error, dispatch, productID]);

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

                <ButtonContainer>
                  <GreenButton
                    onClick={() => setShowTab(!showTab)}
                  >
                    {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
                  </GreenButton>
                </ButtonContainer>

                <Collapse in={showTab} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      flex: '1 1 auto',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '30px',
                        width: '100%'
                      }}
                    >
                      <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                          {
                            productImage
                              ? <EditImage src={productImage} alt="" />
                              : <EditImage src={altImage} alt="" />
                          }
                        </Stack>
                        <form onSubmit={submitHandler}>
                          <Stack spacing={3}>
                            <TextField
                              fullWidth
                              label="Product Image URL"
                              value={productImage}
                              onChange={(event) => setProductImage(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Product Name"
                              value={productName}
                              onChange={(event) => setProductName(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              multiline
                              label="Description"
                              value={description}
                              onChange={(event) => setDescription(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="MRP"
                              value={mrp}
                              onChange={(event) => setMrp(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Cost"
                              value={cost}
                              onChange={(event) => setCost(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Discount Percent"
                              value={discountPercent}
                              onChange={(event) => setDiscountPercent(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Category"
                              value={category}
                              onChange={(event) => setCategory(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Subcategory"
                              value={subcategory}
                              onChange={(event) => setSubcategory(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Tagline"
                              value={tagline}
                              onChange={(event) => setTagline(event.target.value)}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Stack>
                          <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                          >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Update"}
                          </BlueButton>
                        </form>
                      </div>
                    </Box>
                  </Box>
                </Collapse>

                <ReviewWritingContainer>
                  <Typography variant="h4">Reviews</Typography>

                  {productDetails.reviews && productDetails.reviews.length > 0 &&
                    <DarkRedButton onClick={() => {
                      setDialog("Do you want to delete all notices ?")
                      setShowDialog(true)
                    }}>
                      Remove All Reviews
                    </DarkRedButton>}
                </ReviewWritingContainer>

                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                  <ReviewContainer>
                    {productDetails.reviews.map((review, index) => (
                      <ReviewCard key={index}>
                        <ReviewCardDivision>
                          <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                            {String(review.reviewer.name).charAt(0)}
                          </Avatar>
                          <ReviewDetails>
                            <Typography variant="h6">{review.reviewer.name}</Typography>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

                              <Typography variant="body2">
                                {timeAgo(review.date)}
                              </Typography>
                            </div>
                            <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                            <Typography variant="body1">{review.comment}</Typography>
                          </ReviewDetails>
                          <IconButton onClick={() => deleteHandler(review._id)}
                            sx={{ width: "4rem", p: 0 }}>
                            <Delete color='error' sx={{ fontSize: "2rem" }} />
                          </IconButton>
                        </ReviewCardDivision>
                      </ReviewCard>
                    ))}
                  </ReviewContainer>
                )
                  :
                  <ReviewWritingContainer>
                    <Typography variant="h6">No Reviews Found.</Typography>
                  </ReviewWritingContainer>
                }

                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                <AlertDialogSlide dialog={dialog} showDialog={showDialog} setShowDialog={setShowDialog} taskHandler={deleteAllHandler} />
              </>
          }
        </>
      }
    </>
  );
};

export default ViewProductSeller;

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

const EditImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
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

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;