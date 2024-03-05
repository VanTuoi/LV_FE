import { useEffect, useState } from "react";

import axios from "@/utils/axios";
import { treeData } from '@/utils/DSQuanHuyen'
import getCurrentDateTime from "@/utils/getCurrentDateTime";

import { useAppDispatch } from "@/lib/hooks";
import { useDispatch } from 'react-redux';

import bookSlice, { } from '@/lib/features/booking/bookingSlice'

import { userServices } from '@/services/index'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks';
const useSearch = () => {

    const dispatch = useDispatch()

    const currentDate = new Date();

    const [time, setTime] = useState(useAppSelector((state) => state.reducer.booking.time))
    const [date, setDate] = useState(useAppSelector((state) => state.reducer.booking.date))
    const [people, setPeople] = useState(useAppSelector((state) => state.reducer.booking.people))

    let a = useAppSelector((state) => state.reducer.booking.people)
    let b = useAppSelector((state) => state.reducer.booking.time)
    let c = useAppSelector((state) => state.reducer.booking.date)
    useEffect(() => {
        setPeople(a)
        setTime(b)
        setDate(c)
    }, [a, b, c]);

    const getTime = (value) => {
        setTime(value)
        dispatch(bookSlice.actions.setTime(value))
        // console.log('time: ', time);
    }
    const getPeople = (value) => {
        setPeople(value)
        dispatch(bookSlice.actions.setPeoPle(value))
        // console.log('people: ', people);
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
        }
    };

    const Booking = async () => {
        try {
            const timeString = time;
            const currentDate = new Date(date);
            const dateWithTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timeString.split(':'));
            const ip = await findIP();

            const response = await axios.post('/api/v1/user/create-a-booking', {
                RT_DateTimeArrival: dateWithTime.getTime(),
                U_Id: null,
                CS_Id: '3',
                RT_NumberOfParticipants: people,
                RT_Ip: ip,
            });

            console.log('response', response);
            if (response && response.errorCode == '0') {
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

    const CheckTimeBooking = async () => {
        // Chuỗi thời gian
        const timeString = time;
        const currentDate = new Date(date);
        const dateWithTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timeString.split(':'));
        try {
            const response = await axios.post('/api/v1/user/check-time-a-booking', {
                RT_DateTimeArrival: dateWithTime.getTime(),
                CS_Id: '3',
                U_Id: '1',
            })
            // console.log('response', response);
            if (response && response.errorCode == '0') {
                return response.data;
            }
            else {
                console.log('Error', response);
                return null
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }

    return { getDate, getTime, getPeople, Booking, CheckTimeBooking }
}

export default useSearch
