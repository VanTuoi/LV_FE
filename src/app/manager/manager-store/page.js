'use client'
import React, { useEffect, useState } from 'react';
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import PageContainer from '@/app/manager/components/container/PageContainer';

import useControllerStore from '@/hook/manager/useControllerStore'

import Proflie from './components/Profile'
import EditPageDetails from './components/EditPageDetails'

const ManagerStore = () => {

  const { getFullStore } = useControllerStore()

  let [checkhaveStore, setCheckHaveStore] = useState(true)

  useEffect(() => {
    getFullStore()
  }, [])


  return (
    <PageContainer title="Quản lý thông tin cửa hàng" description="this is manager store">
      {checkhaveStore === true ? (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Proflie />
          </Grid>
          <Grid item xs={12} lg={12}>
            <EditPageDetails />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Stack direction={'row'} spacing={5} justifyContent={'center'}>
              <Button variant="outlined" color="error">
                Hủy
              </Button>
              <Button variant="contained"
              // onClick={updateStorebyId}
              >
                Lưu lại
              </Button>
              <Button variant="contained"
              // onClick={createStore}
              >
                Tạo mới
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )
        :
        (
          <Stack direction={'column'} spacing={5}>
            <Typography variant="h6" fontWeight={400} >
              Rất tiếc, bạn chưa quản lý cửa hàng
            </Typography>
            {/* <Button variant='contained'>
              Quản lý ngay
            </Button> */}
          </Stack>
        )
      }
    </PageContainer>
  );
}
export default ManagerStore
