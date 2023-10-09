import { Grid } from '@mui/material';
import AppWidgetSummary from '../components/AppWidgetSummary';
import OverviewSales from '../components/OverviewSales';

const AdminHomePage = () => {

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Weekly Sales" total={714} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Added to Cart" total={23} color="success" icon={'ant-design:shopping-cart-outlined'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Ongoing Orders" total={172} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Cancelled Orders" total={13} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OverviewSales type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OverviewSales type="bar" />
      </Grid>
    </Grid>
  );
};

export default AdminHomePage;
