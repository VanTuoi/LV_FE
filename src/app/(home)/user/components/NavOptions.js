import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { color } from '@mui/system';

// In the Project
import useManagerProfile from '@/hook/user/useManagerProfile'

export default function NavOptions({ valueSelect, handleSelectOptions }) {

    const { } = useManagerProfile()

    return (
        <Stack direction="column" spacing={3} alignItems={'flex-start'}>
            <Box display={'flex'} flexDirection={'column'} gap={2}>
                <Typography onClick={() => handleSelectOptions('detail_account')}
                    sx={{
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: valueSelect === 'detail_account' ? '#006BD6' : '',
                        fontWeight: valueSelect === 'detail_account' ? 700 : 500,
                        '&:hover': {
                            color: '#007BD7'
                        }
                    }}>
                    Chi tiết tài khoản
                </Typography>

                <Typography onClick={() => handleSelectOptions('list_store_save')}
                    sx={{
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: valueSelect === 'list_store_save' ? '#006BD6' : '',
                        fontWeight: valueSelect === 'list_store_save' ? 700 : 500,
                        '&:hover': {
                            color: '#007BD7'
                        }
                    }}>
                    Danh sách cửa hàng đã lưu
                </Typography>

                <Typography onClick={() => handleSelectOptions('list_store_report')}
                    sx={{
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: valueSelect === 'list_store_report' ? '#006BD6' : '',
                        fontWeight: valueSelect === 'list_store_report' ? 700 : 500,
                        '&:hover': {
                            color: '#007BD7'
                        }
                    }}>
                    Danh sách báo cáo
                </Typography>
                <Typography onClick={() => handleSelectOptions('list_store_booking')}
                    sx={{
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: valueSelect === 'list_store_booking' ? '#006BD6' : '',
                        fontWeight: valueSelect === 'list_store_booking' ? 700 : 500,
                        '&:hover': {
                            color: '#007BD7'
                        }
                    }}>
                    Lịch sử đặt bàn
                </Typography>

            </Box>
        </Stack>
    );
}
