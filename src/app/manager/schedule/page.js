'use client';
import { Paper, Box, Grid, Stack } from '@mui/material';
import PageContainer from '@/app/(home)/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import dynamic from 'next/dynamic'
const OffSchedule = dynamic(() => import('./OffSchedule'), { ssr: false })

const Shadow = () => {
  return (
    <PageContainer title="" description="this is Shadow">
      <DashboardCard title="">
        <Grid container spacing={2}>
          <Stack direction={'row'}>
            <OffSchedule></OffSchedule>
          </Stack>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
