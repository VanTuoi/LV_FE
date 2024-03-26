
// Third-party
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
} from "@mui/material";
import { toast } from 'react-toastify';

// In the Project
import CustomTextField from "@/app/authentication/components/forms/CustomTextField";
import CustomTypography from "@/app/authentication/components/forms/CustomTypography";
import useChangePassword from "@/hook/auth/useChangePassword"

const AuthChangePassword = ({ title, subtitle, subtext }) => {

    const searchParams = useSearchParams()

    const [isChecked, setIsChecked] = useState(false);      // Kiểm tra check show pwd

    const { errorChangePassword, errorPassWord, errorRePassWord, errOldPassowrd,
        checkPassword, checkRePassword, changePasswordHaveLogin, checkCurrentPassword,
        setErrorChangePassWord
    } = useChangePassword();

    useEffect(() => {
        if (errorChangePassword !== null) {
            if (errorChangePassword === 'success') {
                toast.success('Đổi mật khẩu thành công')
            } else {
                toast.error(errorChangePassword)
            }
            setErrorChangePassWord(null)
        }
    }, [errorChangePassword])

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h3" mb={1} color={'red'}>
                    {title}
                </Typography>
            )}
            {subtext}
            <form>
                <Stack direction={'column'} spacing={1}>
                    <CustomTextField
                        label={'username'}
                        sx={{ display: 'none' }}
                        inputProps={{ autoComplete: 'username', id: 'username' }}
                    />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="new-password"
                            mb="5px"
                        >
                            Nhập mật khẩu hiện tại của bạn
                        </Typography>
                        <CustomTextField
                            inputProps={{ autoComplete: 'new-password', id: 'new-password' }}
                            onChange={(event) => checkCurrentPassword(event.target.value)}
                            variant="outlined"
                            type={isChecked ? 'text' : 'password'}
                            fullWidth
                        />
                        {errOldPassowrd ? (<CustomTypography>{errOldPassowrd}</CustomTypography>) : ''}
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="new-password"
                            mb="5px"
                        >
                            Nhập mật khẩu mới
                        </Typography>
                        <CustomTextField
                            inputProps={{ autoComplete: 'new-password', id: 'new-password' }}
                            onChange={(event) => checkPassword(event.target.value)}
                            variant="outlined"
                            type={isChecked ? 'text' : 'password'}
                            fullWidth
                        />
                        {errorPassWord ? (<CustomTypography>{errorPassWord}</CustomTypography>) : ''}
                    </Box>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="confirm-password"
                            mb="5px"
                        >
                            Nhập lại mật khẩu
                        </Typography>
                        <CustomTextField
                            inputProps={{ autoComplete: 'new-password', id: 'confirm-password' }}
                            onChange={(event) => checkRePassword(event.target.value)}
                            variant="outlined"
                            type={isChecked ? 'text' : 'password'}
                            fullWidth
                        />
                        {errorRePassWord ? (<CustomTypography>{errorRePassWord}</CustomTypography>) : ''}
                    </Box>
                </Stack>
            </form>

            <Stack spacing={1} direction="row" alignItems="center">
                <FormGroup
                >
                    <FormControlLabel
                        sx={{ marginRight: '-5px' }}
                        control={<Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />}
                        label="Hiện mât khẩu"
                    />
                </FormGroup>
            </Stack>
            <Stack sx={{ marginTop: '20px' }} direction={'column'} spacing={1} alignItems={'center'}>
                <Button
                    sx={{ textTransform: 'none' }}
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => changePasswordHaveLogin()}
                    type="submit"
                >
                    Thay đổi mật khẩu
                </Button>
            </Stack>
            {subtitle}
        </>
    );
}

export default AuthChangePassword;
