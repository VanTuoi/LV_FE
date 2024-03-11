'use client'
//Third-party
import { Grid, Box } from '@mui/material';
import { useSearchParams } from 'next/navigation'

// In the Project
import PageContainer from '@/app/(home)/components/container/PageContainer';
import ProductDetails from '@/app/(home)/products/components/ProductDetails'
import MakeTheBooking from '@/app/(home)/products/components/MakeTheBooking'
import Textheight from '@/app/(home)/products/components/testheight'             // Test
import CusTomBreadcrumbs from "@/app/(home)/products/components/CusTomBreadcrumbs";
import Slider from "@/app/(home)/products/components/Slider";


const Dashboard = ({ params }) => {

    const searchParams = useSearchParams()
    const id = searchParams.get('id')           // Lấy Id sản phẩm từ url

    return (
        <PageContainer title="Detail Product" description="this is Dashboard">
            <Grid container spacing={3}>

                <Grid item xs={12} lg={12}>
                    <CusTomBreadcrumbs sx={{
                        marginBottom: '5px'
                    }} params={params}></CusTomBreadcrumbs>
                    <Slider mt={1} />
                </Grid>

                <Grid item xs={12} lg={8}
                    zIndex={1}
                // sx={{ marginTop: '-80px' }}
                >
                    <ProductDetails id={id}></ProductDetails>
                </Grid>

                <Grid item xs={12} lg={4}
                    style={{ position: 'sticky', top: 50 }}
                    zIndex={1}
                // sx={{ marginTop: '-80px' }}
                >
                    <MakeTheBooking ></MakeTheBooking>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Textheight></Textheight>
                </Grid>
            </Grid>
        </PageContainer >
    )
}

export default Dashboard;
