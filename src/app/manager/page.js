'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/manager/components/container/PageContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic'
const DateWithNoSSR = dynamic(() => import('./components/dashboard/BookingSchedule'), { ssr: false })

import useControllerStore from '@/hook/manager/useControllerStore'

const Dashboard = () => {

    const router = useRouter()
    const { haveStore, checkHaveStore } = useControllerStore()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        checkHaveStore();
    }, [])

    useEffect(() => {
        if (haveStore === true)
            setIsLoading(true)
    }, [haveStore])

    return (
        <PageContainer title="Trang tổng quan" description="this is Dashboard">
            {isLoading ? (
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <Stack direction={'column'}>
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight={500}
                                // color="textSecondary"
                                >
                                    Trạng thái đặt bàn hiện tại
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
            ) : (
                'Loading...'
            )
            }
        </PageContainer >
    )
}

export default Dashboard;
