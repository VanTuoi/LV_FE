
// Third-party
import React, { useState, useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { IconUsers } from "@tabler/icons-react";

// In the Project
import useBooking from '@/hook/user/useBooking';
import { useAppSelector } from '@/lib/hooks';

export default function Time() {

    const { getPeople } = useBooking()
    const currentPeoPle = useAppSelector((state) => state.reducer.booking.people)
    const [isMore, setIsMore] = useState(false)
    const [selectPeople, setSelectPeople] = useState(1)

    useEffect(() => {
        setSelectPeople(currentPeoPle)
        if (currentPeoPle >= 13) setIsMore(true)
    }, [currentPeoPle]);

    const SelectPeople = (value) => {
        setSelectPeople(value)
        getPeople(value)
    }

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
                    {isMore && [...Array(18)].map((_, index) => (
                        <Button
                            // startIcon={<IconUsers />}
                            style={{ maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' }}
                            key={`button-isMore-${index + 13}`}
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
                        onClick={() => setIsMore(!isMore)}
                    >
                        {isMore ? 'Ẩn bớt' : 'Thêm lựa chọn'}
                    </Button>}
                </Stack>
            </Stack>
        </>

    );
}
