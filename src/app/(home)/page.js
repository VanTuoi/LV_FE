'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(home)/components/container/PageContainer';
// components
import Search from '@/app/(home)/components/dashboard/Search';
import Locate from '@/app/(home)/components/dashboard/Locate';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>

          </Grid>
          <Grid item xs={12} lg={12}>
            {/* <Locate /> */}
          </Grid>
          <Grid item xs={12} lg={12}>
            <Search />
          </Grid>
          <Grid item xs={12} lg={12}>
            {/* <Photo /> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
