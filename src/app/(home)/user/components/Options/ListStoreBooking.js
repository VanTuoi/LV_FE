
//Third-party
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Stack, Box, Typography, Button, List, Skeleton, Select, MenuItem, Divider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// In the Project
import useTicketsBooking from '@/hook/user/useTicketsBooking';
import useSort from '@/hook/user/useSort';

export default function ListStoreBooking() {

    const router = useRouter()
    const { sortTickets } = useSort()
    const { bookingTickets, getAllTicketsBooking, setBookingTickets } = useTicketsBooking()
    const [isLoading, setIsLoading] = useState(true);
    const [typeSort, setTypeSort] = useState('Newest');

    useEffect(() => {
        getAllTicketsBooking()
    }, [])

    useEffect(() => {
        const delay = 2000;               // Thời gian delay là 0.2s
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer);
    }, []);

    const handleChangeTypeSort = (event) => {
        setTypeSort(event.target.value);
        setBookingTickets(sortTickets(bookingTickets, event.target.value))
    }

    const handleClickStore = (id) => {
        router.push(`/store?id=${id}`)
    }

    const handleClickDeleteStore = async (id) => {
        let status = await unSaveStore(id)
        if (status === true) {
            toast.success('Đã xóa cửa hàng khỏi danh sách đã lưu')
            getStatusSaveAllStore()
        } else {
            toast.error('Không thể xóa cửa hàng khỏi danh sách đã lưu')
        }
    };

    const statusTicket = (status, timeCome) => {        // Tùy chỉnh giao diện trạng thái đặt bàn
        switch (status) {
            case 'Late':
                return (
                    <Typography variant="body2" sx={{ backgroundColor: '#DD0000', padding: '5px', borderRadius: '4px' }}>
                        Bạn đã trễ hẹn
                    </Typography>
                )
            case 'Has Arrived':
                return (
                    <Typography variant="body2" sx={{ backgroundColor: '#33CC66', padding: '5px', borderRadius: '4px' }}>
                        Bạn đã check in thành công (vào lúc {dayjs(timeCome).format('DD/MM/YYYY HH:mm')})
                    </Typography>
                )
            case 'Waiting':
                return (
                    <Typography variant="body2" sx={{ backgroundColor: '#FFFF99', padding: '5px', borderRadius: '4px' }}>
                        Chưa đến hẹn
                    </Typography>
                )
            default:
                return null;
        }
    }

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                {!isLoading && bookingTickets && bookingTickets.length > 0 && (
                    <Box display={'flex'} sx={{ flexDirection: 'row-reverse', width: '100%' }}>
                        <Select
                            labelId="lg"
                            id="lg"
                            value={typeSort}
                            size="small"
                            onChange={handleChangeTypeSort}
                        >
                            <MenuItem value={'A-Z'}>A-Z</MenuItem>
                            <MenuItem value={'Z-A'}>Z-A</MenuItem>
                            <MenuItem value={'Newest'}>Mới nhất</MenuItem>
                            <MenuItem value={'Oldest'}>Cũ nhất</MenuItem>
                        </Select>
                    </Box>
                )}
            </Stack>
            <List sx={{ width: '100%', bgcolor: '#F7F7F7' }}>
                {isLoading ? (
                    <Stack direction="row" spacing={1} justifyContent="flex-start">
                        <Skeleton animation="wave" sx={{ width: 100, height: 100 }}></Skeleton>
                        <Stack direction="column" spacing={0} alignItems={'flex-start'} justifyContent={'flex-start'}>
                            <Skeleton animation="wave" variant="text" height={30} width={120} sx={{ fontSize: '1rem' }} ></Skeleton>
                            <Skeleton animation="wave" variant="text" height={30} width={150} sx={{ fontSize: '1rem' }} ></Skeleton>
                            <Skeleton animation="wave" variant="text" width={150} height={20} sx={{ fontSize: '1rem' }} ></Skeleton>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction={'column'} spacing={1}>
                        {bookingTickets.map((item, index) => (
                            <React.Fragment key={index}>
                                <Stack direction="row" spacing={1} justifyContent="space-between">
                                    <Stack direction="row" spacing={1}>
                                        <img
                                            style={{ borderRadius: '5px' }}
                                            src="https://images.otstatic.com/prod/27106858/4/medium.jpg"
                                            alt="Ảnh cửa hàng"
                                            width="100"
                                            height="100"
                                        />
                                        <Stack direction="column" spacing={1} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                            <Typography variant="h6" fontWeight={500}
                                                onClick={() => handleClickStore(item.CS_Id)}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                {item.CS_Name}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                Vị trí: {item.CS_Location}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                Thời gian đến: {dayjs(item.RT_DateTimeArrival).format('DD/MM/YYYY HH:mm')}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                Số lượng: {item.RT_NumberOfParticipants}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                Trạng thái: {statusTicket(item.SRT_Describe, item.RT_TimeCheckIn)}
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
                                                <DeleteForeverIcon style={{ fontSize: 17 }} />
                                                <Typography variant="body2" fontWeight={500}>
                                                    Xóa khỏi lịch sử đặt bàn
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'column'} justifyContent={'center'}>
                                        <Button variant='contained'
                                            onClick={() => handleClickStore(item.CS_Id)}
                                            sx={{
                                                cursor: "pointer"
                                            }}>
                                            Đặt lại bàn như này
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
                            </React.Fragment>
                        ))}
                    </Stack>
                )}
            </List >
        </Stack>
    );
}
