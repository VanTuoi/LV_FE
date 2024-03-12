'strict mode'

// Third-party
import * as React from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, Typography, Paper, useTheme, Box, Skeleton, MobileStepper } from '@mui/material';

// In the Project
import { height } from '@mui/system';
import { DashboardCard } from '@/app/(home)/components/shared/DashboardCard';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco Oakland Bay Bridge, United States',
    imgPath:
      'https://chuphinhmenu.com/wp-content/uploads/2023/06/concept-chup-anh-do-uong-2023-0004.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://chuphinhmenu.com/wp-content/uploads/2023/06/concept-chup-anh-do-uong-2023-0011.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://chuphinhmenu.com/wp-content/uploads/2023/06/concept-chup-anh-do-uong-2023-0013.jpg',
  },
  {
    label: 'Serbia',
    imgPath:
      'https://chuphinhmenu.com/wp-content/uploads/2023/06/concept-chup-anh-do-uong-2023-0002.jpg',
  },
];

function SwipeableTextMobileStepper() {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleImageLoad = (index) => {
    setActiveImageIndex(index);
  };

  return (
    // <DashboardCard>
    <Box sx={{ borderRadius: '10px' }}>
      <Box sx={{ minWidth: 1100, maxWidth: 1200, height: 'auto', flexGrow: 1, position: 'relative' }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          interval={5000}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Skeleton
                  // animation="wave"
                  variant="rectangular"
                >
                  <Box

                    zIndex={0}
                    component="img"
                    style={{ maxWidth: '100%' }}
                    sx={{
                      borderRadius: '2px',
                      width: 1200,
                      maxWidth: '100%',
                      height: 450,
                      display: 'block',
                      // width: 1200,
                      overflow: 'hidden',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                </Skeleton>

              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            '& .MuiMobileStepper-dots': {
              display: 'none' // Ẩn số lượng ảnh phía dưới
            }
          }}
          nextButton={
            <Button
              size="medium"
              variant="text"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              style={{ maxWidth: '45px', maxHeight: '45px', minWidth: '45px', minHeight: '45px' }}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Màu nền đậm hơn khi hover
                }
              }}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="medium"
              variant="text"
              onClick={handleBack}
              disabled={activeStep === 0}
              style={{ maxWidth: '45px', maxHeight: '45px', minWidth: '45px', minHeight: '45px' }}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Màu nền đậm hơn khi hover
                },
              }}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}

            </Button>
          }
        />
      </Box >
    </Box>
    // </DashboardCard>
  );
}

export default SwipeableTextMobileStepper;
