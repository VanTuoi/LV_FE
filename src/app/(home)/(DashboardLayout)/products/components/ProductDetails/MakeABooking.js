import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography, Divider, Stack } from '@mui/material';
import dynamic from 'next/dynamic'
import DashboardCard from '@/app/(home)/(DashboardLayout)/components/shared/DashboardCard';

import Time from './Components/Options/Time'

import People from './Components/Options/People'
import QrCode from './Components/QrCode'


const DateWithNoSSR = dynamic(() => import('./Components/Options/Date'), { ssr: false })

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

    const [activeStep, setActiveStep] = React.useState(0);
    const [isSelect, setIsSelect] = React.useState(true);
    const [isShow, setIsShow] = React.useState(false);

    const handleBook = () => {
        setIsShow(true)
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
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
            {isShow && <QrCode isShow={isShow} setIsShow={setIsShow}></QrCode>}
            {isSelect ? (
                <>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption">Bước cuối cùng</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        {renderStepContent(index)}
                                        <Box sx={{ mb: 0 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 0, mr: 1 }}
                                                >
                                                    Quay lại
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
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
