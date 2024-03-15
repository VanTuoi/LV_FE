
//Third-party
import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import { Typography, Stack, TextField, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// In the project

const Proflie = (props) => {

    const { id, name, location, setLocationToDB, setNameToDB } = props

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/store?id=${id ? id : ''}`)
            .then(() => {
                alert("Đã copy vào bộ nhớ tạm!");
            })
            .catch(err => {
                console.error('Có lỗi xảy ra khi copy: ', err);
            });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
                <Stack direction={'column'}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                    >
                        Tên cửa hàng
                    </Typography>
                    <TextField
                        value={name}
                        variant="standard"
                        // size="small"
                        helperText="Hạn chế việc đổi tên nếu không cần thiết"
                        onChange={(event) => setNameToDB(event.target.value)}
                    // fullWidth
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Stack direction={'column'} >
                    {/* <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                        >
                            Liên kết đến trang cửa hàng của bạn là
                        </Typography> */}
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Link href="#" underline="hover">
                            {`http://localhost:3000/store?id=${id ? id : ''}`}
                        </Link>
                        <IconButton onClick={() => handleCopyUrl()} aria-label="delete">
                            <ContentCopyIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Stack>
                </Stack>

            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Stack direction={'column'}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                    >
                        Vị trí cửa hàng
                    </Typography>
                    <TextField
                        value={location}
                        // size="small" 
                        variant="standard"
                        onChange={(event) => setLocationToDB(event.target.value)}
                    // fullWidth 
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Proflie;

