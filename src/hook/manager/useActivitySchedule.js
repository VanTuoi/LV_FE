
// Third-party
import { useState } from "react";

// In the Project
import axios from "@/utils/axios";
import { useAppDispatch } from "@/lib/hooks";

const Schedule = () => {

    const dispatch = useAppDispatch()

    const [uniqueDays, setUniqueDays] = useState([])
    const [frequency, setFrequency] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Chỉ trả về ngày
    };
    const getHolidays = async (month) => {
        const time = new Date(month).getTime();
        try {
            const response = await axios.get('/api/v1/manager/holiday', {
                params: { AS_Holiday: time },
                timeout: 10000 // Thiết lập timeout là 10 giây
            });
            if (response && response.data.errorCode == '0') {
                let list = response.data.data; // Giả sử dữ liệu trả về nằm trong response.data.data
                setUniqueDays(Array.from(new Set(list.map(item => formatDate(item.AS_Holiday)))));
                setFrequency(list.reduce((acc, item) => {
                    const day = formatDate(item.AS_Holiday);
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
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }


    return { getHolidays, uniqueDays, frequency }
}

export default Schedule
