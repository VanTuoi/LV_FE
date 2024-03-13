
//Third-party
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

// In the project
import store from '@/lib/features/storeSlice'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import TableMenu from '@/app/manager/manager-store/components/Profile/Menu'
import Services from '@/app/manager/manager-store/components/Profile/Services'
import useControllerStore from '@/hook/manager/useControllerStore'

const Proflie = () => {

    const dispatch = useAppDispatch()
    const { setIsChangeName, setIsChangeLocation } = useControllerStore()

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [content, setContent] = useState();
    const [menus, setMenus] = useState();
    const [services, setServices] = useState();
    const [tags, setTags] = useState();

    let idToRedux = useAppSelector((state) => state.reducer.store.id)
    let nameToRedux = useAppSelector((state) => state.reducer.store.name)
    let locationToRedux = useAppSelector((state) => state.reducer.store.location)
    let contentToRedux = useAppSelector((state) => state.reducer.store.content)
    let menusToRedux = useAppSelector((state) => state.reducer.store.menus)
    let servicesToRedux = useAppSelector((state) => state.reducer.store.services)
    let tagsToRedux = useAppSelector((state) => state.reducer.store.tags)

    useEffect(() => {
        setName(nameToRedux);
    }, [nameToRedux]);

    useEffect(() => {
        setLocation(locationToRedux);
    }, [locationToRedux]);

    useEffect(() => {
        setContent(contentToRedux);
    }, [contentToRedux]);

    useEffect(() => {
        setMenus(menusToRedux);
    }, [menusToRedux]);

    useEffect(() => {
        setServices(servicesToRedux);
    }, [servicesToRedux]);

    useEffect(() => {
        setTags(tagsToRedux);
    }, [tagsToRedux]);



    const handleCopyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/store?id=${idToRedux ? idToRedux : ''}`)
            .then(() => {
                alert("Đã copy vào bộ nhớ tạm!");
            })
            .catch(err => {
                console.error('Có lỗi xảy ra khi copy: ', err);
            });
    }

    const handleChangeName = (value) => {
        setIsChangeName(true)
        dispatch(store.actions.onChangeName(value));
    }

    const handleChangeLocation = (value) => {
        setIsChangeLocation(true)
        dispatch(store.actions.onChangeLocation(value))
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4}>
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
                            // size="small"
                            helperText="Hạn chế việc đổi tên nếu không cần thiết"
                            onChange={(event) => handleChangeName(event.target.value)}
                        // fullWidth
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={8}></Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Stack direction={'column'} >
                        {/* <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                        >
                            Liên kết đến trang cửa hàng của bạn là
                        </Typography> */}
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Link href="#" underline="hover">
                                {`http://localhost:3000/store?id=${idToRedux ? idToRedux : ''}`}
                            </Link>
                            <IconButton onClick={() => handleCopyUrl()} aria-label="delete">
                                <ContentCopyIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Stack>
                    </Stack>

                </Grid>
                <Grid item xs={12} md={6} lg={8}></Grid>
                <Grid item xs={12} md={6} lg={4}>
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
                            // size="small"
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

