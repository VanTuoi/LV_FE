import React, { } from 'react';
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';
import { Stack } from '@mui/system';

import Slider from '../components/Slider'

const BackGroundImage = () => {

    return (
        <DashboardCard title="">
            <Stack
                direction='column'
                alignItems='center'
                spacing={1}
            >
                <Slider></Slider>
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

export default BackGroundImage;
