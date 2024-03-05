'use client'
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/manager/components/container/PageContainer';
// components
// import SalesOverview from '@/app/admin/(DashboardLayout)/components/dashboard/SalesOverview';
// import YearlyBreakup from '@/app/admin/(DashboardLayout)/components/dashboard/YearlyBreakup';
// import RecentTransactions from '@/app/admin/(DashboardLayout)/components/dashboard/RecentTransactions';
// import ProductPerformance from '@/app/admin/(DashboardLayout)/components/dashboard/ProductPerformance';
// import Blog from '@/app/admin/(DashboardLayout)/components/dashboard/Blog';
// import MonthlyEarnings from '@/app/admin/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import dynamic from 'next/dynamic'
const DateWithNoSSR = dynamic(() => import('./components/dashboard/BookingSchedule'), { ssr: false })
const Dashboard = () => {
  return (
    <>
      <PageContainer title="Dashboard" description="this is Dashboard">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Stack direction={'column'}>
                <Typography
                  variant="h5"
                  textAlign="center"
                // color="textSecondary"
                >
                  Trạng thái đặt bàn
                </Typography>
                <DateWithNoSSR></DateWithNoSSR>
              </Stack>
              {/* <SalesOverview /> */}
            </Grid>
            <Grid item xs={12} lg={6}>
              {/* <SalesOverview /> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* <YearlyBreakup /> */}
                </Grid>
                <Grid item xs={12}>
                  {/* <MonthlyEarnings /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <RecentTransactions /> */}
            </Grid>
            <Grid item xs={12} lg={8}>
              {/* <ProductPerformance /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Blog /> */}
            </Grid>
          </Grid>
        </Box>
      </PageContainer >
    </>
  )
}

export default Dashboard;
