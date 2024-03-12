import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  Grid
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'

import TableMenu from './Menu'
import Services from './Services'

const Proflie = (props) => {

  const dispatch = useAppDispatch()

  let nameToRedux = useAppSelector((state) => state.reducer.store.name)
  let locationToRedux = useAppSelector((state) => state.reducer.store.location)
  let contentToRedux = useAppSelector((state) => state.reducer.store.content)
  let menusToRedux = useAppSelector((state) => state.reducer.store.menus)
  let servicesToRedux = useAppSelector((state) => state.reducer.store.services)
  let tagsToRedux = useAppSelector((state) => state.reducer.store.tags)

  useEffect(() => {
    setName(nameToRedux)
    setLocation(locationToRedux)
    setContent(contentToRedux)
    setMenus(menusToRedux)
    setServices(servicesToRedux)
    setTags(tagsToRedux)
  }, [nameToRedux, locationToRedux, contentToRedux, menusToRedux, servicesToRedux, tagsToRedux])

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [content, setContent] = useState();
  const [menus, setMenus] = useState();
  const [services, setServices] = useState();
  const [tags, setTags] = useState();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('copy url')
      .then(() => {
        alert("Đã copy vào bộ nhớ tạm!");
      })
      .catch(err => {
        // Xử lý lỗi (nếu có)
        console.error('Có lỗi xảy ra khi copy: ', err);
      });
  }

  const handleChangeName = (value) => {
    dispatch(store.actions.onChangeName(value))
  }
  const handleChangeLocation = (value) => {
    dispatch(store.actions.onChangeLocation(value))
  }

  let listTag = [
    {
      T_Id: 1,
      T_Name: 'Không gian phòng lạnh'
    },
  ]

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5}>
          <Stack direction={'column'}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Tên cửa hàng
            </Typography>
            <TextField
              value={name}
              variant="standard"
              size="small"
              helperText="Việc thay đổi tên cửa hàng có thể khiến khách hàng không tìm thấy cửa hàng"
              onChange={(event) => handleChangeName(event.target.value)}
            // fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Stack direction={'column'} >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Liên kết đến trang cửa hàng của bạn là
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Link href="#" underline="hover">
                {'http://localhost:3000/store?id=9'}
              </Link>
              <IconButton onClick={() => handleCopyUrl()} aria-label="delete">
                <ContentCopyIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Stack>
          </Stack>

        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Stack direction={'column'}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Vị trí cửa hàng
            </Typography>
            <TextField
              value={location}
              size="small"
              variant="standard"
              onChange={(event) => handleChangeLocation(event.target.value)}
            // fullWidth 
            />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={12}>
        </Grid>
        <Grid item xs={12} lg={7}>
          <TableMenu menus={menus} />
        </Grid>

        <Grid item xs={12} lg={5}>
          <Services services={services}></Services>
        </Grid>

      </Grid>
    </>
  );
}

export default Proflie;
