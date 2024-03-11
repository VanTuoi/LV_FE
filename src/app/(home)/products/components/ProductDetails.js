
// Third-party
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Divider, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IconMapPinFilled } from "@tabler/icons-react";
import Skeleton from '@mui/material/Skeleton';

// In the Project
import Rate from './ProductDetails/Components/ProductDetails.js/Rate'
import Tags from './ProductDetails/Components/ProductDetails.js/Tags'
import Detail from './ProductDetails/Components/ProductDetails.js/Detail'
import Menu from './ProductDetails/Components/ProductDetails.js/Menus'
import Reviews from './ProductDetails/Components/ProductDetails.js/Reviews'
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';

import Store from '@/hook/manager/useStore';

const ProductDetail = (props) => {

    const { id } = props

    const { store, menus, detail, getStorebyId, getDetailbyId, getMenusbyId } = Store()
    const [value, setValue] = useState('1');

    const [numberStar, setNumberStar] = useState(5)
    const [dataStore, setDataStore] = useState(null)
    const [dataMenus, setDataMenus] = useState([])
    const [dataTags, setDataTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])            // ['Tag 1', 'Tag 2', 'Tag 3']
    const [dataDetails, setDataDetails] = useState(null)

    useEffect(() => {
        getStorebyId(id)
        getDetailbyId(id)
        getMenusbyId(id)
    }, [])

    useEffect(() => {
        setDataStore(store)
        setDataMenus(menus)
        setDataDetails(detail)
    }, [store, menus, detail])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <DashboardCard DashboardCard title="" >
            <Stack direction="column" spacing={1}>
                <Typography variant="h3" component="h3">
                    {dataStore && dataStore.CS_Name ? dataStore.CS_Name : <Skeleton variant="rectangular" width={400} height={35} />}
                </Typography>
                {dataStore && dataStore.CS_Location ?
                    (<Stack direction="row" spacing={2} alignItems={'center'}>
                        <IconMapPinFilled size={18} />
                        <Typography variant="h5" component="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                            {dataStore.CS_Location}
                        </Typography>
                    </Stack>)
                    :
                    (<Skeleton variant="rectangular" width={400} height={30} />)
                }

                <Divider sx={{ marginTop: '5px' }} />
                <Rate numberStar={numberStar ? numberStar : null} />            {/** Hiển thị số sao */}
                <Tags tags={dataTags ? dataTags : null} />                      {/** Hiển thị ưu đãi đặc biệt */}
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab sx={{ fontSize: value === '1' ? '1rem' : '' }} value="1" label="Giới thiệu" />
                                <Tab sx={{ fontSize: value === '2' ? '1rem' : '' }} value="2" label="Menu" />
                                <Tab sx={{ fontSize: value === '3' ? '1rem' : '' }} value="3" label="Đánh giá" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Detail content={dataDetails && dataDetails.CS_Detail ? dataDetails.CS_Detail : null} /></TabPanel>
                        <TabPanel value="2"><Menu menus={dataMenus} /></TabPanel>
                        <TabPanel value="3"><Reviews /></TabPanel>
                    </TabContext>
                </Box>
            </Stack>
        </DashboardCard>
    );
};

export default ProductDetail;
