import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "@/utils/axios";

const Store = () => {

    const [store, setStore] = useState();
    const [detail, setDetails] = useState();
    const [menus, seMenus] = useState();

    //------------------------------------------------------------------------------------------//
    const getStorebyId = async (id) => {

        try {
            const response = await axios.get(`/api/v1/store/${id}`);
            console.log('response', response);
            if (response && response.status === 0) {
                setStore(response.data)
            } else {
                console.log('Lỗi get');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }
    const getDetailbyId = async (id) => {

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
    const getMenusbyId = async (id) => {

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

    return { store, detail, menus, getStorebyId, getDetailbyId, getMenusbyId }
}

export default Store;
