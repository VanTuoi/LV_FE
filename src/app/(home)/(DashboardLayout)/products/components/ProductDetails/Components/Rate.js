import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Box, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0: '',
    0.5: 'Không thể chấp nhận',
    1: 'Không hài lòng',
    1.5: 'Rất tệ',
    2: 'Tệ',
    2.5: 'Dưới mức trung bình',
    3: 'Trung bình',
    3.5: 'Khá tốt',
    4: 'Tốt',
    4.5: 'Rất tốt',
    5: 'Tuyệt vời',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const setRate = () => {

}

export default function HoverRating() {
    const [value, setValue] = React.useState(4.5);
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="left"
                mt={1}
                spacing={1}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{ color: 'gray' }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
                <Typography variant="h6" component="h6">
                    ({4.2})
                </Typography>
            </Stack>
        </Box>
    );
}