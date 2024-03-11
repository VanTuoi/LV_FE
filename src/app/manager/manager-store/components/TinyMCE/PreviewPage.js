'use client'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Detail from '@/app/(home)/products/components/ProductDetails/ProductDetails/Detail'
import { useAppSelector } from '@/lib/hooks';
import { flatMap } from 'lodash';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ handleClickDemo }) {

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();

    const contentToRedux = useAppSelector((state) => state.reducer.store.content)

    useEffect(() => {
        setContent(contentToRedux)
    }, [contentToRedux]);

    const handleClickOpen = () => {
        handleClickDemo()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Xem trước giao diện
            </Button>
            <BootstrapDialog
                fullScreen={false}
                fullWidth={true}
                // sx={{ width: '1024px' }}
                maxWidth={'md'}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Đây là giao diện trong trang giới thiệu cửa hàng của bạn
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={false}>
                    <Detail content={content}></Detail>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant='text' onClick={handleClose} color='warning'>
                        Đóng
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
