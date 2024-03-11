
//Third-party
import { useState } from "react";
import axios from "@/utils/axios";

// Redux
import { useAppDispatch } from "@/lib/hooks";

// In the Project


const useActivitySchedule = () => {

    const [uniqueDays, setUniqueDays] = useState([])
    const [frequency, setFrequency] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Chỉ trả về ngày
    };
    const getListBooking = async (month) => {
        const time = new Date(month).getTime()
        try {
            const response = await axios.get('/api/v1/manager/booking-schedule', {
                params: { month: time }
            });
            if (response && response.errorCode == '0') {
                let list = response.data;
                setUniqueDays(Array.from(new Set(list.map(item => formatDate(item.RT_BookingDate)))));
                setFrequency(list.reduce((acc, item) => {
                    const day = formatDate(item.RT_BookingDate);
                    if (acc[day]) {
                        acc[day] += 1;
                    } else {
                        acc[day] = 1;
                    }
                    return acc;
                }, {}));
            } else {
                console.log('Lỗi lấy dữ liệu', response);
            }
        } catch (error) {
            // Xử lý lỗi, ví dụ timeout hoặc các lỗi khác
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }

    return { getListBooking, uniqueDays, frequency }
}

export default useActivitySchedule
