'use client'
import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import PageContainer from '@/app/(home)/components/container/PageContainer';
import Logo from '@/app/(home)/layout/shared/logo/Logo';
import AuthRegister from '../_auth/AuthRegister';

const Register = () => (
  <PageContainer title="Đăng ký" description="this is Register page">
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegister
              subtext={(
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                  Đơn giản, nhanh chóng, và hơn thế nữa
                </Typography>
              )}
              subtitle={(
                <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Bạn đã có tài khoản ?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/login"
                    fontWeight="500"
                    sx={{ textDecoration: 'none', color: 'primary.main' }}
                  >
                    Đăng nhập
                  </Typography>
                </Stack>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register;
