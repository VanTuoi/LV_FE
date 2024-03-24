'use client'
//Third-party
import { Grid, Box } from '@mui/material';

// In the Project
import PageContainer from '@/app/(home)/components/container/PageContainer';
import ImageAvatars from '@/app/(home)/user/components/Avatar';
import NavOptions from '@/app/(home)/user/components/NavOptions';
import Options from '@/app/(home)/user/components/Options';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
const Profile = () => {

    const [valueSelect, setValueSelect] = useState('detail_account');

    const handleSelectOptions = (value) => {
        setValueSelect(value)
    }

    return (
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
    )
}

export default Profile;
