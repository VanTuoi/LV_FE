
// Third-party
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    Typography, Divider, Stack, Box, Stepper,
    Step, StepLabel, StepContent, Button, Paper
} from '@mui/material';

// In the Project
import useBooking from '@/hook/user/useBooking'
import DashboardCard from '@/app/(home)/components/shared/DashboardCard';
import ChooseTime from '@/app/(home)/store/components/storeDetails/MakeTheBooking/ChooseTime'
import ChoosePeople from '@/app/(home)/store/components/storeDetails/MakeTheBooking/ChoosePeople'
const ChooseDate = dynamic(() => import('@/app/(home)/store/components/storeDetails/MakeTheBooking/ChooseDate'), { ssr: false })
import QrCode from '@/app/(home)/store/components/storeDetails/MakeTheBooking/QrCode'
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

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


export default function MakeTheBooking(props) {

    const { id } = props            // ID của cửa hàng

    const { time, date, people, booking, checkTimeBooking } = useBooking()

    const [dateformat, setDateformat] = useState(dayjs())

    useEffect(() => {
        setDateformat(dayjs(date).format('DD/MM/YYYY'))
    }, [date]);
    // const 

    const [isShow, setIsShow] = useState(false);
    const [isSelect, setIsSelect] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [base64ImgQr, setBase64ImgQr] = useState(null);
    const [errorMesager, SeterrorMesager] = useState(null);


    const handleBook = async () => {
        let qrCode = await booking(id);
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
            let check = await checkTimeBooking(id)
            if (check === true) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                SeterrorMesager(null)
            } else {
                SeterrorMesager(check)
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
                return <ChooseDate></ChooseDate>;
            case 1:
                return <ChooseTime></ChooseTime>
            case 2:
                return <ChoosePeople></ChoosePeople>
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
                                                    {index === steps.length - 1 ? 'Tiếp theo' : 'Tiếp theo'}
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 1 }}>
                                {!errorMesager &&
                                    <>
                                        <Typography variant="subtitle2">Thông tin đặt bàn của bạn là: </Typography>
                                        <Stack sx={{ marginLeft: '10px', backgroundColor: '#e1fee6', padding: '10px', borderRadius: '5px' }}>
                                            <Typography variant="subtitle2">Ngày đặt: {dateformat}</Typography>
                                            <Typography variant="subtitle2">Giờ đặt: {time}</Typography>
                                            <Typography variant="subtitle2">Số lượng: {people} người</Typography>
                                        </Stack>

                                    </>
                                }
                                {errorMesager && <Typography variant="subtitle2" sx={{ color: 'red' }}>{errorMesager}</Typography>}
                                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                    Quay lại
                                </Button>
                                <Button variant="contained" onClick={handleBook} sx={{ mt: 1, mr: 1 }}>
                                    Xác nhận
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
