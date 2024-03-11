
//Third party
import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Typography, Box, Button, Stack } from '@mui/material';
import { IconAperture, IconApertureOff } from "@tabler/icons-react";

// In the Project
import CheckIn from '@/hook/manager/useCheckIn'

const DESIRED_FPS = 10; // Đặt FPS
const intervalTime = 1000 / DESIRED_FPS;

function Scanner() {

  const { findIdtoQr } = CheckIn();

  const streamRef = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [outputMessage, setOutputMessage] = useState(null);
  const [outputData, setOutputData] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false) //Theo dõi trạng thái của webcam

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        videoRef.current.play();
        setIsCameraOn(true);
        streamRef.current = stream;
        requestAnimationFrame(tick);
      }
    } catch (error) {
      console.error('Error accessing video stream:', error.message);
    }
  };

  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        setOutputMessage('Tìm thấy mã QR');
        findIdtoQr(code)
        setOutputData(code.data);
        // Vẽ hộp giới hạn mã QR
        context.strokeStyle = '#008000';
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        context.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        context.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        context.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        context.lineTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        context.stroke();
      } else {
        setOutputMessage('Vui lòng đưa mã QR vào khung hình');
        setOutputData('');
      }
    }
    setTimeout(() => {
      requestAnimationFrame(tick);
    }, intervalTime);
  };


  const toggleCamera = () => {
    if (isCameraOn) {
      // Nếu camera đang bật, tắt nó
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop(); // Dừng tất cả các tracks
        });
        streamRef.current = null; // Đặt lại streamRef sau khi tắt camera

        if (videoRef.current) {
          videoRef.current.srcObject = null; // Xóa tham chiếu từ video element đến stream
        }
      }
      setIsCameraOn(false);
    } else {
      initializeCamera();
    }
  };

  useEffect(() => {
    initializeCamera();
    return () => {
    };
  }, []);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      mt={1}
    >
      {/* <Typography variant='h5'>Trình quét mã QR</Typography> */}
      <Box
        style={{
          position: 'relative',
          width: '500px',
          height: '400px',
          margin: 'auto',
          overflow: 'hidden'
        }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            borderRadius: '2px'
          }}></video>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0'
          }}></canvas>
        {isCameraOn
          && <Box
            style={{
              borderRadius: '3px',
              position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -30%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px'
            }}>
            {outputMessage}
          </Box>}
      </Box>
      <Button onClick={() => toggleCamera()} variant="contained" startIcon={isCameraOn !== true ? <IconAperture /> : <IconApertureOff />}>
        {isCameraOn == true ? 'Tắt' : 'Mở'}
      </Button>
      {/* <Typography variant='h6'>Nội dung {outputData}</Typography> */}
    </Stack>
  );
}

export default Scanner;
