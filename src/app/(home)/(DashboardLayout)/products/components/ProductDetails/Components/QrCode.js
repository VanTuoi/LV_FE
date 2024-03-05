import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';
import { Stack } from '@mui/system';
import Image from 'next/image'
import Typography from '@mui/material/Typography';

import GetAppIcon from '@mui/icons-material/GetApp';

export default function SimpleBackdrop({ base64ImgQr, isShow, setIsShow }) {

    const [open, setOpen] = useState(isShow);
    const [base64ImgQrToProps, setBase64ImgQrToProps] = useState()
    const handleClose = () => {
        setOpen(false);
        setIsShow(false)
    };

    useEffect(() => {
        handleOpen()
    }, [isShow]);

    useEffect(() => {
        setBase64ImgQrToProps(base64ImgQr)
        console.log('base64ImgQr', base64ImgQr);
    }, [base64ImgQr]);

    const handleOpen = () => {
        setOpen(true);
    };

    // https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg
    const [urlImg, setUrlImg] = useState('https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC');

    const download = (filename, content) => {
        var element = document.createElement("a");
        element.setAttribute("href", content);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    const handleDownload = async (e) => {
        try {
            const result = await fetch(base64ImgQrToProps, {
                method: "GET",
                headers: {}
            });
            const blob = await result.blob();
            const url = URL.createObjectURL(blob);
            download("myQr", url);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            // onClick={handleClose}
            >
                {/* <CircularProgress color="inherit" /> */}
                <DashboardCard DashboardCard title="">
                    <Box sx={{ height: '450px', width: '400px' }}>
                        <Stack spacing={2} direction="column" alignItems="center">
                            <div>
                                <img
                                    style={{ Maxwidth: '350px', height: 'auto' }}
                                    src={base64ImgQrToProps}
                                    alt="Base64 Image" />
                                {/* <img
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                    src={urlImg} alt="Ảnh mô tả" /> */}
                            </div>
                            <Typography variant="subtitle1">
                                (Vui lòng giữ mã Qr để check in vào quán)
                            </Typography>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Button
                                    variant="text"
                                    onClick={handleClose}
                                >Thoát
                                </Button>
                                <Button
                                    startIcon={<GetAppIcon />}
                                    variant="contained"
                                    onClick={handleDownload}
                                >Tải xuống
                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                </DashboardCard>
            </Backdrop>
        </>
    );
}