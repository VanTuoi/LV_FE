
//Third-party
import { useEffect, useState } from "react";
import bookSlice, { } from '@/lib/features/bookingSlice'

// In the Project
import axios from "@/utils/axios";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

const useBooking = () => {

    const dispatch = useAppDispatch()


    let ID_User = useAppSelector((state) => state.reducer.user.info.U_Id)                    // Lấy ID user

    const [time, setTime] = useState(useAppSelector((state) => state.reducer.booking.time))
    const [date, setDate] = useState(useAppSelector((state) => state.reducer.booking.date))
    const [people, setPeople] = useState(useAppSelector((state) => state.reducer.booking.people))

    let peopleToRedux = useAppSelector((state) => state.reducer.booking.people)
    let timeToRedux = useAppSelector((state) => state.reducer.booking.time)
    let dateToRedux = useAppSelector((state) => state.reducer.booking.date)

    useEffect(() => {
        setPeople(peopleToRedux)
        setTime(timeToRedux)
        setDate(dateToRedux)
    }, [peopleToRedux, timeToRedux, dateToRedux]);


    const getTime = (value) => {
        setTime(value)
        dispatch(bookSlice.actions.setTime(value))
    }

    const getPeople = (value) => {
        setPeople(value)
        dispatch(bookSlice.actions.setPeoPle(value))
    }

    const getDate = (value) => {
        dispatch(bookSlice.actions.setDate(value))
    }

    const findIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            console.log("Your IP address is:", data.ip);
            return data.ip;
        } catch (error) {
            console.error("Unable to get IP address:", error);
            return null
        }
    };

    const booking = async (id) => {
        try {
            const timeString = time;
            const currentDate = new Date(date);
            const dateWithTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timeString.split(':'));
            const ip = await findIP();

            const response = await axios.post('/api/v1/user/create-a-booking', {
                RT_DateTimeArrival: dateWithTime.getTime(),
                U_Id: ID_User,
                CS_Id: id,
                RT_NumberOfParticipants: people,
                RT_Ip: ip | null,
            });

            console.log('response', response);
            if (response && response.status === 0) {
                return response.data;
            } else {
                console.log('Error', response);
                return null;
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null;
        }
    }

    const checkTimeBooking = async (id) => {
        // Chuỗi thời gian
        const timeString = time;
        const currentDate = new Date(date);
        const dateWithTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timeString.split(':'));

        const ip = await findIP();

        try {
            const response = await axios.post('/api/v1/user/check-time-a-booking', {
                RT_DateTimeArrival: dateWithTime.getTime(),
                CS_Id: id,
                U_Id: ID_User,
                RT_Ip: ip,
            })
            console.log('response', response);
            if (response && response.status === 0) {
                return true;
            }
            if (response && response.status === 1) {
                return 'Thời gian giữa 2 lần đặt bàn phải cách nhau ít nhất 2 giờ';
            }
            else {
                console.log('Error', response);
                return 'Có lỗi từ sever vui lòng thử lại sau ít phút'
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }

    return { time, date, people, getDate, getTime, getPeople, booking, checkTimeBooking }
}

export default useBooking
