"use client";

import React, { useState } from "react";
import { Box } from '@mui/material';

export default function RootLayout({ children }) {

  return (
    <Box>
      {children}
    </Box>
  );
}