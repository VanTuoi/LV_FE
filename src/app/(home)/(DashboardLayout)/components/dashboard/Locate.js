import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, TextField, Typography, FormControl, InputLabel, Button, Box } from '@mui/material';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { Stack } from '@mui/system';

import ButtonSelectLocation from './ButtonSelectLocation'

import useSearch from '@/hook/user/useSearch'
import Link from 'next/link';

import { useAppSelector } from '@/lib/hooks';

import { IconMapPin, IconCurrentLocationOff } from "@tabler/icons-react";

const Locate = () => {

    const { setLocationToBrowser } = useSearch();

    const [currenLocate, setCurrenLocate] = useState(null);
    const [currenStatus, setCurrenStatus] = useState(null);
    const locate = useAppSelector((state) => state.reducer.search.locate)
    const statusFindLocate = useAppSelector((state) => state.reducer.search.status)

    useEffect(() => {
        setLocationToBrowser()
    }, []);

    useEffect(() => {
        setCurrenLocate(locate)
        setCurrenStatus(statusFindLocate)
    }, [locate, statusFindLocate]);

    return (

        <DashboardCard title="">
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Stack
                    direction='column'
                    alignItems='center'
                    spacing={0}
                >
                    <Stack spacing={1} direction="row" alignItems="center">
                        <ButtonSelectLocation></ButtonSelectLocation>
                    </Stack>
                    {/* <Typography variant="h6" component="h6">
                        Chọn từ bản đồ
                    </Typography> */}
                    Chọn từ bản đồ
                </Stack>

                {currenStatus === 'notSelect' ?

                    (
                        <>
                            <IconCurrentLocationOff></IconCurrentLocationOff>
                            <Typography variant="h6" component="h6">
                                Không lấy được vị trí hiện tại
                            </Typography>
                            <Button onClick={setLocationToBrowser}>
                                Thử lại ?
                            </Button>
                        </>
                    )
                    :
                    (
                        <>
                            <Typography variant="h6" component="h6">
                                {currenStatus === 'Thành công' ? (currenLocate) : (currenStatus)}
                            </Typography>
                        </>
                    )
                }
            </Stack>
            <Stack
                direction='column'
                alignItems='center'
                spacing={2}
            >
            </Stack>
        </DashboardCard >
    );
};

export default Locate;
