import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import checkin, { setQrcheckin } from '@/lib/features/checkinSlice';
import axios from "@/utils/axios";

const ManagerStore = () => {

    let dispatch = useAppDispatch();

    const nameToRedux = useAppSelector((state) => state.reducer.store.name)
    const locationToRedux = useAppSelector((state) => state.reducer.store.location)
    const contentToRedux = useAppSelector((state) => state.reducer.store.content)
    const menusToRedux = useAppSelector((state) => state.reducer.store.menus)
    const tagsToRedux = useAppSelector((state) => state.reducer.store.tags)

    let [haveStore, setHaveStore] = useState(false)

    //------------------------------------------------------------------------------------------//
    const getStorebyName = async (name) => {

        try {
            const response = await axios.get('/api/v1/manager/store', {
                params: { CS_Name: 'The cofffee hous' }
            });
            console.log('response', response);
            if (response && response.status === 0) {
                return response.data
            } else {
                console.log('Lỗi get');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }
    const updateStorebyId = async (name) => {

        try {
            const response = await axios.patch('/api/v1/manager/store', {
                CS_Id: 1,
                CS_Name: nameToRedux,
                CS_Location: locationToRedux,
                CS_Detail: contentToRedux
            });
            console.log('response', response);
            if (response && response.status === 0) {
                return response.data
            } else {
                console.log('Lỗi get');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }

    const createStore = async () => {

        try {
            const response = await axios.post('/api/v1/manager/store', {
                M_Id: 1,
                CS_Name: nameToRedux,
                CS_Location: locationToRedux,
                CS_Detail: contentToRedux,
                CS_ListMenu: menusToRedux,
                // Tag ?
            });
            console.log('response', response);
            if (response && response.status === 0) {
                return response.data
            } else {
                console.log('Lỗi tạo');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }
    const checkHaveStore = async () => {

        try {
            const response = await axios.post('/api/v1/manager/store-check', {
                M_Id: 1,
            });
            console.log('response', response);
            if (response && response.status === 0) {
                setHaveStore(true)

            } else {
                console.log('Lỗi tạo');
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }

    let list = [
        {
            M_Id: 1,
            M_Name: 'Coffee',
            M_Price: 50000
        },
        {
            M_Id: 2,
            M_Name: 'Coffee đá',
            M_Price: 55000
        },
    ]

    return { haveStore, createStore, getStorebyName, updateStorebyId, checkHaveStore }
}

export default ManagerStore;
