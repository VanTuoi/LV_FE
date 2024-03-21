import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale for Vietnamese
dayjs.locale('vi');         // Format locate VN

import { Stack, Box, Typography, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// In the Project
import CustomTextField from '@/app/(home)/layout/shared/CustomTextField';
import CustomTypography from '@/app/(home)/layout/shared/CustomTypography';
import useManagerProfile from '@/hook/user/useManagerProfile';

export default function Account() {

    const { errName, errEmail, errPhone, errBirthday, checkName, checkEmail, checkPhone, changeInfo } = useManagerProfile()

    return (
        <Stack direction={'column'} spacing={2}>
            <Typography variant='h5'>Thông tin cá nhân</Typography>
            <Stack direction={'column'} spacing={1}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                >
                    Họ và tên
                </Typography>
                <CustomTextField
                    onChange={(event) => checkName(event.target.value)}
                    variant="outlined"
                    type="text"
                    sx={{ width: '100%' }} // Thêm dòng này
                />
                {errName ? (<CustomTypography>{errName}</CustomTypography>) : ''}
            </Stack>
            <Stack direction={'column'} spacing={1}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                >
                    Địa chỉ Email
                </Typography>
                <CustomTextField
                    onChange={(event) => checkEmail(event.target.value)}
                    variant="outlined"
                    type="email"
                    sx={{ width: '100%' }} // Thêm dòng này
                />
                {errEmail ? (<CustomTypography>{errEmail}</CustomTypography>) : ''}
            </Stack>
            <Stack direction={'column'} spacing={1}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                >
                    Số điện thoại
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <CustomTextField
                        onChange={(event) => checkPhone(event.target.value)} setBirthday
                        variant="outlined"
                        type="number"
                        helperText="Bạn sẽ mất quyền truy cập vào tài khoản nếu không phải là chủ sở hửu của số điện thoại mới."
                        sx={{ width: '60%' }} // Thêm dòng này
                    />
                </Stack>
                {errPhone ? (<CustomTypography>{errPhone}</CustomTypography>) : ''}
            </Stack>
            <Stack direction={'column'} spacing={1} sx={{ width: '40%' }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                >
                    Ngày sinh
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale={dayjs}>
                    <DatePicker format="DD/MM/YYYY" sx={{ backgroundColor: '#fff' }} />
                </LocalizationProvider>
                {errBirthday ? (<CustomTypography>{errBirthday}</CustomTypography>) : ''}
            </Stack>
            <Stack direction={'column'} spacing={1}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                >
                    Yêu cầu riêng
                </Typography>
                <CustomTextField
                    // onChange={}
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ width: '100%' }} // Thêm dòng này
                />
                {true ? (<CustomTypography></CustomTypography>) : ''}
            </Stack>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'}>
                <Button variant='text'>Thay đổi mật khẩu ?</Button>
            </Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                <Button onClick={changeInfo} variant='contained'>Lưu lại</Button>
            </Box>
        </Stack>
    );
}
