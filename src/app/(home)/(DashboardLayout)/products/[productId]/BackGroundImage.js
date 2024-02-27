import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, TextField, Typography, FormControl, InputLabel, Button, Box } from '@mui/material';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { Stack } from '@mui/system';


import Link from 'next/link';

import { useAppSelector } from '@/lib/hooks';

import { IconMapPin, IconCurrentLocationOff } from "@tabler/icons-react";

import Slider from '../components/Slider/Slider'

const Locate = () => {


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

export default Locate;
