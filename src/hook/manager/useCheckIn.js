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
        const response = await axios.post('/api/v1/manager/check-in', {
            RT_Id: qrId
        });
        if (response && response.errorCode == '0') {
            if (response.errorMessage !== '' && response.data !== null) {
                console.log('1', response.errorMessage);
                let data = {
                    name: response.data.U_Id ? response.data.U_Id : 'Khách vãng lai',
                    timeCome: dayjs(response.data.RT_DateTimeArrival).format('HH:mm DD/MM/YYYY'),
                    number: response.data.RT_NumberOfParticipants,
                    status: response.errorMessage
                };
                dispatch(checkin.actions.setQrcheckin(data))
            } else {
                console.log('2', response.errorMessage, response.data);
                let data = {
                    name: '',
                    timeCome: '',
                    number: '',
                    status: response.errorMessage
                };
                dispatch(checkin.actions.setQrcheckin(data))
            }
        } else {
            console.log('Lỗi lấy dữ liệu', response);
        }
    }

    return { checkInbyQr, findIdtoQr }
}

export default CheckIn;
