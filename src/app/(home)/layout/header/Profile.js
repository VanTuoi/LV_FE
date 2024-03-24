// Third-party
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconListCheck, IconHeartPin, IconMapCheck, IconUser, IconUserCog, IconReport, IconUserExclamation } from "@tabler/icons-react";
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Typography,
} from "@mui/material";


// In the Project
import useSessionStorage from '@/hook/useSessionStorage/useSessionStorage';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import userSlice from '@/lib/features/userSlice'
import useLogOut from '@/hook/auth/useLogOut'
import theme from "@/utils/theme";

const Profile = () => {

    const dispatch = useAppDispatch();

    const { logOut } = useLogOut()

    const { GetItemSessionStorage } = useSessionStorage()

    let isLogin = GetItemSessionStorage('U_name') // Check login

    const [haveLogin, setHaveLogin] = useState()

    useEffect(() => {
        setHaveLogin(isLogin)
    }, [isLogin])

    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClickLogout = () => {
        logOut()
    }

    return (
        <Box>
            <IconButton
                size="small"

                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === "object" && {
                        color: "primary.main",
                    }),
                }}
                onClick={handleClick2}
            >
                {/* <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        /> */}
                <Box
                    sx={{
                        color: 'gray',
                        // border: '2px solid', // Tùy chỉnh border ở đây
                        // borderRadius: '50%', // Đảm bảo biểu tượng là hình tròn
                        // padding: '2px 5px', // Tùy chỉnh khoảng cách giữa biểu tượng và border
                    }}
                >
                    <IconUser
                    // p={1} 
                    />
                </Box>

            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    "& .MuiMenu-paper": {
                        width: "250px",
                        // height: '300px',
                        marginTop: '-10px'
                    },
                }}
            >
                <Box padding={2}>
                    {haveLogin && haveLogin !== null && haveLogin !== '' ? (
                        <Box>
                            <Typography variant="body1" fontWeight={400} display="inline">Xin chào, </Typography>
                            <Typography variant="body1" fontWeight={500} display="inline">
                                {haveLogin}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body1" fontWeight={400} >
                            Bạn chưa đăng nhập
                        </Typography>
                    )}
                </Box>
                {haveLogin && haveLogin !== null && haveLogin !== '' ? (
                    [
                        <MenuItem key="item1">
                            <ListItemIcon>
                                <IconUserCog width={20} />
                            </ListItemIcon>
                            <ListItemText>Tài khoản của tôi</ListItemText>
                        </MenuItem>,
                        <MenuItem key="item2">
                            <ListItemIcon>
                                <IconHeartPin width={20} />
                            </ListItemIcon>
                            <ListItemText>Danh sách yêu thích</ListItemText>
                        </MenuItem>,
                        <MenuItem key="item3">
                            <ListItemIcon>
                                <IconMapCheck width={20} />
                            </ListItemIcon>
                            <ListItemText>Lịch sử Check In</ListItemText>
                        </MenuItem>,
                        <MenuItem key="item4">
                            <ListItemIcon>
                                <IconReport width={20} />
                            </ListItemIcon>
                            <ListItemText>Lịch sử báo cáo</ListItemText>
                        </MenuItem>,
                        <Box key="item5" mt={1} py={1} px={2}>
                            <Button
                                onClick={() => handleClickLogout()}
                                href="/"
                                variant="outlined"
                                color="primary"
                                component={Link}
                                fullWidth
                            >
                                Đăng xuất
                            </Button>
                        </Box>
                    ]
                ) : (
                    <Box mt={1} py={1} px={1}>
                        <Button
                            href="/authentication/login"
                            variant="outlined"
                            color="primary"
                            component={Link}
                            fullWidth
                        >
                            Đăng nhập ngay
                        </Button>
                    </Box>
                )
                }
            </Menu >
        </Box >
    );
};

export default Profile;
