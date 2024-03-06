
// Third-party
import dynamic from 'next/dynamic'
import React, { useState } from 'react';
import {
    Typography, Divider, Stack, Box, Stepper,
    Step, StepLabel, StepContent, Button, Paper
} from '@mui/material';

// In the Project
import useBooking from '@/hook/user/useBooking'
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';

import Time from './Components/OptionsBooking/Time'
import People from './Components/OptionsBooking/People'
import QrCode from './Components/QrCode'
const DateWithNoSSR = dynamic(() => import('./Components/OptionsBooking/Date'), { ssr: false })


const steps = [
    {
        label: 'Lựa chọn ngày',
    },
    {
        label: 'Lựa chọn thời gian',
    },
    {
        label: 'Lựa chọn số lượng',
    },
];


export default function MakeABooking() {

    const { booking, checkTimeBooking } = useBooking()

    const [isShow, setIsShow] = useState(false);
    const [isSelect, setIsSelect] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [base64ImgQr, setBase64ImgQr] = useState(null);
    const [errorMesager, SeterrorMesager] = useState(null);


    const handleBook = async () => {
        let qrCode = await booking();
        if (qrCode) {
            SeterrorMesager(null)
            setBase64ImgQr(qrCode)
            setIsShow(true)
            handleReset()
        } else {
            SeterrorMesager('Xin lỗi, quá trình đặt bàn thực hiện không thành công, vui lòng thử lại sau ít phút nữa.')
        }
    };

    const handleNext = async (index) => {
        if (index === 1) {
            let check = await checkTimeBooking()
            if (check === true) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                SeterrorMesager(null)
            } else {
                SeterrorMesager('Thời gian giữa 2 lần đặt bàn phải cách nhau ít nhất 2 giờ')
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = (index) => {
        SeterrorMesager(null)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = (index) => {
        switch (index) {
            case 0:
                return <DateWithNoSSR></DateWithNoSSR>;
            case 1:
                return <Time></Time>
            case 2:
                return <People></People>
            default:
                return <Typography>Default content</Typography>;
        }
    };
    return (

        <DashboardCard DashboardCard title="">
            {isShow && <QrCode base64ImgQr={base64ImgQr} isShow={isShow} setIsShow={setIsShow}></QrCode>}
            {isSelect ? (
                <>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption"></Typography>
                                            ) : null
                                        }
                                    >
                                        <Typography variant="subtitle2">{step.label}</Typography>

                                    </StepLabel>
                                    <StepContent>
                                        {renderStepContent(index)}
                                        {index === 1 ? errorMesager && <Typography variant="subtitle2" sx={{ color: 'red', mt: 2, mb: 2 }}>{errorMesager}</Typography> : null}
                                        <Box sx={{ mb: 0 }}>
                                            <div>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={() => handleBack(index)}
                                                    sx={{ mt: 0, mr: 1 }}
                                                >
                                                    Quay lại
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleNext(index)}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 1 }}>
                                {!errorMesager && <Typography variant="subtitle2">Nhấn đặt bàn để hoàn thành</Typography>}
                                {errorMesager && <Typography variant="subtitle2" sx={{ color: 'red' }}>{errorMesager}</Typography>}
                                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                    Quay lại
                                </Button>
                                <Button variant="contained" onClick={handleBook} sx={{ mt: 1, mr: 1 }}>
                                    Đặt bàn
                                </Button>
                            </Paper>
                        )}
                    </Box>
                    <Divider sx={{ marginTop: '5px' }} />
                    <Typography variant="body1" align="justify" paragraph={true}>
                        {/*  */}
                    </Typography>
                </>
            ) : (
                <>

                    <Stack direction="column" spacing={0} alignItems="flex-start">
                        <Typography variant="h4" component="h4">Tìm kiếm 1 bàn</Typography>
                        <Divider sx={{ marginTop: '1px' }} />
                        <Typography variant="subtitle2">Đặt bàn miễn phí</Typography>
                    </Stack>
                    <Stack direction="column" spacing={0} alignItems="center">
                        <Button m={1} size='small' variant="outlined" onClick={() => setIsSelect(!isSelect)}>
                            Tìm một bàn
                        </Button>
                    </Stack>
                </>
            )}
        </DashboardCard>
    )
}
