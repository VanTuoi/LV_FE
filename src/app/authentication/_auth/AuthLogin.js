import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

const AuthLogin = ({ title, subtitle, subtext }) => {

    const { checkPhone, checkPassWord, loginUser, loginManager, errorLogin, errPhone, errorPassWord } = useAuth();

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
            <Stack>
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
                <Box mt="25px">
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
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Tôi là</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={isUser}
                            onChange={(e) => handleChangeUser(e)}
                        >
                            <FormControlLabel value='user' control={<Radio size="small" />} label="Khách hàng" />
                            <FormControlLabel value='manager' control={<Radio size="small" />} label="Người quản lý" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Stack>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
                        textDecoration: "none",
                        color: "primary.main",
                    }}
                >
                    Quên mật khẩu ?
                </Typography>
            </Box>
            {subtitle}
        </>
    );
}

export default AuthLogin;
