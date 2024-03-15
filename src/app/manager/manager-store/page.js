'use client'
//Third-party
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Grid, Stack, Button } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// In The Project
import PageContainer from '@/app/manager/components/container/PageContainer';
import Profile from '@/app/manager/manager-store/components/Profile'
import Details from '@/app/manager/manager-store/components/EditPageDetails'
import TableMenu from '@/app/manager/manager-store/components/Menu'
import TableServices from '@/app/manager/manager-store/components/Services'
import useControllerStore from '@/hook/manager/useControllerStore'

const ManagerStore = () => {

    const { idToDB, nameToDB, detailToDB, locationToDB, menusToDB, servicesToDB, haveStore,
        setNameToDB, setDetailToDB, setLocationToDB, setMenusToDB, setServicesToDB,
        getFullStore, checkHaveStore, createStore, updateStore
    } = useControllerStore()

    let [have, setHave] = useState(false)           // Check có cửa hàng không
    let [isShow, setIsShow] = useState(false)
    const [open, setOpen] = useState(false);        // Mở Dialog thông báo

    useEffect(() => {
        setHave(checkHaveStore())
    }, [])

    useEffect(() => {
        setHave(haveStore)
        setIsShow(haveStore)
        if (haveStore === true)
            getFullStore()
        else {
            setOpen(true)
        }
    }, [haveStore])

    const handleClickNewStore = () => {
        setIsShow(true)
        setHave(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

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
                        <Profile id={idToDB} name={nameToDB} setNameToDB={setNameToDB} location={locationToDB} setLocationToDB={setLocationToDB} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TableMenu menus={menusToDB} setMenusToDB={setMenusToDB} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TableServices services={servicesToDB} setServicesToDB={setServicesToDB} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Details details={detailToDB} setDetailToDB={setDetailToDB} />
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
                    <Dialog
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Tạo một cửa hàng ?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Bạn cần phải tạo một cửa hàng để có thể sử dụng các chức năng của hệ thống, mở một cửa hàng ngay nhé
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color='error'>
                                Để khi khác
                            </Button>
                            <Button variant='contained' onClick={handleClickNewStore}>Tất nhiên rồi</Button>
                        </DialogActions>
                    </Dialog>
                    {!open && <Button variant='text' onClick={() => handleClickNewStore()}> Tạo mới ngay</Button>}
                </Stack>
            )
            }
        </PageContainer >
    );
}
export default ManagerStore
