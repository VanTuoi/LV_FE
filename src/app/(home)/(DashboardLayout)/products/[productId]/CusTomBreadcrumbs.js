"use client";

import React, { useState } from "react";

import { Breadcrumbs, MenuItem, TextField, Typography, FormControl, InputLabel, Link, Box } from '@mui/material';

export default function CusTomBreadcrumbs({ params }) {

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Cần Thơ
            </Link>
            <Typography color="text.primary">{params.productId}</Typography>
        </Breadcrumbs>
    );
}
