import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Chip, Button, Stack, Typography, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import { CommentIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';


export default function Menus(props) {

    const [expanded, setExpanded] = React.useState(false);

    let { menus } = props

    const [listMenu, setListMenu] = useState([]);

    const [dateUpdate, setDateUpdate] = useState('')

    useEffect(() => {
        setListMenu(menus);
    }, [menus]);

    useEffect(() => {
        if (listMenu.length > 0) {
            setDateUpdate(dayjs(listMenu[listMenu.length - 1].updatedAt).format('HH:mm DD/MM/YYYY'));
            console.log('dateUpdate', dateUpdate);
        }
    }, [listMenu]);

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="flex-start">
                <Typography variant="h5" component="h5">
                    {/* Menu */}
                </Typography>
                {listMenu && listMenu.length > 0 ?
                    (
                        <Typography variant="body2" sx={{ padding: '3px', backgroundColor: '#EBEBEB', borderRadius: '4px' }}>
                            Cập nhật lần cuối: {dateUpdate}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width={'100%'} />
                    )
                }
            </Stack>
            {listMenu && listMenu.length > 0 ?
                (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {listMenu && listMenu.map((item, index) => (
                            <ListItem
                                key={item.M_Name}
                                disableGutters
                                secondaryAction={
                                    <Typography variant="body1">
                                        {item.M_Price}đ
                                    </Typography>
                                }
                            >
                                <ListItemText
                                    primaryTypographyProps={{ fontSize: '1rem' }}
                                    primary={`${index + 1}. ${item.M_Name}`} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Stack direction={'column'} spacing={2}>
                        <Skeleton variant="rectangular" width={'100%'} height={35} />
                        <Skeleton variant="rectangular" width={'100%'} height={35} />
                    </Stack>
                )
            }
        </Stack>
    );
}


// [
//     {
//         name: 'Coffee Đen (M)',
//         price: '28.000'
//     },
//     {
//         name: 'Coffee Đen (S)',
//         price: '35.000'
//     },
//     {
//         name: 'Coffee Sữa (M)',
//         price: '28.000'
//     },
//     {
//         name: 'Coffee Sữa (S)',
//         price: '35.000'
//     },
//     {
//         name: 'Bạc Sỉu',
//         price: '35.000'
//     },
//     {
//         name: 'Trà Đào Cam Sả',
//         price: '45.000'
//     },
//     {
//         name: 'Trà Vải',
//         price: '45.000'
//     },
//     {
//         name: 'Trà Oolong Hạt Sen',
//         price: '45.000'
//     },
//     {
//         name: 'Trà Oolong Phúc Bồn Tử',
//         price: '50.000'
//     },
//     {
//         name: 'Trà Oolong Bưởi Mật Ong',
//         price: '50.000'
//     },
//     {
//         name: 'Trà Lài Macchiato',
//         price: '42.000'
//     },
//     {
//         name: 'Trà Đen Macchiato',
//         price: '42.000'
//     },
//     {
//         name: 'Trà Matcha Macchiato',
//         price: '45.000'
//     },
//     {
//         name: 'Sinh Tố Việt Quất',
//         price: '49.000'
//     },
//     {
//         name: 'Sinh Tố Cam Xoài',
//         price: '49.000'
//     },
//     {
//         name: 'Chanh Sả Đá Xay ',
//         price: '49.000'
//     },
//     {
//         name: 'Đào Việt Quất Đá Xay ',
//         price: '49.000'
//     },
//     {
//         name: 'Matcha Latte',
//         price: '59.000'
//     },
//     {
//         name: 'Matcha Đá Xay',
//         price: '59.000'
//     },
//     {
//         name: 'Cookies Đá Xay',
//         price: '59.000'
//     },
// ]