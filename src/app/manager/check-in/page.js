'use client';
import { useState } from 'react';
import { Paper, Box, Grid, Stack, Backdrop, Button } from '@mui/material';
import PageContainer from '@/app/(home)/components/container/PageContainer';
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Scanner from './Components/ScannerQr'
import DetailsTicket from './Components/DetailsTicket'
import CheckinHistory from './Components/CheckinHistory'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import { FullScreen, useFullScreenHandle } from "react-full-screen";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const CheckIn = () => {

  // const handle = useFullScreenHandle();  // toàn mh
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

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
              <Scanner heightConfig={'400px'} widthConfig={'500px'}></Scanner>
            </DashboardCard>
            {/* <>
              <Button variant="text" onClick={handleClickOpen}>
                Full màn hình
              </Button>
              <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth={false}
                fullScreen
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                  </Box>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent
                  dividers={false}

                >
                  <Stack direction={'row'}>
                    <Scanner heightConfig={'720px'} widthConfig={'1280px'}></Scanner>
                    <DetailsTicket />
                  </Stack>
                </DialogContent>
                <DialogActions>
                </DialogActions>
              </BootstrapDialog>
            </> */}
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
                {/* <CheckinHistory></CheckinHistory>
                 */}
                <Box sx={{ height: '210px' }}>
                  null
                </Box>
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
