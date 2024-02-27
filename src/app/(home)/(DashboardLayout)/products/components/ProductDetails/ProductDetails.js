import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Divider, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';

import Rate from './Components/Rate'
import Tags from './Components/Tags'
import Detail from './Components/Detail'
import Menu from './Components/Menu'
import Reviews from './Components/Reviews'
import { IconMapPinFilled } from "@tabler/icons-react";

const Locate = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const sampleTags = ['Tag 1', 'Tag 2', 'Tag 3'];

    return (

        <DashboardCard DashboardCard title="" >
            <Stack direction="column" spacing={1}>
                <Typography variant="h3" component="h3">
                    The Coffee House
                </Typography>
                <Typography variant="h7" component="h7" sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconMapPinFilled sx={{ fontSize: 'small', mr: 1 }} /> {/* mr: 1 để thêm khoảng cách giữa biểu tượng và văn bản */}
                    Số 56, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ
                </Typography>

                <Divider sx={{ marginTop: '5px' }} />
                <Rate />
                <Tags tags={sampleTags} />
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Giới thiệu" value="1" />
                                <Tab label="Menu" value="2" />
                                <Tab label="Đánh giá" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Detail /></TabPanel>
                        <TabPanel value="2"><Menu /></TabPanel>
                        <TabPanel value="3"><Reviews /></TabPanel>
                    </TabContext>
                </Box>

            </Stack>
        </DashboardCard>
    );
};

export default Locate;
