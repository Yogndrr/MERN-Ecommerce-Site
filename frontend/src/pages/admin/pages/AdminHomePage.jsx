import { Grid } from '@mui/material';

import EarningCard from '../components/EarningCard';
import TotalOrderLineChartCard from '../components/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../components/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../components/TotalIncomeLightCard';
import AppWidgetSummary from '../components/AppWidgetSummary';

const AdminHomePage = () => {

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Weekly Sales" total={714} icon={'ant-design:carry-out-filled'} />
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

      <Grid item xs={12}>

        <Grid container spacing={3}>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard />
          </Grid>

          <Grid item lg={4} md={12} sm={12} xs={12}>

            <Grid container spacing={3}>

              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard />
              </Grid>

              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminHomePage;
