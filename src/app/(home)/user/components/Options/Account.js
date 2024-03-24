import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale for Vietnamese
dayjs.locale('vi');
// Format locate VN
import { toast } from 'react-toastify';
import { Stack, Box, Typography, FormControlLabel, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
// In the Project
import CustomTextField from '@/app/(home)/layout/shared/CustomTextField';
import CustomTypography from '@/app/(home)/layout/shared/CustomTypography';
import useManagerProfile from '@/hook/user/useManagerProfile';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#00CCFF' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#5D87FF',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#5D87FF',
    },
});
// Inspired by blueprintjs
function BpRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

export default function Account() {

    const { errorChangeInfo, name, email, phone, birthday, gender, errName, errEmail, errPhone, errBirthday,
        checkName, checkEmail, checkPhone, checkBirthday, checkGenger, changeInfo, getInfo,
        specialRequirements, setSpecialRequirements
    } = useManagerProfile()

    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        if (errorChangeInfo !== null) {
            if (errorChangeInfo === 'success') {
                toast.success('Cập nhật thành công')
            } else {
                toast.error(errorChangeInfo)
            }
        }
    }, [errorChangeInfo])



    return (
        <form>
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
                        value={name}
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
                        value={email}
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
                            value={phone}
                            onChange={(event) => checkPhone(event.target.value)}
                            variant="outlined"
                            type="number"
                            helperText="Bạn sẽ mất quyền truy cập vào tài khoản nếu không phải là chủ sở hữu của số điện thoại mới."
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
                        <DatePicker onChange={(value) => checkBirthday(value)} value={birthday} format="DD/MM/YYYY" sx={{ backgroundColor: '#fff' }} />
                    </LocalizationProvider>
                    {errBirthday ? (
                        <>
                            <CustomTypography>{errBirthday}</CustomTypography>
                            <Stack direction={'column'} spacing={1} sx={{ width: '100%' }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Tên người giám hộ của tôi là
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    type="text"
                                    sx={{ width: '100%' }} // Thêm dòng này
                                />
                            </Stack>
                        </>
                    ) : ''}
                </Stack>
                <Stack direction={'column'} spacing={1} sx={{ width: '100%' }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="username"
                        mb="5px"
                    >
                        Giới tính
                    </Typography>
                    <FormControl component="fieldset"> {/* Đặt FormControl ở đây */}
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={(event) => checkGenger(event.target.value)}
                            value={gender}
                        >
                            <FormControlLabel sx={{ color: gender === 'M' && '#5D87FF' }} value='M' control={<BpRadio />} label="Nam" />
                            <FormControlLabel sx={{ color: gender === 'F' && '#5D87FF' }} value='F' control={<BpRadio />} label="Nữ" />
                            <FormControlLabel sx={{ color: gender === 'O' && '#5D87FF' }} value='O' control={<BpRadio />} label="Khác" />
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="username"
                        mb="5px"
                    >
                        Yêu cầu đặc biệt
                    </Typography>
                    <CustomTextField
                        value={specialRequirements}
                        onChange={(event) => setSpecialRequirements(event.target.value)}
                        placeholder="Thêm một yêu cầu đặc biệt"
                        helperText="Yêu cầu bạn thêm ở đây sẽ được thêm vào mỗi lần đặt chỗ. Các cửa hàng sẽ cố gắng hết sức để đáp ứng mọi yêu cầu đặc biệt mà bạn có"
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
                    <Button onClick={changeInfo} variant='contained' fullWidth>Lưu lại</Button>
                </Box>
            </Stack >
        </form>
    );
}
