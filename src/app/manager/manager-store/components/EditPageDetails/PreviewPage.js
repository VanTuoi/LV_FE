import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Detail from '@/app/(home)/store/components/storeDetails/storeDetails/Detail';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const marks = [
    {
        value: 480,
        label: 'Điện thoại di động',
    },
    {
        value: 690,
        label: 'Máy tính xách tay (Laptop)',
    },
    {
        value: 992,
        label: 'Màn hình lớn',
    },
    {
        value: 1200,
        label: 'Màn hình rộng',
    },
];

export default function CustomizedDialogs(props) {

    const { handleClickDemo, details } = props

    const [open, setOpen] = useState(false);

    const [content, setContent] = useState();

    useEffect(() => {
        setContent(details);
    }, [details]);

    const handleClickOpen = () => {
        handleClickDemo();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [dialogContentWidth, setDialogContentWidth] = useState(690); // Khởi tạo giá trị ban đầu là 960px
    const handleSliderChange = (event, newValue) => {
        setDialogContentWidth(newValue); // Cập nhật giá trị độ rộng dựa trên Slider
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Xem trước giao diện
            </Button>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth={false}
                fullScreen
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Đây là giao diện trong trang giới thiệu cửa hàng của bạn
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Slider
                            sx={{ width: '50%' }}
                            min={480}
                            max={1200}
                            defaultValue={690}
                            aria-label="Custom marks"
                            onChange={handleSliderChange}
                            step={10}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </Box>

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
                <DialogContent
                    dividers={false}

                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: `${dialogContentWidth}px`, // Sử dụng giá trị độ rộng từ state
                                overflowX: 'hidden', // Ẩn thanh cuộn ngang khi nội dung vượt quá độ rộng
                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                padding: '2px'
                            }}>
                            <Detail content={content}></Detail>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
