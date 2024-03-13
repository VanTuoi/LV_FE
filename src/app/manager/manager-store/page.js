'use client'
//Third-party
import React, { useEffect, useState } from 'react';
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// In The Project
import useControllerStore from '@/hook/manager/useControllerStore'
import PageContainer from '@/app/manager/components/container/PageContainer';
import Proflie from './components/Profile'
import EditPageDetails from './components/EditPageDetails'

const ManagerStore = () => {

    const { haveStore, checkHaveStore, getFullStore, createStore, updateStore } = useControllerStore()

    let [have, setHave] = useState(false)

    let [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setHave(haveStore)
        setIsShow(haveStore)
        if (haveStore === true) getFullStore()
    }, [haveStore])

    useEffect(() => {
        setHave(checkHaveStore())
    }, [])

    const handleClickNewStore = () => {
        setIsShow(true)
        setHave(false)
    }

    const handleUpdate = async () => {
        let status = await updateStore()
        status === true ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
    }

    const handleCreateStore = async () => {
        let status = await createStore()
        status === true ? toast.success('Tạo mới cửa hàng thành công') : toast.error('Tạo mới cửa hàng thất bại')
    }

    return (
        <PageContainer title="Quản lý thông tin cửa hàng" description="this is manager store">
            {isShow === true ? (
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={12}>
                        <Proflie />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <EditPageDetails />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                            <Button variant="outlined" color="error">
                                Hủy
                            </Button>
                            {have === true ? (<Button variant="contained"
                                onClick={() => handleUpdate()}
                            >
                                Lưu lại
                            </Button>
                            ) : (<Button variant="contained"
                                onClick={() => handleCreateStore()}
                            >
                                Tạo mới
                            </Button>)
                            }
                        </Stack>
                    </Grid>
                </Grid>
            ) : (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Typography variant="h6" fontWeight={400} >
                        Rất tiếc, bạn chưa quản lý cửa hàng
                    </Typography>
                    <Button variant='outlined' onClick={() => handleClickNewStore()}>
                        Mở một cửa hàng ngay bây giờ
                    </Button>
                </Stack>
            )
            }
        </PageContainer>
    );
}
export default ManagerStore
