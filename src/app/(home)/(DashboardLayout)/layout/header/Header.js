import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconUser, IconMenu } from '@tabler/icons-react';
import Language from '@/app/(home)/(DashboardLayout)/layout/header/Language'
import Theme from '@/app/(home)/(DashboardLayout)/layout/header/Theme'

const Header = ({ toggleMobileSidebar }) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    // border: '1px solid red',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '50px',
    },
  }));
  const ToolbarStyledTop = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    height: '20px',
    color: theme.palette.text.secondary,
    backgroundColor: '#F1F2F4',
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: 'black',
    height: '0px'
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyledTop>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Theme></Theme>
          <Language></Language>
          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            <Profile />
          </Stack>
        </Stack>
      </ToolbarStyledTop>
      {/* <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
//      <Badge badgeContent={4} color="primary">
//          <IconBellRinging size="21" stroke="1.5" />
//      </Badge> 

        </IconButton>

      </ToolbarStyled> */}
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
