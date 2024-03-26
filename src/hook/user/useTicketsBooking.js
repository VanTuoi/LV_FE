
//Third-party
import dayjs from "dayjs";
import { useState } from "react";

// In the Project
import axios from "@/utils/axios";

const useTicketsBooking = () => {

    const [statusSave, setStatusSave] = useState(false)

    const [bookingTickets, setBookingTickets] = useState([])

    const getStatusSaveStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/user/status-save-store', {
                CS_Id: id
            })
            console.log('response', response);
            if (response && response.status === 0) {
                setStatusSave(true)
            } else {
                setStatusSave(false)
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }
    const getAllTicketsBooking = async () => {
        try {
            const response = await axios.post('/api/v1/user/all-booking')
            console.log('response', response);
            if (response && response.status === 0) {
                setBookingTickets(response.data)
                return true
            } else {
                setBookingTickets(null)
                return false
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }
    const saveStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/user/save-store', {
                CS_Id: id
            })
            console.log('response', response);
            if (response && response.status === 0) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }
    const unSaveStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/user/delete-store', {
                CS_Id: id
            })
            console.log('response', response);
            if (response && response.status === 0) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            console.log('Lỗi từ server', error);
            return null
        }
    }
    return {
        bookingTickets, getAllTicketsBooking, setBookingTickets
    }
}

export default useTicketsBooking
