import { Grid } from '@mui/material';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';

const SellerHomePage = () => {

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Weekly Sales" total={71} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Added to Cart" total={23} color="success" icon={'ant-design:shopping-cart-outlined'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={17} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Cancelled Orders" total={13} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
