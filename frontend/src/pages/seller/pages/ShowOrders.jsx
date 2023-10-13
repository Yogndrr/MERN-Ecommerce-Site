import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificProducts } from '../../../redux/userHandle';
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../utils/buttonStyles';

const ShowOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      id: product.productID,
    }))
    : [];

  const ProductsButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          onClick={() => {
            navigate("/Seller/orders/product/" + row.id)
          }}
        >
          View Product
        </BlueButton >
        <GreenButton
          onClick={() => {
            navigate("/Seller/orders/customers/" + row.id)
          }}
        >
          Show Customers
        </GreenButton >
      </>
    );
  };

  const Section = () => {
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

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Added To Cart" {...a11yProps(0)} />
          <Tab label="Out For Delivery" {...a11yProps(1)} />
          <Tab label="Completed Orders" {...a11yProps(2)} />
          <Tab label="Cancelled Orders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Section />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Section />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Section />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        0 Cancelled Orders
      </CustomTabPanel>
    </Box>
  );
}

export default ShowOrders

const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}