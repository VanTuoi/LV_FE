import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import storeSlice from '@/lib/features/storeSlice';
import axios from "@/utils/axios";

const Store = () => {

    const dispatch = useAppDispatch()
    const [store, setStore] = useState();
    const [detail, setDetails] = useState();
    const [menus, seMenus] = useState();
    const [services, setServices] = useState();

    let maxPeopleAllow = useAppSelector((state) => state.reducer.store.maxPeople);
    let timeOpen = useAppSelector((state) => state.reducer.store.timeOpen);
    let timeClose = useAppSelector((state) => state.reducer.store.timeClose);

    //----------------------------------------------------------------------------------------------------------------------//
    const getStore = async (id) => {
        try {
            const response = await axios.get(`/api/v1/store/${id}`);
            console.log('Get store by ID response:', response);
            if (response && response.status === 0) {
                setStore(response.data);
                dispatch(storeSlice.actions.setMaxPeople(response.data.CS_MaxPeople))
                dispatch(storeSlice.actions.setTimeOpen(response.data.CS_TimeOpen))
                dispatch(storeSlice.actions.setTimeClose(response.data.CS_TimeClose))
            } else {
                console.log('Error getting store');
                return null;
            }
        } catch (error) {
            console.error('Error occurred while calling API to get store by ID:', error);
        }
    };
    const getDetail = async (id) => {

        try {
            const response = await axios.get('/api/v1/store/detail', {
                params: { CS_Id: id }
            });
            console.log('response', response);
            if (response && response.status === 0) {
                setDetails(response.data)
            } else {
                console.log('Lỗi get');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }
    const getMenus = async (id) => {

        try {
            const response = await axios.get('/api/v1/store/menus', {
                params: { CS_Id: id }
            });
            console.log('response', response);
            if (response && response.status === 0) {
                seMenus(response.data)
            } else {
                console.log('Lỗi get');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }
    const getServices = async (id) => {

        try {
            const response = await axios.get('/api/v1/store/services', {
                params: { CS_Id: id }
            });
            console.log('response', response);
            if (response && response.status === 0) {
                setServices(response.data)
            } else {
                console.log('Lỗi get services');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }

    const getMaxPeopleAllow = () => {
        return maxPeopleAllow
    }
    const getTimeOpen = () => {
        return timeOpen
    }
    const getTimeClose = () => {
        return timeClose
    }

    return {
        services, store, detail, menus, maxPeopleAllow,
        getMaxPeopleAllow, getTimeOpen, getTimeClose, getStore, getDetail, getMenus, getServices
    }
}

export default Store;
