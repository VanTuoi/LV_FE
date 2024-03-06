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

import CustomTextField from "@/app/(home)/components/forms/theme-elements/CustomTextField";
import CustomTypography from "@/app/(home)/components/forms/theme-elements/CustomTypography";
import useAuth from "@/hook/auth/useLogin"

const AuthLogin = ({ title, subtitle, subtext }) => {

  const { checkUserName, checkPassWord, checkLogin, errorLogin, errorUserName, errorPassWord } = useAuth();
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
            Tên đăng nhập
          </Typography>
          <CustomTextField onChange={(event) => checkUserName(event.target.value)} variant="outlined" fullWidth />
          {errorUserName ? (<CustomTypography>{errorUserName}</CustomTypography>) : <p>{errorUserName}</p>}
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
          {errorPassWord ? (<CustomTypography>{errorPassWord}</CustomTypography>) : null}
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
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
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => checkLogin()}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
}

export default AuthLogin;
