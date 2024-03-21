import React, { useEffect, useState } from 'react';
import { Avatar, Stack, Box, Typography } from '@mui/material';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


// In the Project
import ExperienceBar from './ExperienceBar/ExperienceBar'

export default function ImageAvatars() {
    let [name, setName] = useState()
    useEffect(() => {
        // Perform localStorage action
        setName(localStorage.getItem('name'))
        console.log('name', name);
    }, [localStorage.getItem('name')])

    const handleClickChangeAvatar = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg, image/png'; // Chỉ chấp nhận ảnh JPG và PNG
        input.onchange = (e) => handleFileSelect(e.target.files);
        input.click();
    }
    const handleFileSelect = (files) => {
        const file = files[0]; // Chọn tệp đầu tiên trong trường chọn tập tin
        if (!file) return;
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            console.log('Đã chọn ảnh:', file);
        } else {
            console.error('Vui lòng chọn tệp ảnh định dạng JPG hoặc PNG.');
        }
    };

    return (
        <Stack direction="column" spacing={2}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                <Avatar sx={{ height: '150px', width: '150px' }} alt="Remy Sharp" src="https://investone-law.com/wp-content/uploads/2019/06/chu-t.png" />
                <Box
                    onClick={() => handleClickChangeAvatar()}
                    sx={{
                        height: '40px', width: '40px', zIndex: '10', padding: '6px',
                        margin: '10px', marginLeft: '100px', marginTop: '-50px', borderRadius: '22px',
                        border: '1px solid #c6c6c6', backgroundColor: 'white',
                        cursor: 'pointer'
                    }}>
                    <AddAPhotoIcon ></AddAPhotoIcon>
                </Box>
                <Box>
                    <ExperienceBar level={1} currentExp={800} maxExp={1000} />
                </Box>
            </Box>
            <Typography variant='h4' fontWeight={'600'}> Xin chào, {name}</Typography>
        </Stack>
    );
}
