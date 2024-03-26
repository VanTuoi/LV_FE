import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Box, Typography, Button } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { IconFlag, IconUserCircle, IconStar } from "@tabler/icons-react";
import { List, IconButton, Avatar, Skeleton, Select, MenuItem, Divider } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// In the Project
import useSaveStores from '@/hook/user/useSaveStores';
import useDetailStore from '@/hook/user/useSort';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: '0.9rem',
        padding: '8px'
    },
}));


export default function ListStoreSave() {

    const { listSaveStore, setListSaveStore, getStatusSaveAllStore, unSaveStore } = useSaveStores()

    const router = useRouter()

    useEffect(() => {
        getStatusSaveAllStore()
    }, [])

    const { sortFavouriteStores } = useDetailStore()

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = 200;               // Thời gian delay là 2000ms (5 giây)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer); // Xóa timer khi component bị unmount
    }, []);

    const [typeSort, setTypeSort] = useState('A-Z');

    const handleChangeTypeSort = (event) => {
        setTypeSort(event.target.value);
        if ('A-Z' === event.target.value)
            setListSaveStore(sortFavouriteStores(listSaveStore, 'A-Z',))
        if ('Z-A' === event.target.value)
            setListSaveStore(sortFavouriteStores(listSaveStore, 'Z-A'))
    };

    const handleClickDeleteStore = async (id) => {                   // Gọi hook
        let status = await unSaveStore(id)
        if (status === true) {
            toast.success('Đã xóa cửa hàng khỏi danh sách đã lưu')
            getStatusSaveAllStore()
        } else {
            toast.error('Không thể xóa cửa hàng khỏi danh sách đã lưu')
        }
    };

    const handleClickStore = (id) => {
        router.push(`/store?id=${id}`)
    }


    return (
        <Stack direction="column" spacing={1} >
            <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                {!isLoading && listSaveStore && listSaveStore.length > 0 ? (
                    <Box display={'flex'} sx={{ flexDirection: 'row-reverse', width: '100%' }} >
                        <Select
                            labelId="lg"
                            id="lg"
                            value={typeSort}
                            size="small"
                            onChange={handleChangeTypeSort}
                        >
                            <MenuItem value={'A-Z'}>A-Z</MenuItem>
                            <MenuItem value={'Z-A'}>Z-A</MenuItem>
                        </Select>
                    </Box>
                ) : <></>
                }
            </Stack>
            <List sx={{ width: '100%', bgcolor: '#F7F7F7' }}>
                {isLoading ? (
                    <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Stack direction="column" spacing={1} alignItems={'center'}>
                                <Skeleton animation="wave">
                                    <Box >
                                        <img
                                            style={{ borderRadius: '5px' }}
                                            width="100"
                                            height="100"
                                        />
                                    </Box>
                                </Skeleton>
                            </Stack>
                            <Stack direction="column" spacing={0} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                                    <Typography variant="body2" sx={{ padding: '3px', backgroundColor: 'rgb(239, 239, 239)', borderRadius: '4px' }}>
                                        ###############
                                    </Typography>
                                </Skeleton>
                                <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                                    <Stack direction="row">
                                        {[...Array(5)].map((_, index) => (
                                            <Box key={index} sx={{ fontSize: '0.5rem' }}>
                                                <IconStar key={index} />
                                            </Box>
                                        ))}
                                    </Stack>
                                </Skeleton>
                                <Skeleton animation="wave" variant="text" width={150} height={20} sx={{ fontSize: '1rem' }} >
                                </Skeleton>
                            </Stack>
                        </Stack>
                        <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                        </Skeleton>
                    </Stack>
                ) : (
                    <Stack direction={'column'} spacing={1}>
                        {listSaveStore.map((item, index) => (
                            <React.Fragment key={index}>
                                <Stack direction="row" spacing={1} justifyContent="space-between" >
                                    <Stack direction="row" spacing={1}>
                                        <Stack direction="column" spacing={1} alignItems={'center'}
                                        >
                                            <Box >
                                                <img
                                                    style={{ borderRadius: '5px' }}
                                                    src="https://images.otstatic.com/prod/27106858/4/medium.jpg"
                                                    alt="Ảnh cửa hàng"
                                                    width="100"
                                                    height="100"
                                                />
                                            </Box>
                                        </Stack>
                                        <Stack direction="column" spacing={1} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                            <Typography variant="h6" fontWeight={500}
                                                onClick={() => handleClickStore(item.CS_Id)}
                                                sx={{
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {item.CS_Name}
                                            </Typography>
                                            <Stack direction="coulum" alignItems={'center'}
                                                onClick={() => handleClickDeleteStore(item.CS_Id)}
                                                sx={{
                                                    cursor: "pointer",
                                                    '&:hover': {
                                                        fontWeight: '600',
                                                        color: 'red' // Màu vàng tối hơn khi hover
                                                    }
                                                }}
                                            >
                                                <BookmarkBorderIcon style={{ fontSize: 17 }} />
                                                <Typography variant="body2" fontWeight={500}>
                                                    Xóa khỏi danh sách yêu thích
                                                </Typography>
                                            </Stack>
                                            <Typography variant="body1" fontWeight={500}>
                                                {item.CS_Location}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction={'column'} justifyContent={'center'}>
                                        <Button variant='contained'
                                            onClick={() => handleClickStore(item.CS_Id)}
                                            sx={{
                                                cursor: "pointer"
                                            }}>
                                            Đặt bàn ngay
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
                            </React.Fragment>
                        ))}
                    </Stack>
                )
                }
            </List >
        </Stack>

    );
}
