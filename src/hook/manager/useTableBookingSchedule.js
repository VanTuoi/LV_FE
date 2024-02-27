import { useState } from "react";

import axios from "@/utils/axios";
import { treeData } from '@/utils/DSQuanHuyen'
import getCurrentDateTime from "@/utils/getCurrentDateTime";

import { useAppDispatch } from "@/lib/hooks";
import { useDispatch } from 'react-redux';

import bookSlice, { } from '@/lib/features/book/bookSlice'

import { userServices } from '@/services/index'
import { useRouter } from 'next/navigation'
const useTableBookingSchedule = () => {

    const dispatch = useDispatch()

    const [uniqueDays, setUniqueDays] = useState([])
    const [listDays, setListDays] = useState([])
    const [frequency, setFrequency] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Chỉ trả về ngày
    };
    const getListBooking = async (month) => {
        const time = new Date(month).getTime()
        const response = await axios.get('/api/v1/table-booking-schedule', {
            params: { month: time }
        });
        setUniqueDays(Array.from(new Set(response.data.map(item => formatDate(item.RT_BookingDate)))));
        setFrequency(response.data.reduce((acc, item) => {
            const day = formatDate(item.RT_BookingDate);
            if (acc[day]) {
                acc[day] += 1;
            } else {
                acc[day] = 1;
            }
            return acc;
        }, {}));
    }


    return { getListBooking, uniqueDays, frequency }
}

export default useTableBookingSchedule
