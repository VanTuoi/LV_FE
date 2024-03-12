
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
import Rate from '@/app/(home)/store/components/storeDetails/storeDetails/Rate'
import Tags from '@/app/(home)/store/components/storeDetails/storeDetails/Tags'
import Menu from '@/app/(home)/store/components/storeDetails/storeDetails/Menus'
import Detail from '@/app/(home)/store/components/storeDetails/storeDetails/Detail'
import Reviews from '@/app/(home)/store/components/storeDetails/storeDetails/Reviews'
import SupportServices from '@/app/(home)/store/components/storeDetails/storeDetails/SupportServices'
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';

import Store from '@/hook/store/useStore';

// let list2 = [
//     { S_IsAvailable: true, S_Name: 'Wifi', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Điều hòa', S_Describe: '' },
//     { S_IsAvailable: false, S_Name: 'Phòng riêng', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Bàn ngoài trời', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Máy chiếu', S_Describe: '' },
//     { S_IsAvailable: false, S_Name: 'Bóng đá K+', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Ghế trẻ em', S_Describe: '' },
//     { S_IsAvailable: false, S_Name: 'Chỗ chơi trẻ em', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Chỗ hút thuốc', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Hóa đơn VAT', S_Describe: '' },
//     { S_IsAvailable: false, S_Name: 'Visa/Master card', S_Describe: '' },
//     { S_IsAvailable: false, S_Name: 'Chỗ để ô tô', S_Describe: '' },
//     { S_IsAvailable: true, S_Name: 'Phục vụ đồ ăn nhẹ', S_Describe: '' },
// ]

const ProductDetail = (props) => {

    const { id } = props

    const { store, menus, detail, services, getStorebyId, getDetailbyId, getMenusbyId, getServicesbyId } = Store()

    const [value, setValue] = useState('1');

    const [numberStar, setNumberStar] = useState(5)
    const [dataStore, setDataStore] = useState(null)
    const [dataMenus, setDataMenus] = useState([])
    const [dataTags, setDataTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])            // ['Tag 1', 'Tag 2', 'Tag 3']
    const [dataServices, setDataServices] = useState([])            // ['Tag 1', 'Tag 2', 'Tag 3']
    const [dataDetails, setDataDetails] = useState(null)

    useEffect(() => {
        getStorebyId(id)
        getDetailbyId(id)
        getMenusbyId(id)
        getServicesbyId(id)
    }, [])

    useEffect(() => {
        setDataStore(store)
        setDataMenus(menus)
        setDataDetails(detail)
        setDataServices(services)
    }, [store, menus, detail, services])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <DashboardCard DashboardCard title="" >
            <Stack direction="column" spacing={1}>
                <Typography variant="h3" component="h3">
                    {dataStore && dataStore.CS_Name ? dataStore.CS_Name : <Skeleton variant="rectangular" width={'50%'} height={35} />}
                </Typography>
                {dataStore && dataStore.CS_Location ?
                    (<Stack direction="row" spacing={2} alignItems={'center'}>
                        <IconMapPinFilled size={18} />
                        <Typography variant="h5" component="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                            {dataStore.CS_Location}
                        </Typography>
                    </Stack>)
                    :
                    (<Skeleton variant="rectangular" width={'60%'} height={30} />)
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
                                <Tab sx={{ fontSize: value === '3' ? '1rem' : '' }} value="3" label="Dịch vụ hỗ trợ" />
                                <Tab sx={{ fontSize: value === '4' ? '1rem' : '' }} value="4" label="Đánh giá" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Detail content={dataDetails && dataDetails.CS_Detail ? dataDetails.CS_Detail : null} /></TabPanel>
                        <TabPanel value="2"><Menu menus={dataMenus} /></TabPanel>
                        <TabPanel value="3"><SupportServices list={dataServices} /></TabPanel>
                        <TabPanel value="4"><Reviews /></TabPanel>
                    </TabContext>
                </Box>
            </Stack>
        </DashboardCard>
    );
};

export default ProductDetail;
