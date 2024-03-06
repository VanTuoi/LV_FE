import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';
import Tiny from './Components/TinyEditor'
const Locate = () => {

    return (

        <DashboardCard title="">
            <Box height={'2000px'}>
                <Tiny></Tiny>
            </Box>
        </DashboardCard >
    );
};

export default Locate;
