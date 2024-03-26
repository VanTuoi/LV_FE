'use client'
//Third-party
import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
// In the Project
import useSessionStorage from '@/hook/useSessionStorage/useSessionStorage';
import PageContainer from '@/app/(home)/components/container/PageContainer';
import ImageAvatars from '@/app/(home)/user/components/Avatar';
import NavOptions from '@/app/(home)/user/components/NavOptions';
import Options from '@/app/(home)/user/components/Options';
import Divider from '@mui/material/Divider';



const Profile = () => {

    const [valueSelect, setValueSelect] = useState('detail_account');

    const handleSelectOptions = (value) => {
        setValueSelect(value)
    }


    const { GetItemSessionStorage } = useSessionStorage()

    const router = useRouter()
    let [isLoading, setIsLoading] = useState(false)

    let isLogin = GetItemSessionStorage('U_name') // Check login
    useEffect(() => {
        if (isLogin === null || isLogin === '') {
            // router.push('/authentication/login')
        } else {
            setIsLoading(true)
        }
    }, [isLogin])


    return (
        isLoading ?
            <PageContainer title='Tài khoản' description="">
                <Box sx={{ marginLeft: '100px', marginRight: '100px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <ImageAvatars />
                            <Divider sx={{ marginTop: '20px', width: '100%' }}></Divider>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <NavOptions valueSelect={valueSelect} handleSelectOptions={handleSelectOptions} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={9}>
                            <Options valueSelect={valueSelect} />
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer >
            :
            <>
                Vui lòng đăng nhập
            </>
    )
}

export default Profile;
