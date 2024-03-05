'use client';
import { Paper, Box, Grid, Stack, Backdrop } from '@mui/material';
import PageContainer from '@/app/(home)/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Scanner from './ScannerQr'
import DetailsTicket from './DetailsTicket'
import CheckinHistory from './CheckinHistory'

// import { FullScreen, useFullScreenHandle } from "react-full-screen";


const CheckIn = () => {

  // const handle = useFullScreenHandle();

  return (
    <>
      {/* <button onClick={handle.enter}>
        Enter fullscreen
      </button>
      <FullScreen handle={handle}
        style={{ background: "green" }}>
      </FullScreen> */}
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      > */}

      <PageContainer title="" description="this is Shadow">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6}>
            <DashboardCard title="Trình quét mã QR">
              <Scanner></Scanner>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              direction="column"
              spacing={1}
            >
              <DashboardCard title="Thông tin chi tiết về mã QR">
                <DetailsTicket></DetailsTicket>
              </DashboardCard>
              <DashboardCard title="Lịch sử check in">
                <CheckinHistory></CheckinHistory>
              </DashboardCard>

            </Stack>
          </Grid>
        </Grid>
      </PageContainer>
      {/* </Backdrop > */}
    </>
  );
};

export default CheckIn;
