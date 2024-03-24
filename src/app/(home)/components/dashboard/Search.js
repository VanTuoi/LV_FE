import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Autocomplete, TextField, InputAdornment, Box, Grid, Button } from '@mui/material';
import { IconUsers, IconClockHour4 } from '@tabler/icons-react';
import CustomSelect from '@/app/(home)/components/shared/Select'
import { Select, MenuItem, Stack, OutlinedInput, Divider, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Search from '@/app/(home)/components/dashboard/SearchInput';

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

const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }
    return `${hours}:${minutes}`;
};

const getCurrentTimeFormatted = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursFormatted}:${minutesFormatted}`;
};


const filterOptionsBasedOnCurrentTime = (options) => {
    const currentTimeFormatted = getCurrentTimeFormatted();
    return options.filter(option => {
        // Convert both current time and option to 24-hour format for easy comparison
        const optionIn24hr = convertTo24HourFormat(option);
        const currentTimeIn24hr = convertTo24HourFormat(currentTimeFormatted);
        return optionIn24hr > currentTimeIn24hr;
    });
};

const optionsTime = ['00:00 AM', '00:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
const optionPeople = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export default function ControllableStates() {

    const filteredOptions = filterOptionsBasedOnCurrentTime(optionsTime);
    const [time, setTime] = React.useState(filteredOptions[0]);
    const [people, setPeople] = React.useState(1)

    function handleClickSearch() {
        console.log('search');
    }

    return (
        <Grid container spacing={1}
            sx={{
                height: '216px',
                '@media (max-width: 900px)': {

                },
                '@media (min-width: 901px)': {
                    backgroundImage: 'linear-gradient(to right, rgba(47, 45, 65, 0.7), rgba(47, 45, 65, 0.7)), url("https://cdn.otstatic.com/cfe/14/images/us-1600px-ICYBBYTW.webp")',
                },
            }}
        >
            <Grid item xs={12} md={12} lg={12}>
                <Box
                    sx={{
                        padding: '2px',
                        // border: '1px solid red',
                        marginTop: '70px',
                        display: 'flex', // Thêm thuộc tính display: 'flex' để Box hoạt động tương tự như Stack
                        flexWrap: 'wrap', // Thêm thuộc tính flexWrap: 'wrap' để cho phép các phần tử xuống dòng khi không đủ không gian
                        alignItems: 'flex-end', // Căn giữa từ dưới theo chiều dọc
                        '@media (max-width: 900px)': {
                            display: 'none'
                        },
                        '@media (min-width: 901px)': {
                            justifyContent: 'center', // Căn giữa theo chiều ngang
                        },
                    }}
                >
                    <Typography variant="h1" component="h1"
                        sx={{
                            color: 'white'
                        }}
                    >
                        Tìm kiếm một cửa hàng
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12} md={5} lg={5}>
                <Box
                    sx={{
                        padding: '2px',
                        // border: '1px solid red',
                        display: 'flex', // Thêm thuộc tính display: 'flex' để Box hoạt động tương tự như Stack
                        flexWrap: 'wrap', // Thêm thuộc tính flexWrap: 'wrap' để cho phép các phần tử xuống dòng khi không đủ không gian
                        '@media (max-width: 900px)': {
                            justifyContent: 'center',
                        },
                        '@media (min-width: 901px)': {
                            justifyContent: 'flex-end',
                        },
                    }}
                >
                    <Select
                        sx={{
                            fontWeight: '600',
                            backgroundColor: '#fff',
                            '@media (max-width: 900px)': {
                                width: '49%',
                            },
                            '@media (min-width: 901px)': {
                                width: '150px',
                            },
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        // size='small'
                        onChange={(event) => {
                            setTime(event.target.value);
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 400, // Giới hạn độ cao tối đa của menu
                                },
                            },
                            getContentAnchorEl: null, // Điều này giúp không cố định menu tại input
                            anchorOrigin: {
                                vertical: "bottom", // Vị trí bắt đầu của menu so với input
                                horizontal: "left",
                            },
                            transformOrigin: {
                                vertical: "top", // Menu sẽ mở ra ở phía dưới input
                                horizontal: "left",
                            },
                        }}
                        input={
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconClockHour4 size={20} /> {/* Icon ở đây */}
                                    </InputAdornment>
                                }
                            />
                        }
                    >
                        {filteredOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: '2px' }} />
                    <Select
                        sx={{
                            fontWeight: '600',
                            backgroundColor: '#fff',
                            marginLeft: '2px',
                            '@media (max-width: 900px)': {
                                width: '49%',
                            },
                            '@media (min-width: 901px)': {
                                width: '90px',
                            },
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={people}
                        // size='small'
                        onChange={(event) => {
                            setPeople(event.target.value);
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 400, // Giới hạn độ cao tối đa của menu
                                },
                            },
                            getContentAnchorEl: null, // Điều này giúp không cố định menu tại input
                            anchorOrigin: {
                                vertical: "bottom", // Vị trí bắt đầu của menu so với input
                                horizontal: "left",
                            },
                            transformOrigin: {
                                vertical: "top", // Menu sẽ mở ra ở phía dưới input
                                horizontal: "left",
                            },
                        }}
                        input={
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconUsers size={20} /> {/* Icon ở đây */}
                                    </InputAdornment>
                                }
                            />
                        }
                    >
                        {optionPeople.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box>

                </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        padding: '2px',
                        // border: '1px solid red',
                        // width: '250px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        '@media (max-width: 900px)': {
                            justifyContent: 'center',
                        },
                        '@media (min-width: 901)': {
                            justifyContent: 'flex-start',
                        },
                    }}
                >
                    <Search></Search>
                </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <Box
                    sx={{
                        padding: '6px',
                        // border: '1px solid red',
                        // width: '250px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        '@media (max-width: 900px)': {
                            justifyContent: 'center',
                        },
                        '@media (min-width: 901px)': {
                            justifyContent: 'flex-start',
                        },
                    }}
                >
                    <Button
                        onClick={() => handleClickSearch()}
                        sx={{
                            fontWeight: '600',
                            fontSize: '16px',
                            height: '45px',
                            '@media (max-width: 900px)': {
                                width: '100%',
                            },
                            '@media (min-width: 901px)': {
                                width: '120px',
                            },
                        }} variant='contained'

                    >Tìm kiếm</Button>
                </Box>
            </Grid>
        </Grid >
    );
}
