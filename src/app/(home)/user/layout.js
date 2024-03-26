"use client";

import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';
export default function RootLayout({ children }) {

    return (
        <Box>
            {children}
        </Box>
    );
}