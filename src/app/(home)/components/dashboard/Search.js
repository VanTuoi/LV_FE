
// Third-party
// icon
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {
    IconUsers,
    IconClockHour4
} from "@tabler/icons-react";

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
// Redux

import { useAppSelector } from '@/lib/hooks';
// In the Project
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';
import CustomSelect from '@/app/(home)/components/shared/Select'
import useSearch from '@/hook/user/useSearch'



//--------------------------------------------custom------------------------------------------------//
const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
    width: '500px',
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[200],
    },

    // Thêm CSS cho InputProps của TextField
    '& .MuiInputBase-root': {
        '& .MuiOutlinedInput-input': {
            borderRadius: '10px',
            fontSize: '1.0rem',
            fontWeight: 400,
        },
        '& .MuiInputAdornment-root': {
            '& .MuiIconButton-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: '1.5rem', // Cỡ chữ của biểu tượng
                },
            },
        },
    },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    fontSize: '1.00rem',
    fontWeight: 400,
    borderRadius: '5px',
    padding: '13px 5px 13px 5px',
    marginRight: '-10px',
    width: 'auto',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));


//---------------------------------------------------------------------------------------------------//
const Search = () => {

    // giá trị time
    const valueTime = ['00:00 AM', '00:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '13:00 PM', '13:30 PM', '14:00 PM', '14:30 PM', '15:00 PM', '15:30 PM', '16:00 PM', '16:30 PM', '17:00 PM', '17:30 PM', '18:00 PM', '18:30 PM', '19:00 PM', '19:30 PM', '20:00 PM', '20:30 PM', '21:00 PM', '21:30 PM', '22:00 PM', '22:30 PM', '23:00 PM', '23:30 PM']
    const valuePeoPle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const { getTime, getPeople, getSearchContent, search, searchContent } = useSearch();

    const locate = useAppSelector((state) => state.reducer.search.locate)
    const [currentLocate, setCurrentLocate] = useState(locate)

    useEffect(() => {
        getSearchContent(searchContent);
    }, [searchContent, getSearchContent]);

    useEffect(() => {
        setCurrentLocate(locate)
    }, [locate]);

    return (

        <DashboardCard title="">
            <Stack
                direction='column'
                alignItems='center'
                spacing={2}
            >
                {/* <Typography variant="h3" component="h2">
                    {currentLocate}
                </Typography>
                <Typography variant="h1" component="h2">
                    Đặt bàn miễn phí
                </Typography> */}
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                >
                    <CustomSelect
                        click={getTime}
                        listValue={valueTime}
                    >
                        <IconClockHour4 />
                    </CustomSelect>
                    <CustomSelect
                        click={getPeople}
                        listValue={valuePeoPle}
                    >
                        <IconUsers />
                    </CustomSelect>
                    <CustomTextField
                        onChange={(event) => getSearchContent(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <CustomIconButton onClick={search}>
                                    <SearchIcon
                                    /> Tìm kiếm
                                </CustomIconButton>
                            ),
                        }}
                        id="outlined-required"
                        placeholder="Đồ uống, địa điểm, tên cửa hàng,..."
                    />

                </Stack>
            </Stack>
            {/* <Button onClick={() => getTime()}>
                abc
            </Button> */}
        </DashboardCard >
    );
};

export default Search;
