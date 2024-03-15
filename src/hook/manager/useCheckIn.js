import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import checkin, { setQrcheckin } from '@/lib/features/checkinSlice';
import axios from "@/utils/axios";

const CheckIn = () => {

    let id = null;
    const manager_Id = useAppSelector(state => state.reducer.manager.info.M_Id);

    let dispatch = useAppDispatch();

    const findIdtoQr = async (objQR) => {
        if (objQR && objQR.data !== '') {
            // Kiểm tra xem chuỗi có đúng định dạng JSON hay không
            const isJSONString = /^[\],:{}\s]*$/.test(
                objQR.data
                    .replace(/\\["\\\/bfnrtu]/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
            );
            if (isJSONString) {
                try {
                    const jsonQR = JSON.parse(objQR.data);
                    let coverToId = jsonQR.CS_Id;
                    if (coverToId !== id) {
                        id = coverToId;
                        checkInbyQr(coverToId); // Gọi checkInbyQr với ID mới
                        return null
                    }
                } catch (error) {
                    return 'Lỗi khi phân tích dữ liệu từ mã QR'
                }
            } else {
                return 'Mã QR không đúng định dạng'
            }
        }
    };

    const checkInbyQr = async (qrId) => {

        try {
            const response = await axios.post('/api/v1/manager/check-in', {
                RT_Id: qrId,
                manager_Id: manager_Id
            });
            if (response && response.status === 0) {
                if (response.data !== null) {
                    console.log('checkInbyQr 1', response);

                    let name = 'Khách vãng lai';
                    if (response.data.detail && response.data.detail.User && response.data.detail.User.U_Name) name = response.data.detail.User.U_Name

                    let data = {
                        name: name,
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
