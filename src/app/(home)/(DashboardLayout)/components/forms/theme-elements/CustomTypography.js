import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CustomTypography = styled((props) => <Typography {...props} />)(({ theme }) => ({
  color: theme.palette.primary.main,
  color: "#DA3743",
  fontWeight: 700,
  fontSize: '0.85rem',
  lineHeight: 1.5,
  // ...
}));

export default CustomTypography;
