import * as React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
export default function Menu({ tags }) {
    const [expanded, setExpanded] = React.useState(false);

    const listMenu = [
        {
            name: 'Coffee Đen (M)',
            price: '28.000'
        },
        {
            name: 'Coffee Đen (S)',
            price: '35.000'
        },
        {
            name: 'Coffee Sữa (M)',
            price: '28.000'
        },
        {
            name: 'Coffee Sữa (S)',
            price: '35.000'
        },
        {
            name: 'Bạc Sỉu',
            price: '35.000'
        },
        {
            name: 'Trà Đào Cam Sả',
            price: '45.000'
        },
        {
            name: 'Trà Vải',
            price: '45.000'
        },
        {
            name: 'Trà Oolong Hạt Sen',
            price: '45.000'
        },
        {
            name: 'Trà Oolong Phúc Bồn Tử',
            price: '50.000'
        },
        {
            name: 'Trà Oolong Bưởi Mật Ong',
            price: '50.000'
        },
        {
            name: 'Trà Lài Macchiato',
            price: '42.000'
        },
        {
            name: 'Trà Đen Macchiato',
            price: '42.000'
        },
        {
            name: 'Trà Matcha Macchiato',
            price: '45.000'
        },
        {
            name: 'Sinh Tố Việt Quất',
            price: '49.000'
        },
        {
            name: 'Sinh Tố Cam Xoài',
            price: '49.000'
        },
        {
            name: 'Chanh Sả Đá Xay ',
            price: '49.000'
        },
        {
            name: 'Đào Việt Quất Đá Xay ',
            price: '49.000'
        },
        {
            name: 'Matcha Latte',
            price: '59.000'
        },
        {
            name: 'Matcha Đá Xay',
            price: '59.000'
        },
        {
            name: 'Cookies Đá Xay',
            price: '59.000'
        },
    ]

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="flex-start">
                <Typography variant="h4" component="h4">
                    Menu
                </Typography>
                <Typography variant="body1" sx={{ padding: '3px', backgroundColor: '#EBEBEB', borderRadius: '4px' }}>
                    Cập nhật lần cuối: Tháng 1 năm 2024
                </Typography>
            </Stack>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {listMenu.map((item, index) => (
                    <ListItem
                        key={item.name}
                        disableGutters
                        secondaryAction={
                            <Typography variant="body1">
                                {item.price}đ
                            </Typography>
                        }
                    >
                        <ListItemText
                            primaryTypographyProps={{ fontSize: '1rem' }}
                            primary={`${index + 1}. ${item.name}`} />
                    </ListItem>
                ))}
            </List>
        </Stack>


    );
}
