import { useState, useCallback } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'
import axios from "@/utils/axios";

const ConTrollerStore = () => {

    const dispatch = useAppDispatch()

    let [haveStore, setHaveStore] = useState(false)          // Kiểm tra xem có cửa hàng

    const [isChangeName, setIsChangeName] = useState(false);
    const [isChangeDetail, setIsChangeDetail] = useState(false);
    const [isChangeLocation, setIsChangeLocation] = useState(false);
    const [isChangeMenus, setIsChangeMenus] = useState(false);
    const [isChangeServices, setIsChangeServices] = useState(false);
    const [isChangeTags, setIsChangeTags] = useState(false);

    const nameToRedux = useAppSelector((state) => state.reducer.store.name)
    const locationToRedux = useAppSelector((state) => state.reducer.store.location)
    const contentToRedux = useAppSelector((state) => state.reducer.store.content)
    const menusToRedux = useAppSelector((state) => state.reducer.store.menus)
    const servicesToRedux = useAppSelector((state) => state.reducer.store.services)
    const tagsToRedux = useAppSelector((state) => state.reducer.store.tags)

    const checkHaveStore = async () => {
        try {
            const response = await axios.post('/api/v1/store/check-store', {
                M_Id: 28,
            });
            console.log('response', response);
            if (response && response.status === 0) {
                setHaveStore(response.data.have)
            } else {
                setHaveStore(false)
            }
        } catch (error) {
            setHaveStore(false)
            console.error('Đã xảy ra lỗi khi gọi API kiểm tra store', error);
        }
    }

    const getFullStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/store/m-store-full', {
                M_Id: 28
            });
            if (response && response.status === 0) {
                dispatch(store.actions.onChangeId(response.data.CS_Id))
                dispatch(store.actions.onChangeName(response.data.CS_Name))
                dispatch(store.actions.onChangeLocation(response.data.CS_Location))
                dispatch(store.actions.onChangeContent(response.data.CS_Detail))
                dispatch(store.actions.onChangeMenus(response.data.Menus))
                dispatch(store.actions.onChangeServices(response.data.Services))
                dispatch(store.actions.onChangeTags(response.data.Tags))
            } else {
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API lấy full thông tin cửa hàng ', error);
        }
    }

    const createStore = async () => {
        try {
            const response = await axios.post('/api/v1/store/m-store', {
                Manager_Id: 28,
                CS_Name: nameToRedux,
                CS_Location: locationToRedux,
                CS_Detail: contentToRedux,
                CS_ListMenu: menusToRedux,
                CS_ListServices: servicesToRedux,
                // Tag ?
            });
            console.log('response', response);
            if (response && response.status === 0) {
                return true
            } else {
                console.log('Lỗi tạo cửa hàng');
                return false
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        }
    }

    const updateStore = async () => {
        try {
            const response = await axios.patch('/api/v1/store/m-store', {
                Manager_Id: 28,
                CS_Name: nameToRedux,
                CS_Location: locationToRedux,
                CS_Detail: contentToRedux,
                CS_ListMenus: menusToRedux,
                CS_ListServices: servicesToRedux,

            });
            if (response && response.status === 0) {
                console.log('Cập nhật thành công', response);
                return true
            } else {
                console.log('Không tìm thấy response hợp lệ', response);
                return false
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API cập nhật cửa hàng ', error);
        }
    }



    return {
        setIsChangeName, setIsChangeDetail, setIsChangeLocation, setIsChangeMenus, setIsChangeServices, setIsChangeTags, getFullStore, updateStore,
        haveStore, createStore, checkHaveStore
    }
}

export default ConTrollerStore;
