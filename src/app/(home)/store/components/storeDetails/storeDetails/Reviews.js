
// Third-party
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { IconFlag, IconUserCircle, IconStar } from "@tabler/icons-react";
import { Stack, Typography, List, IconButton, Avatar, Box, Skeleton, Select, MenuItem, Divider } from '@mui/material';

// In the Project
import useDetailStore from '@/hook/user/useSort';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: '0.9rem',
        padding: '8px'
    },
}));

const list = [
    {
        name: 'Kush',
        star: 4,
        review: 'Food and service was good.  Ambiance And we overlooked the beach',
        time: '15:30 20/2/2024'
    },
    {
        name: 'LorrainK',
        star: 5,
        review: 'Un restaurant très sympa avec une bonne ambiance, les plats sont raffinées. À faire tout simplement.',
        time: '10:30 16/2/2024'
    },
    {
        name: 'JacopoA',
        star: 3,
        review: 'Finally a fine dining restaurant experience in phu quoc , the food was presented so nice and taste amazing the service was so professional and kind ',
        time: '12:30 1/2/2024'
    },

]

export default function Reviews() {

    const { sortReviews } = useDetailStore()

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = 1000;               // Thời gian delay là 2000ms (5 giây)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer); // Xóa timer khi component bị unmount
    }, []);

    const [expanded, setExpanded] = useState(false);

    const [listReview, setListReview] = useState(list);

    const [typeSort, setTypeSort] = useState('Newest');

    const handleChangeTypeSort = (event) => {
        setTypeSort(event.target.value);
        if ('HighestRating' === event.target.value)
            setListReview(sortReviews(listReview, true, 'star'))
        if ('LowestRaTing' === event.target.value)
            setListReview(sortReviews(listReview, false, 'star'))
        if ('Newest' === event.target.value) { }

    };

    const handleReport = (event) => {                   // Gọi hook
        console.log('report');
    };

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">

                {isLoading ? (
                    <Skeleton animation="wave" variant="text" height={50} sx={{ fontSize: '1rem' }} >
                        <Typography variant="h6" component="h6" minWidth={60} sx={{ textAlign: 'center' }}>
                            ################
                        </Typography>
                    </Skeleton>
                )
                    :
                    (<Typography variant="h6" component="h6">
                        {listReview.length} Đánh giá
                    </Typography>
                    )
                }
                {
                    isLoading || listReview && listReview.length === 0 ? <></> : (

                        <Select
                            labelId="lg"
                            id="lg"
                            value={typeSort}
                            size="small"
                            onChange={handleChangeTypeSort}
                        >
                            <MenuItem value={'Newest'}>Mới nhất</MenuItem>
                            <MenuItem value={'HighestRating'}>Đánh giá cao</MenuItem>
                            <MenuItem value={'LowestRaTing'}>Đánh giá thấp</MenuItem>
                        </Select>
                    )
                }
            </Stack>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {isLoading ? (
                    <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Stack direction="column" spacing={1} alignItems={'center'}>
                                <Skeleton animation="wave" variant="circular">
                                    <Avatar sx={{ backgroundColor: '#c3c2c2', height: '45px', width: '45px' }}>
                                        <IconUserCircle />
                                    </Avatar>
                                </Skeleton>
                                <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                                    <Typography variant="h7" component="h7" minWidth={60} sx={{ textAlign: 'center' }}>
                                        ########
                                    </Typography>
                                </Skeleton>
                            </Stack>
                            <Stack direction="column" spacing={0} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                                    <Typography variant="body2" sx={{ padding: '3px', backgroundColor: 'rgb(239, 239, 239)', borderRadius: '4px' }}>
                                        ###############
                                    </Typography>
                                </Skeleton>
                                <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                                    <Stack direction="row">
                                        {[...Array(5)].map((_, index) => (
                                            <Box key={index} sx={{ fontSize: '0.5rem' }}>
                                                <IconStar key={index} />
                                            </Box>
                                        ))}
                                    </Stack>
                                </Skeleton>
                                <Skeleton animation="wave" variant="text" width={150} height={20} sx={{ fontSize: '1rem' }} >
                                </Skeleton>
                            </Stack>
                        </Stack>
                        <Skeleton animation="wave" variant="text" height={30} sx={{ fontSize: '1rem' }} >
                            <LightTooltip title="Báo cáo bình luận" placement="right" >
                                < IconButton aria-label="comment"
                                    onClick={handleReport}
                                >
                                    <IconFlag />
                                </IconButton>
                            </LightTooltip>
                        </Skeleton>
                    </Stack >)
                    :
                    (
                        listReview.length === 0 ? (
                            <Typography variant="h6" component="h6" minWidth={60} sx={{ textAlign: 'center' }}>
                                Hãy trở thành khách hàng đầu tiên đánh giá cửa hàng này
                            </Typography>
                        ) : (
                            listReview.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                                        <Stack direction="row" spacing={3}>
                                            <Stack direction="column" spacing={1} alignItems={'center'}>
                                                <Avatar sx={{ backgroundColor: '#c3c2c2', height: '45px', width: '45px' }}>
                                                    <IconUserCircle />
                                                </Avatar>
                                                <Typography variant="h7" component="h7" minWidth={60} sx={{ textAlign: 'center' }}>
                                                    {item.name}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="column" spacing={1} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                                <Typography variant="body2" sx={{ padding: '3px', backgroundColor: 'rgb(239, 239, 239)', borderRadius: '4px' }}>
                                                    {item.time}
                                                </Typography>
                                                <Stack direction="row">
                                                    {[...Array(item.star)].map((_, index) => (
                                                        <Box key={index} sx={{ fontSize: '0.5rem' }}>
                                                            <IconStar key={index} />
                                                        </Box>
                                                    ))}
                                                </Stack>
                                                <Typography variant="h7">
                                                    {item.review}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                        <LightTooltip title="Báo cáo bình luận" placement="right">
                                            <IconButton aria-label="comment" onClick={handleReport}>
                                                <IconFlag />
                                            </IconButton>
                                        </LightTooltip>
                                    </Stack>
                                    <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
                                </React.Fragment>
                            ))
                        )
                    )
                }
            </List>
        </Stack >
    );
}
