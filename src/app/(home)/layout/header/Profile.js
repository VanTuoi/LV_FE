import React, { useState } from "react";
import Link from "next/link";
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

import { IconListCheck, IconHeartPin, IconMapCheck, IconUser, IconUserCog, IconReport, IconUserExclamation } from "@tabler/icons-react";
import theme from "@/utils/theme";


const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
          <Typography variant="body1" fontWeight={400} >
            Xin chào,
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` Trần Văn A`}
            </Typography>
          </Typography>
        </Box>
        <MenuItem>
          <ListItemIcon>
            <IconUserCog width={20} />
          </ListItemIcon>
          <ListItemText>Tài khoản của tôi</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconHeartPin width={20} />
          </ListItemIcon>
          <ListItemText>Danh sách yêu thích</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMapCheck width={20} />
          </ListItemIcon>
          <ListItemText>Lịch sử Check In</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconReport width={20} />
          </ListItemIcon>
          <ListItemText>Lịch sử báo cáo</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Đăng xuất
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
