
// Third-party
import React, { useState, useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';

// In the Project
import useBooking from '@/hook/user/useBooking';
import useStore from '@/hook/store/useStore';
import { useAppSelector } from '@/lib/hooks';

export default function People() {

    const { getPeople } = useBooking()

    // const maxPeopleAllowToRedux = useAppSelector((state) => state.reducer.store.maxPeople)

    // useEffect(() => {
    //     setMaxPeopleShow(maxPeopleAllowToRedux)
    // }, [maxPeopleAllowToRedux]);

    const { maxPeopleAllow, getMaxPeopleAllow } = useStore()

    const currentPeoPle = useAppSelector((state) => state.reducer.booking.people)

    const checkHaveLogin = useAppSelector((state) => state.reducer.user.info.U_Id)

    const [isMore, setIsMore] = useState(false)

    const [selectPeople, setSelectPeople] = useState(1)

    const [maxPeopleShow, setMaxPeopleShow] = useState(5)


    useEffect(() => {
        setSelectPeople(currentPeoPle)
        // if (currentPeoPle >= 10) setIsMore(true)
    }, [currentPeoPle]);

    useEffect(() => {
        getMaxPeopleAllow()                 // Lấy dữ liệu số người tối đa từ db
    }, []);

    useEffect(() => {
        if (checkHaveLogin === null || checkHaveLogin === '') {
            setMaxPeopleShow(5 <= maxPeopleAllow ? 5 : maxPeopleAllow)      // 5 là giới hạn tối đa nếu người dùng k đăng nhập
            // setIsMore(false)
        } else {
            if (maxPeopleAllow <= 10) {
                setMaxPeopleShow(maxPeopleAllow)
            } else {
                setMaxPeopleShow(10)
                setIsMore(true)
            }
        }
    }, [maxPeopleAllow]);                   // Nếu số người tối đa thay đổi

    const SelectPeople = (value) => {
        setSelectPeople(value)
        getPeople(value)
    }

    const handleSetIsMore = () => {
        setIsMore(!isMore)
    }

    return (
        <>
            <Stack direction="column" spacing={1} alignItems={'flex-start'}>
                <Typography variant="h7" align="justify" paragraph={true}>
                    {/* Nội dung Typography */}
                </Typography>
                <Stack direction="row" spacing={0} flexWrap="wrap" justifyContent="flex-start" >
                    {[...Array(maxPeopleShow)].map((_, index) => (
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
                    {checkHaveLogin !== null && isMore === false && [...Array(maxPeopleAllow < maxPeopleShow ? 0 : maxPeopleAllow - maxPeopleShow)].map((_, index) => (
                        <Button
                            // startIcon={<IconUsers />}
                            style={{ maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' }}
                            key={`button-isMore-${index + maxPeopleShow + 1}`}
                            sx={{
                                border: (selectPeople === index + maxPeopleShow + 1 ? '2px solid' : ''),
                                margin: '2px',
                                color: (theme) => (selectPeople === index + maxPeopleShow + 1 ? theme.palette.primary.main : 'gray'),
                                borderColor: (theme) => (selectPeople === index + maxPeopleShow + 1 ? theme.palette.primary.main : 'gray'),
                                '&:hover': {
                                    color: (theme) => theme.palette.primary.main,
                                    borderColor: (theme) => theme.palette.primary.main,
                                    border: (selectPeople === maxPeopleShow + index + 1 ? '2px solid' : ''),
                                },
                            }}
                            size='small'
                            variant="outlined"
                            onClick={() => SelectPeople(index + maxPeopleShow + 1)}
                        >
                            {index + maxPeopleShow + 1}
                        </Button>
                    ))}
                    {checkHaveLogin !== null && maxPeopleAllow >= 10 ? (<Button
                        variant="text"
                        onClick={() => handleSetIsMore()}
                    >
                        {isMore === true ? 'Thêm lựa chọn' : 'Ẩn bớt'}
                    </Button>) : null}
                </Stack>
            </Stack>
        </>

    );
}
