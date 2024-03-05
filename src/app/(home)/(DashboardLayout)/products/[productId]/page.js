'use client'
import { Grid, Box } from '@mui/material';

// components
import PageContainer from '@/app/(home)/(DashboardLayout)/components/container/PageContainer';
import ProductDetails from '@/app/(home)/(DashboardLayout)/products/components/ProductDetails/ProductDetails'
import MakeABooking from '@/app/(home)/(DashboardLayout)/products/components/ProductDetails/MakeABooking'
import Textheight from '@/app/(home)/(DashboardLayout)/products/components/ProductDetails/textheight'

import CusTomBreadcrumbs from "./CusTomBreadcrumbs";
import BackGroundImage from "./BackGroundImage";

const Dashboard = ({ params }) => {
    return (
        <PageContainer title="Detail Product" description="this is Dashboard">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <CusTomBreadcrumbs params={params}></CusTomBreadcrumbs>
                    {/* <BackGroundImage></BackGroundImage > */}
                </Grid>
                <Grid item xs={12} lg={1}>
                </Grid>
                <Grid item xs={12} lg={6}
                    zIndex={1}
                    sx={{ marginTop: '-80px' }}
                >
                    <ProductDetails></ProductDetails>
                </Grid>
                <Grid item xs={12} lg={4}
                    /* Giữ cho nằm trên góc không mất khi cuộn */
                    style={{ position: 'sticky', top: 50 }}
                    zIndex={1}
                    sx={{ marginTop: '-80px' }}
                >
                    <MakeABooking ></MakeABooking>
                </Grid>
                <Grid item xs={12} lg={1}>
                </Grid>
                <Grid item xs={12} lg={12}>
                    {/* <Textheight></Textheight> */}
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default Dashboard;
