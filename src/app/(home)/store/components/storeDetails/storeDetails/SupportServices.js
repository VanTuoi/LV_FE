
// Third-party
import React, { useState, useEffect } from 'react';
import { Stack, Typography, Skeleton, Box } from '@mui/material';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

export default function Services(props) {

    const { list } = props;
    const [listServices, setListServices] = useState([]);

    useEffect(() => {
        setListServices(list);
    }, [list]);

    return (
        <Box>
            {listServices && listServices.length !== 0 ?
                (
                    <Stack direction="column" spacing={1} alignItems={'left'}>
                        {listServices.map((service, index) => (
                            <Stack key={index} direction="row" spacing={1} alignItems="center">
                                {service.S_IsAvailable ? <IconCircleCheck style={{ color: '#4caf50' }} size={18} /> : <IconCircleX style={{ color: '#9e9e9e' }} size={18} />}
                                <Typography style={{ color: !service.S_IsAvailable ? '#9e9e9e' : null }} fontSize={'16px'}>{service.S_Name}</Typography>
                                <Typography variant='body1'>{service.S_Describe ? '(' + service.S_Describe + ')' : null}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                ) : (
                    <Stack direction="column" spacing={1} alignItems={'left'}>
                        <Skeleton variant="rectangular" width={'80%'} height={20} />
                        <Skeleton variant="rectangular" width={'100%'} height={20} />
                        <Skeleton variant="rectangular" width={'100%'} height={20} />
                    </Stack>
                )
            }
        </Box>

    );
}
