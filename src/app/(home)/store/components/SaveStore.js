
// Third-party
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Divider, Stack } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// In the Project

import useSaveStores from '@/hook/user/useSaveStores';

const SaveStore = ({ idStore }) => {

    const { statusSave, getStatusSaveStore, saveStore, unSaveStore } = useSaveStores()

    useEffect(() => {
        getStatusSaveStore(idStore)
    }, [])

    const handleClickSave = async () => {
        statusSave === false ? await saveStore(idStore) : await unSaveStore(idStore)
        await getStatusSaveStore(idStore)
    };

    return (
        <Box display={'flex'} flexDirection={'row-reverse'} >
            <Box
                onClick={() => handleClickSave()}
                sx={{
                    cursor: 'pointer',
                    height: '50px',
                    width: '200px',
                    marginBottom: '5px',
                    borderRadius: '5px',
                    border: '1px solid #D3D3D3',
                    '&:hover': {
                        border: ' 2px solid #5D87FF', // Màu nền khi hover
                        backgroundColor: '#f9f9f9 '
                    }
                }}
                justifyContent={'center'}
                display={'flex'}
                alignItems={'center'}
            >
                <Box height={'24px'} width={'24px'}>
                    {statusSave ? <BookmarkIcon sx={{ color: '#FFCC33' }}></BookmarkIcon> : <BookmarkBorderIcon></BookmarkBorderIcon>}
                </Box>
                <Typography variant='body1' fontWeight={600}>
                    {statusSave ? 'Cửa hàng đã được lưu' : 'Lưu cửa hàng'}
                </Typography>
            </Box>
        </Box>
    );
};

export default SaveStore;
