
// Third-party
import React, { useState, useEffect } from 'react';
import {
    Button,
    Stack,
    Typography,
} from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
//In Project
import { useAppSelector } from '@/lib/hooks';

const DetailsTicket = () => {

    const data = useAppSelector((state) => state.reducer.checkin.details)

    const [details, setDetails] = useState();

    useEffect(() => {
        setDetails(data);
        console.log('Change:');
    }, [data]);

    const handleClick = () => {
        console.log('b', data, details);
    }
    // console.log('Details:', details);

    return (
        <Stack direction="column" spacing={0}>
            <Stack direction="column" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant='h6' fontWeight="500" gutterBottom >
                        Tên người dùng:
                    </Typography>

                    <Typography variant='h6' fontWeight="500" gutterBottom>
                        {details && details.name}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant='h6' fontWeight="500" gutterBottom>
                        Thời gian đến:
                    </Typography>
                    <Typography variant='h6' fontWeight="500" gutterBottom>
                        {details && details.timeCome}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant='h6' fontWeight="500" gutterBottom>
                        Số lượng:
                    </Typography>
                    <Typography variant='h6' fontWeight="500" gutterBottom >
                        {details && details.number}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant='h6' fontWeight="500" gutterBottom>
                        Trạng thái vé:
                    </Typography>
                    <Typography variant='h6' fontWeight="500" gutterBottom style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                        {details && details.status}
                    </Typography>
                </Stack>

            </Stack>

            {/* <Button onClick={() => handleClick()} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button> */}
        </Stack >
    );
}
export default DetailsTicket