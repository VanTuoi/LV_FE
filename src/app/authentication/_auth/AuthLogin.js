import React from "react";
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

  const { checkPhone, checkPassWord, login, errorLogin, errorUserName, errPhone, errorPassWord } = useAuth();
  title = errorLogin
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1} color={'red'}>
          {title}
        </Typography>
      ) : null}

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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Tôi là chủ cửa hàng"
            />
          </FormGroup>
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
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => login()}
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
      {subtitle}
    </>
  );
}

export default AuthLogin;
