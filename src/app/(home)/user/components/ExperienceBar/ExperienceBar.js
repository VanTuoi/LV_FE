import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, LinearProgress, Box, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

function ExperienceBar({ level, currentExp, maxExp }) {
    // Tính phần trăm tiến độ kinh nghiệm
    const progress = (currentExp / maxExp) * 100;
    const [hovered, setHovered] = useState(false);

    const handleClickDetailLaw = () => {
        alert('click')
    }
    return (
        <Box sx={{ width: '160px', display: 'flex', alignItems: 'center' }}>
            {/* Hiển thị cấp độ trong vòng tròn màu xám nhạt */}
            {/* Hiển thị thanh tiến độ */}
            <HtmlTooltip
                title={
                    <Box>
                        <Typography color="textPrimary">Level hiện tại là {level}</Typography>
                        <Typography variant='body2'>{"Cần"} <b>{150}</b> {'điểm nữa để lên cấp'}</Typography>
                        <IconButton
                            sx={{ cursor: 'pointer', color: '#006BD6' }}
                            onClick={() => handleClickDetailLaw()}
                        >
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Box>
                }
                placement="right-end"
            >
                <Box
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{ width: '100%', mr: 1, cursor: 'pointer', }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: '15px', zIndex: '-1' }} // Tăng độ cao của LinearProgress
                    />
                    <Box sx={{ marginTop: '-16px', marginLeft: '60px', zIndex: 1 }} >
                        <Typography variant='body2' fontWeight={'600'} color={'white'}>level {level}</Typography>
                    </Box>
                </Box>
            </HtmlTooltip >
        </Box >
    );
}

export default ExperienceBar;
