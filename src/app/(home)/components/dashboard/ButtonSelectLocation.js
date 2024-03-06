import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
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
} from "@mui/material";

import useSearch from '@/hook/user/useSearch'
import { useAppSelector } from '@/lib/hooks';

import ViewDistrict from './ViewDistrict'

import { IconMapPin, IconCurrentLocation } from "@tabler/icons-react";

const ButtonSelectLocation = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { setLocationBySelect, getListLocation, setLocationToBrowser } = useSearch();
  const listLocation = getListLocation()

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
        <Box
        >
          <IconMapPin />
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
        BackdropComponent={Backdrop}
        BackdropProps={{
          invisible: false,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
            marginTop: '10px',
            marginLeft: '120px',
          },
        }}
      >
        <Button startIcon={<IconCurrentLocation />} sx={{ marginLeft: '10px' }} variant="outlined" size="small" onClick={setLocationToBrowser}>Lấy vị trí hiện tại</Button>
        <ViewDistrict handleSelect={setLocationBySelect} listLocation={listLocation}></ViewDistrict>
      </Menu>
    </Box>
  );
};

export default ButtonSelectLocation;
