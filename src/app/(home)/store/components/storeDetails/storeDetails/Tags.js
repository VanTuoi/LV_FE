
// Third-party
import React, { useState, useEffect } from 'react';
import { Chip, Stack, Typography, Skeleton, Box } from '@mui/material';

export default function BasicChips(props) {

    let { tags } = props
    const [listTags, setListTags] = useState([])

    useEffect(() => {
        setListTags(tags);
    }, [tags]);

    return (
        <Box>
            {listTags && listTags.length !== 0 ?
                (
                    <Stack direction="row" spacing={1} alignItems={'center'}>
                        <Typography variant="h6" component="h6">
                            Tag:
                        </Typography>
                        {listTags.map((tag, index) => (
                            <Chip key={index} label={tag} />
                        ))}
                    </Stack>
                ) : (
                    <Skeleton variant="rectangular" width={'80%'} height={50} />
                )
            }
        </Box>

    );
}
