import React, { useState, useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';

import useBook from '@/hook/user/useBook';
import { useAppSelector } from '@/lib/hooks';

const valueTime = [
    {
        time: '07:00',
    },
    {
        time: '07:30',
    },
    {
        time: '08:00',
    },
    {
        time: '08:30',
    },
    {
        time: '09:00',
    },
    {
        time: '09:30',
    },
    {
        time: '11:30',
    },
    {
        time: '13:30',
    },
    {
        time: '14:00',
    },
    {
        time: '14:30',
    },
    {
        time: '15:00',
    },
    {
        time: '15:30',
    },
    {
        time: '16:00',
    },
    {
        time: '16:30',
    },
]

export default function Time() {

    const [selectTime, setSelectTime] = useState('')

    const SelectTime = (value) => {
        setSelectTime(value)
        getTime(value)
        console.log('value', value);
    }

    const { getTime } = useBook()
    const currentTime = useAppSelector((state) => state.reducer.book.time)

    useEffect(() => {           // lay gia tri vao reudux
        setSelectTime(currentTime)
    }, [currentTime]);


    return (
        <>
            <Stack direction="column" spacing={1} alignItems={'flex-start'}>
                <Typography variant="h7" align="justify" paragraph={true}>

                </Typography>
                <Stack direction="row" spacing={0} flexWrap="wrap" justifyContent="flex-start">
                    {valueTime.map((item, index) => {
                        return (
                            <>
                                <Button
                                    style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                                    key={`button-${item.time}`}
                                    sx={{
                                        margin: '2px',
                                        border: (selectTime === item.time ? '2px solid' : ''),
                                        color: (theme) => (selectTime === item.time ? theme.palette.primary.main : 'gray'),
                                        borderColor: (theme) => (selectTime === item.time ? theme.palette.primary.main : 'gray'),
                                        '&:hover': {
                                            color: (theme) => theme.palette.primary.main,
                                            borderColor: (theme) => theme.palette.primary.main,
                                            border: (selectTime === item.time ? '2px solid' : ''),
                                        },
                                    }}
                                    size='small'
                                    variant="outlined"
                                    onClick={() => SelectTime(item.time)}
                                >
                                    {item.time}
                                </Button >

                            </>
                        )
                    })}
                </Stack>
            </Stack >
        </>
    );
}
