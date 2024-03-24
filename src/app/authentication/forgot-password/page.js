"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(home)/components/container/PageContainer";
import Logo from "@/app/(home)/layout/shared/logo/Logo";
import AuthForgotPassword from "../_auth/AuthForgotPassword";

const ForgotPassword = () => {

    return (
        <PageContainer title="Lấy lại mật khẩu" description="this is forgrt password page">
            <Box
                sx={{
                    position: "relative",
                    "&:before": {
                        content: '""',
                        background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: "0.3",
                    },
                }}
            >
                <Grid
                    container
                    spacing={0}
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={4}
                        xl={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card
                            elevation={9}
                            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo />
                            </Box>
                            <AuthForgotPassword
                                subtext={
                                    <Typography
                                        variant="subtitle1"
                                        textAlign="center"
                                        color="textSecondary"
                                        mb={1}
                                    >
                                        Lấy lại mật khẩu
                                    </Typography>
                                }
                                subtitle={
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                        mt={3}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                            fontWeight="500"
                                        >
                                            Bạn có tài khoản ?
                                        </Typography>
                                        <Typography
                                            component={Link}
                                            href="/authentication/login"
                                            fontWeight="500"
                                            sx={{
                                                textDecoration: "none",
                                                color: "primary.main",
                                            }}
                                        >
                                            Đăng nhập
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};
export default ForgotPassword;
