import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';


// In the Project
import useSaveStores from '@/hook/user/useSaveStores';

export default function ListStoreSave() {

    const {

    } = useSaveStores()

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <Stack direction={'column'} spacing={2}>
            <Typography variant='h5'>Danh sách cửa hàng đã lưu</Typography>
        </Stack>
    );
}
