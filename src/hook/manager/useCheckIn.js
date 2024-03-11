import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch } from "@/lib/hooks";
import checkin, { setQrcheckin } from '@/lib/features/checkinSlice';
import axios from "@/utils/axios";

const CheckIn = () => {

    let id = null;

    let dispatch = useAppDispatch();

    const findIdtoQr = async (objQR) => {
        if (objQR && objQR.data !== '') {
            const jsonQR = JSON.parse(objQR.data);
            let coverToId = jsonQR.CS_Id;
            if (coverToId !== id) {
                id = coverToId;
                checkInbyQr(coverToId); // Gọi checkInbyQr với ID mới
            }
        }
    };

    const checkInbyQr = async (qrId) => {

        try {
            const response = await axios.post('/api/v1/manager/check-in', {
                RT_Id: qrId
            });
            if (response && response.status === 0) {
                if (response.data !== null) {
                    console.log('checkInbyQr 1', response.message);
                    let data = {
                        name: response.data.detail && response.data.detail.U_Id !== null ? response.data.detail.U_Id : 'Khách vãng lai',
                        timeCome: dayjs(response.data.detail.RT_DateTimeArrival).format('HH:mm DD/MM/YYYY'),
                        timeCheckIn: response.data.timeCheckIn !== null ? dayjs(response.data.timeCheckIn).format('HH:mm DD/MM/YYYY') : '',
                        number: response.data.detail.RT_NumberOfParticipants,
                        status: response.message
                    };
                    dispatch(checkin.actions.setQrcheckin(data))
                } else {
                    console.log('checkInbyQr 2', response.message, response.data);
                    let data = {
                        name: '',
                        timeCome: '',
                        timeCheckIn: '',
                        number: '',
                        status: response.message
                    };
                    dispatch(checkin.actions.setQrcheckin(data))
                }
            } else {
                console.log('Lỗi lấy dữ liệu', response);
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API trong chức năng checkin: ', error);
        }
    }

    return { checkInbyQr, findIdtoQr }
}

export default CheckIn;
