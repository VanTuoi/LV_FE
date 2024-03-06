"use client";

import React, { useState } from "react";

import { Breadcrumbs, MenuItem, TextField, Typography, FormControl, InputLabel, Link, Box } from '@mui/material';

// const MainWrapper = styled("div")(() => ({
//   display: "flex",
//   minHeight: "100vh",
//   width: "100%",
//   // border: '2px solid red'
// }));

// const PageWrapper = styled("div")(() => ({
//   display: "flex",
//   flexGrow: 1,
//   paddingBottom: "60px",
//   flexDirection: "column",
//   zIndex: 1,
//   backgroundColor: "transparent",
//   // border: '2px solid green'
// }));

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <Box>
      {children}
    </Box>
  );
}
