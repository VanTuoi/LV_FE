
// Third-party
import React, { useState, useEffect } from 'react';
import { Box, Button, Skeleton, Stack } from '@mui/material';


export default function Detail(props) {

    const maxLength = 2500;
    const [expanded, setExpanded] = useState(false);
    const [content, setContent] = useState(null);
    const [trimmedContent, setTrimmedContent] = useState('');

    useEffect(() => {
        setContent(props.content);
    }, [props]);

    useEffect(() => {                           // Chỉ hiển thị 2500 kí tự đầu + nút mở rộng
        if (content) {
            const trimmed = content.substring(0, maxLength);
            setTrimmedContent(trimmed);
        }
    }, [content]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            {content !== null ? (
                <Box>
                    {expanded ? (
                        <Box dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <Box dangerouslySetInnerHTML={{ __html: trimmedContent }} />
                    )}
                    {content.length > maxLength && (
                        <Button variant='text' onClick={toggleExpanded}>
                            {expanded ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    )}
                </Box>
            ) : (
                <Stack direction={'column'} spacing={1} width={'100%'}>
                    <Skeleton variant="rectangular" width={'60%'} height={50} />
                    <Skeleton variant="text" width={'100%'} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="rectangular" width={'40%'} height={250} />
                    <Skeleton variant="text" width={'90%'} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" width={'100%'} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" width={'80%'} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={40} />
                </Stack>
            )}
        </Box>
    );
}
