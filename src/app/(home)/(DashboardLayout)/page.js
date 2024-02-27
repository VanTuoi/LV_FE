'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(home)/(DashboardLayout)/components/container/PageContainer';
// components
import Search from '@/app/(home)/(DashboardLayout)/components/dashboard/Search';
import Locate from '@/app/(home)/(DashboardLayout)/components/dashboard/Locate';
import RecentTransactions from '@/app/(home)/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(home)/(DashboardLayout)/components/dashboard/ProductPerformance';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>

          </Grid>
          <Grid item xs={12} lg={12}>
            <Locate />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Search />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
