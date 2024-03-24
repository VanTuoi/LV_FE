
// Third-party
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
    Box,
    Typography,
    FormControlLabel,
    Button,
    Stack,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// In The project
import CustomTextField from "@/app/authentication/components/forms/CustomTextField";
import CustomTypography from "@/app/authentication/components/forms/CustomTypography";
import useForgotPassword from "@/hook/auth/useForgotPassword"
import { styled } from '@mui/material/styles';


// Custom seclect button
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


const AuthForgotPassword = ({ title, subtitle, subtext }) => {

    const { status, errEmail, setStatus, checkEmail, forgotPassword } = useForgotPassword();

    const [isUser, setIsUser] = useState('user');           // Kiểm tra tài khoản đky là manager hay user

    const handleClose = () => {
        setStatus(false);
    };

    const handleClickForgot = () => {
        isUser === 'user' ? forgotPassword() : null
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
                        Nhập email đăng nhập
                    </Typography>
                    <CustomTextField onChange={(event) => checkEmail(event.target.value)} variant="outlined" type="text" fullWidth />
                    {errEmail ? (<CustomTypography>{errEmail}</CustomTypography>) : ''}
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
                    sx={{ textTransform: 'none' }}
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => handleClickForgot()}
                    type="submit"
                >
                    Lấy lại mật khẩu
                </Button>
            </Stack>
            {subtitle}
            <Dialog
                open={status}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Đặt lại mật khẩu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Yêu cầu đặt lại mật khẩu của bạn đã được xử lý, vui lòng kiểm tra hộp thư để tiến hành thay đổi mật khẩu
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AuthForgotPassword;
