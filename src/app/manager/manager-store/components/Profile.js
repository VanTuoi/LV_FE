
//Third-party
import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Box, Typography, Stack, TextField, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// In the project



const Input = styled(MuiInput)`
  width: 42px;
`;

const Proflie = (props) => {

    const { id, name, location, maxPeopleToDB, timeOpenToDB, timeCloseToDB,
        setLocationToDB, setNameToDB, setMaxPeopleToDB, setTimeOpenToDB, setTimeCloseToDB
    } = props

    const handleSliderChange = (event, newValue) => {
        setMaxPeopleToDB(newValue < 1 ? 1 : newValue)
    };

    const handleInputChange = (event) => {
        setMaxPeopleToDB(event.target.value === '' ? 0 : Number(event.target.value))
    };

    const handleBlur = () => {
        if (value < 1) {
            setMaxPeopleToDB(1)
        } else if (value > 100) {
            setMaxPeopleToDB(100)
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/store?id=${id ? id : ''}`)
            .then(() => {
                alert("Đã copy vào bộ nhớ tạm!");
            })
            .catch(err => {
                console.error('Có lỗi xảy ra khi copy: ', err);
            });
    }

    const handleChangeTimeOpen = (value) => {
        setTimeOpenToDB(value);
    };
    const handleChangeTimeClose = (value) => {
        setTimeCloseToDB(value);
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>   {/**Name */}
                <Stack direction={'column'}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                    >
                        Tên cửa hàng
                    </Typography>
                    <TextField
                        value={name}
                        variant="standard"
                        // size="small"
                        helperText="Hạn chế việc đổi tên nếu không cần thiết"
                        onChange={(event) => setNameToDB(event.target.value)}
                    // fullWidth
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={4}>   {/**Link */}
                <Stack direction={'column'} >
                    {/* <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                        >
                            Liên kết đến trang cửa hàng của bạn là
                        </Typography> */}
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Link href="#" underline="hover">
                            {`http://localhost:3000/store?id=${id ? id : ''}`}
                        </Link>
                        <IconButton onClick={() => handleCopyUrl()} aria-label="delete">
                            <ContentCopyIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Stack>
                </Stack>

            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={4}>   {/**Location */}
                <Stack direction={'column'}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                    >
                        Vị trí cửa hàng
                    </Typography>
                    <TextField
                        value={location}
                        // size="small" 
                        variant="standard"
                        onChange={(event) => setLocationToDB(event.target.value)}
                    // fullWidth 
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={8}>   {/**Number People */}
                <Box sx={{ width: '60%' }}>
                    <Typography id="input-slider" variant="subtitle1" fontWeight={600} gutterBottom>
                        Số lượng khách hàng tối đa quán có thể nhận đặt bàn
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <PersonAddAltIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={typeof maxPeopleToDB === 'number' ? maxPeopleToDB : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={maxPeopleToDB}
                                // size="small"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                            người
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={8}>   {/**Time Open-Close */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            'MobileTimePicker',
                        ]}
                    >
                        <DemoItem label="Thời gian bắt đầu nhận đặt bàn">
                            <MobileTimePicker onChange={(e) => handleChangeTimeOpen(e)} value={dayjs(timeOpenToDB)} />
                        </DemoItem>
                        <DemoItem label="Thời gian ngừng nhận đặt bàn">
                            <MobileTimePicker onChange={(e) => handleChangeTimeClose(e)} value={dayjs(timeCloseToDB)} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}

export default Proflie;

