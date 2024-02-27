import React, { useState, useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';

import { IconUsers } from "@tabler/icons-react";
import useBook from '@/hook/user/useBook';
import { useAppSelector } from '@/lib/hooks';

const valueTime = [
    {
        people: '07:00',
    },
    {
        people: '07:30',
    },
    {
        people: '08:00',
    },
    {
        people: '08:30',
    },
    {
        people: '09:00',
    },
    {
        people: '09:30',
    },
    {
        people: '11:30',
    },
    {
        people: '13:30',
    },
    {
        people: '14:00',
    },
    {
        people: '14:30',
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

    const [selectPeople, setSelectPeople] = useState('')
    const [more, setMore] = useState(false)

    const SelectPeople = (value) => {
        setSelectPeople(value)
        getPeople(value)
        console.log('value', value);
    }

    const { getPeople } = useBook()
    const currentPeoPle = useAppSelector((state) => state.reducer.book.people)

    useEffect(() => {           // lay gia tri vao reudux
        setSelectPeople(currentPeoPle)
        if (currentPeoPle >= 13) setMore(true)
    }, [currentPeoPle]);


    return (
        <>
            <Stack direction="column" spacing={1} alignItems={'flex-start'}>
                <Typography variant="h7" align="justify" paragraph={true}>
                    {/* Nội dung Typography */}
                </Typography>
                <Stack direction="row" spacing={0} flexWrap="wrap" justifyContent="flex-start">
                    {[...Array(12)].map((_, index) => (
                        <Button
                            style={{ maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' }}
                            key={`button-${index}`}
                            sx={{
                                margin: '2px',
                                border: (selectPeople === index + 1 ? '2px solid' : ''),
                                color: (theme) => (selectPeople === index + 1 ? theme.palette.primary.main : 'gray'),
                                borderColor: (theme) => (selectPeople === index + 1 ? theme.palette.primary.main : 'gray'),
                                '&:hover': {
                                    color: (theme) => theme.palette.primary.main,
                                    borderColor: (theme) => theme.palette.primary.main,
                                    border: (selectPeople === index + 1 ? '2px solid' : ''),
                                },
                            }}
                            size='small'
                            variant="outlined"
                            onClick={() => SelectPeople(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    {more && [...Array(18)].map((_, index) => (
                        <Button
                            // startIcon={<IconUsers />}
                            style={{ maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' }}
                            key={`button-more-${index + 13}`}
                            sx={{
                                border: (selectPeople === index + 13 ? '2px solid' : ''),
                                margin: '2px',
                                color: (theme) => (selectPeople === index + 13 ? theme.palette.primary.main : 'gray'),
                                borderColor: (theme) => (selectPeople === index + 13 ? theme.palette.primary.main : 'gray'),
                                '&:hover': {
                                    color: (theme) => theme.palette.primary.main,
                                    borderColor: (theme) => theme.palette.primary.main,
                                },
                            }}
                            size='small'
                            variant="outlined"
                            onClick={() => SelectPeople(index + 13)}
                        >
                            {index + 13}
                        </Button>
                    ))}
                    {<Button
                        variant="text"
                        onClick={() => setMore(!more)}
                    >
                        {more ? 'Ẩn bớt' : 'Thêm lựa chọn'}
                    </Button>}
                </Stack>
            </Stack>
        </>

    );
}
