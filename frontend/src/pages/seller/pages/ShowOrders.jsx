import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddedToCartSection from '../components/AddedToCartSection';
import OutForDeliverySection from '../components/OutForDeliverySection';

const ShowOrders = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <AddedToCartSection />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OutForDeliverySection />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        0 Completed Orders
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