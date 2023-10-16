import { useDispatch, useSelector } from "react-redux";
import { getSpecificProducts } from "../../../redux/userHandle";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { BlueButton, GreenButton } from "../../../utils/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import { useNavigate } from "react-router-dom";

const AddedToCartSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { currentUser, specificProductData, responseSpecificProducts } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSpecificProducts(currentUser._id, "getAddedToCartProducts"));
    }, [dispatch, currentUser._id])

    const productsColumns = [
        { id: 'name', label: 'Product Name', minWidth: 170 },
        { id: 'quantity', label: 'Product Quantity', minWidth: 100 },
        { id: 'category', label: 'Product Category', minWidth: 100 },
        { id: 'subcategory', label: 'Product SubCategory', minWidth: 100 },
    ]

    const productsRows = Array.isArray(specificProductData) && specificProductData.length > 0
        ? specificProductData.map((product) => ({
            name: product.productName,
            quantity: product.quantity,
            category: product.category,
            subcategory: product.subcategory,
            id: product.productName,
            productID: product.productID,
        }))
        : [];

    const ProductsButtonHaver = ({ row }) => {
        return (
            <>
                <BlueButton
                    onClick={() => {
                        navigate("/Seller/orders/product/" + row.productID)
                    }}
                >
                    View Product
                </BlueButton >
                <GreenButton
                    onClick={() => {
                        navigate("/Seller/orders/customers/" + row.productID)
                    }}
                >
                    Show Customers
                </GreenButton >
            </>
        );
    };

    return (
        <>
            {responseSpecificProducts ?
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Seller/addproduct")}
                    >
                        Add Products
                    </GreenButton>
                </Box>
                :
                <>
                    <Typography variant="h5" gutterBottom>
                        Products List:
                    </Typography>

                    <TableTemplate buttonHaver={ProductsButtonHaver} columns={productsColumns} rows={productsRows} />
                </>
            }
        </>
    )
}

export default AddedToCartSection