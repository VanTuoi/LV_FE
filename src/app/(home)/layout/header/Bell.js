import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  Badge
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useSearch from '@/hook/user/useSearch'
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

import { IconBell } from "@tabler/icons-react";

const NotificationsBooking = () => {

  let haveSchedule = true
  if (!haveSchedule) {
    return (
      <Box sx={{ margin: 0 }}>
        <Typography fontWeight={600}>
          Bạn chưa đến hẹn đặt bàn trong ngày hôm nay
        </Typography>
      </Box>
    )
  }
  return (  // Xanh #EAF6F3, Vàng #FFF9DB, đỏ #FFD1C1
    <>
      <Accordion sx={{ margin: 0, marginTop: 1, backgroundColor: '#FFF9DB' }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="body1">7h30 08/3/2024</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" fontWeight={400} >
            Thời gian đến:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` 16:30 08/3/2024`}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Nơi đến:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` The Coffee House `}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Số lượng:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` 10 `}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Trạng thái:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` Đã muộn `}
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion >
      <Accordion sx={{ margin: 0, marginTop: 1, backgroundColor: '#EAF6F3' }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="body1">16h30 08/3/2024</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" fontWeight={400} >
            Thời gian đến:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` 16:30 08/3/2024`}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Nơi đến:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` The Coffee House `}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Số lượng:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` 10 `}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={400} >
            Trạng thái:
            <Typography display="inline" variant="body1" fontWeight={500}>
              {` Chưa đến giờ `}
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion >
    </ >
  );
}

const NotificationsNew = () => {
  let haveNews = false
  if (!haveNews) {
    return (
      <Box sx={{ margin: 0 }}>
        <Typography fontWeight={600}>
          Không có thông tin mới
        </Typography>
      </Box>
    )
  }
}

const ButtonSelectLocation = () => {


  let infoToRedux = useAppSelector((state) => state.reducer.user.info)

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return infoToRedux && infoToRedux.U_Id !== null ? (
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
        <Box sx={{ color: 'gray' }}>
          <Badge badgeContent={2}>
            <IconBell />
          </Badge>
        </Box>

      </IconButton>
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
            width: "300px",
            height: '350px',
            marginTop: '-5px'
          },
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 0, padding: '0', borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab sx={{ fontWeight: '600' }} label="Thông báo đặt bàn" value="1" />
              <Tab sx={{ fontWeight: '600' }} label="Thông tin mới" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: '5px' }} value="1">
            {NotificationsBooking()}
          </TabPanel>
          <TabPanel value="2">
            {NotificationsNew()}
          </TabPanel>
        </TabContext>
      </Menu>
    </Box>
  ) : (
    null
  )
};

export default ButtonSelectLocation;
