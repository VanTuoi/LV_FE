import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function BasicChips({ tags }) {
    return (
        <Stack direction="row" spacing={1} alignItems={'center'}>
            <Typography variant="h6" component="h6">
                Tag nổi bật:
            </Typography>
            {tags.map((tag, index) => (
                <Chip key={index} label={tag} />
            ))}
        </Stack>
    );
}
