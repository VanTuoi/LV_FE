import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    Button,
    Typography,
    Stack,
    Divider,
    Box
} from '@mui/material';

import useBooking from '@/hook/user/useBooking';
import { useAppSelector } from '@/lib/hooks';

const timeSlots = {
    'Buổi Sáng': [
        { time: '07:00' },
        { time: '07:30' },
        { time: '08:00' },
        { time: '08:30' },
        { time: '09:00' },
        { time: '09:30' },
        { time: '10:00' },
        { time: '10:30' },
        { time: '11:00' },
        { time: '11:30' }
    ],
    'Buổi Trưa': [
        { time: '12:00' },
        { time: '12:30' }
    ],
    'Buổi Chiều': [
        { time: '13:00' },
        { time: '13:30' },
        { time: '14:00' },
        { time: '14:30' },
        { time: '15:00' },
        { time: '15:30' },
        { time: '16:00' },
        { time: '16:30' },
        { time: '17:00' },
        { time: '17:30' }
    ],
    'Buổi Tối': [
        { time: '18:00' },
        { time: '18:30' },
        { time: '19:00' },
        { time: '19:30' },
        { time: '20:00' },
        { time: '20:30' },
        { time: '21:00' },
        { time: '21:30' },
        { time: '22:00' },
        { time: '22:30' }
    ],
    'Buổi Khuya': [
        { time: '23:00' },
        { time: '23:30' },
        { time: '24:00' }
    ]
};


export default function Time() {

    const { getTime } = useBooking()
    const [date, setDate] = useState('')
    const [selectTime, setSelectTime] = useState('')

    const currentTimeToRedux = useAppSelector((state) => state.reducer.booking.time)
    const currentDayToRedux = useAppSelector((state) => state.reducer.booking.date)

    useEffect(() => {           // lay gia tri vao reudux
        setSelectTime(currentTimeToRedux)
    }, [currentTimeToRedux]);

    useEffect(() => {           // lay gia tri vao reudux
        setDate(currentDayToRedux)
    }, [currentDayToRedux]);

    const SelectTime = (value) => {
        setSelectTime(value)
        getTime(value)
    }

    const isShowTime = (timeString) => {
        const currentTime = dayjs();
        const [hours, minutes] = timeString.split(':').map(Number);
        const newTime = currentTime.set('hour', hours).set('minute', minutes);

        // Kiểm tra nếu date lớn hơn currentTime một ngày
        if (dayjs(date).isAfter(currentTime.add(1, 'day'), 'day')) {
            return true;
        }

        // Kiểm tra nếu date bằng currentTime
        if (dayjs(date).isSame(currentTime, 'day')) {
            // So sánh theo giờ và phút
            if (newTime.isBefore(currentTime)) {
                return false;
            }
        }

        return true;
    };


    return (
        <>
            <Stack direction="column" spacing={0}>
                {Object.keys(timeSlots).map((label) => (
                    <Box key={label}>
                        <Typography variant="body1" sx={{ my: 1 }}>
                            {label}
                        </Typography>
                        <Stack direction="row" spacing={0} flexWrap="wrap" justifyContent="flex-start">
                            {timeSlots[label].map((item, index) => (
                                <React.Fragment key={`button-${item.time}`}>
                                    {isShowTime(item.time) && (
                                        <Button
                                            style={{ maxWidth: '50px', maxHeight: '30px', minWidth: '50px', minHeight: '30px' }}
                                            sx={{
                                                margin: '2px',
                                                border: selectTime === item.time ? '2px solid' : '',
                                                color: theme => (selectTime === item.time ? theme.palette.primary.main : 'gray'),
                                                borderColor: theme => (selectTime === item.time ? theme.palette.primary.main : 'gray'),
                                                '&:hover': {
                                                    color: theme => theme.palette.primary.main,
                                                    borderColor: theme => theme.palette.primary.main,
                                                    border: selectTime === item.time ? '2px solid' : '',
                                                },
                                            }}
                                            size='small'
                                            variant="outlined"
                                            onClick={() => SelectTime(item.time)}
                                        >
                                            {item.time}
                                        </Button>
                                    )}
                                </React.Fragment>
                            ))}
                        </Stack>

                    </Box>
                ))}
            </Stack>
        </>
    );
}
