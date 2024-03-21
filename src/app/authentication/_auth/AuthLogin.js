import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/authentication/components/forms/CustomTextField";
import CustomTextFieldPassword from "@/app/authentication/components/forms/CustomTextFieldPassword";
import CustomTypography from "@/app/authentication/components/forms/CustomTypography";
import useAuth from "@/hook/auth/useLogin"
import { styled } from '@mui/material/styles';

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


const AuthLogin = ({ title, subtitle, subtext }) => {

    const { checkPhone, checkPassWord, loginUser, loginManager, handleClickLoginWithGoogle, errorLogin, errPhone, errorPassWord } = useAuth();

    const [isUser, setIsUser] = useState('user');           // Kiểm tra tài khoản đky là admin hay user

    const handleClickLogin = () => {
        isUser === 'user' ? loginUser() : loginManager()
    }

    const handleChangeUser = (event) => {
        setIsUser(event.target.value);
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h3" mb={1} color={'red'}>
                    {title}
                </Typography>
            )}
            {subtext}
            <Stack direction={'column'} spacing={1}>
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="username"
                        mb="5px"
                    >
                        Số điện thoại đăng nhập
                    </Typography>
                    <CustomTextField onChange={(event) => checkPhone(event.target.value)} variant="outlined" type="number" fullWidth />
                    {errPhone ? (<CustomTypography>{errPhone}</CustomTypography>) : ''}
                </Box>
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="password"
                        mb="5px"
                    >
                        Mật khẩu
                    </Typography>
                    <CustomTextField onChange={(event) => checkPassWord(event.target.value)} type="password" variant="outlined" fullWidth />
                    {errorPassWord ? (<CustomTypography>{errorPassWord}</CustomTypography>) : ''}
                </Box>
                <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    my={2}
                >
                    <FormControl sx={{ marginTop: '-8px' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Tôi là</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={isUser}
                            onChange={(e) => handleChangeUser(e)}
                        >
                            <FormControlLabel sx={{ color: isUser === 'user' && '#5D87FF' }} value='user' control={<BpRadio />} label="Khách hàng" />
                            <FormControlLabel sx={{ color: isUser !== 'user' && '#5D87FF' }} value='manager' control={<BpRadio />} label="Người quản lý" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Stack>
            <Stack direction={'column'} spacing={1} alignItems={'center'}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => handleClickLogin()}
                    type="submit"
                >
                    Đăng nhập
                </Button>
                <Typography
                    component={Link}
                    href="/"
                    fontWeight="500"
                    sx={{
                        // marginTop: '5px',
                        textDecoration: "none",
                        color: "primary.main",
                    }}
                >
                    Quên mật khẩu ?
                </Typography>
                <Divider variant="middle"
                    style={{ width: '100%' }}
                    sx={{ marginTop: '15px' }}
                >Hoặc</Divider>
                <Button
                    sx={{ marginTop: '20px' }}
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={() => handleClickLoginWithGoogle()}
                    type="submit"
                    startIcon={<GoogleIcon />}
                >
                    Đăng nhập với Google
                </Button>
            </Stack>
            {subtitle}
        </>
    );
}

export default AuthLogin;
