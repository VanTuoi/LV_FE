import React from "react";
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

import { useAppDispatch } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'

import TableMenu from './Menu'

const Proflie = () => {

  const dispatch = useAppDispatch()

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
              size="small"
              onChange={(event) => handleChangeName(event.target.value)}
              variant="outlined"
            // fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Stack direction={'column'}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Liên kết đến trang cửa hàng của bạn là
            </Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                disabled
                size="small"
                value={'http://localhost:3000/products/TheCoffeeHouse'}
                onChange={(event) => handleChangeLocation(event.target.value)}
                variant="outlined"
              // fullWidth 
              />
              <IconButton aria-label="delete">
                <ContentCopyIcon />
              </IconButton>
              <Button variant='text'>
                Truy cập ngay
              </Button>
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
              size="small"
              onChange={(event) => handleChangeLocation(event.target.value)}
              variant="outlined"
            // fullWidth 
            />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Stack direction={'column'}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Tag
            </Typography>
            .....
          </Stack>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack direction={'column'} >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              <TableMenu />
            </Typography>
            .....
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Proflie;
