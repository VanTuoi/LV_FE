'use client'
//Third-party
import { Grid, Box } from '@mui/material';
import { useSearchParams } from 'next/navigation'

// In the Project
import PageContainer from '@/app/(home)/components/container/PageContainer';
import StoreDetails from '@/app/(home)/store/components/StoreDetails'
import MakeTheBooking from '@/app/(home)/store/components/MakeTheBooking'
import CusTomBreadcrumbs from "@/app/(home)/store/components/CusTomBreadcrumbs";
import Slider from "@/app/(home)/store/components/Slider";

import Textheight from '@/app/(home)/store/components/testheight'             // Test


const Dashboard = ({ params }) => {

    const searchParams = useSearchParams()
    const id = searchParams.get('id')           // Lấy Id sản phẩm từ url

    return (
        <PageContainer title='Cửa hàng' description="this is Dashboard">
            <Grid container spacing={3}>

                <Grid item xs={12} lg={12}>
                    {/* <CusTomBreadcrumbs
                        sx={{
                            marginBottom: '5px'
                        }} params={params}>
                    </CusTomBreadcrumbs> */}
                    {/* <Slider mt={1} /> */}
                </Grid>

                <Grid item xs={12} lg={8}
                    zIndex={1}
                // sx={{ marginTop: '-80px' }}
                >
                    <StoreDetails id={id}></StoreDetails>
                </Grid>

                <Grid item xs={12} lg={4}
                    style={{ position: 'sticky', top: 50 }}
                    zIndex={1}
                // sx={{ marginTop: '-80px' }}
                >
                    {/* <MakeTheBooking ></MakeTheBooking> */}
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Textheight></Textheight>
                </Grid>
            </Grid>
        </PageContainer >
    )
}

export default Dashboard;
