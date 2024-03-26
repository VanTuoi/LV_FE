import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';


// components
import { IconUser, IconMenu } from '@tabler/icons-react';
import Profile from './Profile';
import Bell from './Bell';
// import Language from '@/app/(home)/layout/header/Language'
// import Theme from '@/app/(home)/layout/header/Theme'

const Header = ({ }) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    background: theme.palette.background.paper,
    justifyContent: 'center',
  }));
  const ToolbarStyledTop = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    backgroundColor: '#F1F2F4',
    minHeight: '55px !important'
  }));
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyledTop>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Stack spacing={1} direction="row" alignItems="center">
            <Bell />
            <Profile />
          </Stack>
        </Stack>
      </ToolbarStyledTop>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
