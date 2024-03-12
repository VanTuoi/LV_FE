import { useState } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'
import axios from "@/utils/axios";

const ConTrollerStore = () => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState();
    const [detail, setDetails] = useState();
    const [menus, seMenus] = useState();
    const [services, setServices] = useState();
    const [tags, setTags] = useState();

    const getFullStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/store/m-store-full', {
                M_Id: 17
            });
            console.log('response getFullStore', response);
            if (response && response.status === 0) {
                dispatch(store.actions.onChangeName(response.data.CS_Name))
                dispatch(store.actions.onChangeLocation(response.data.CS_Location))
                dispatch(store.actions.onChangeContent(response.data.CS_Detail))
                dispatch(store.actions.onChangeMenus(response.data.Menus))
                dispatch(store.actions.onChangeServices(response.data.Services))
                dispatch(store.actions.onChangeTags(response.data.Tags))

                // setStore({
                //     CS_Id: response.data.CS_Id,
                //     CS_Name: response.data.CS_Name,
                //     CS_Location: response.data.CS_Location,
                // })
                // setDetails(response.data.CS_Detail)
                // seMenus(response.data.Menus)
                // setServices(response.data.Services)
                // setTags(response.data.Tags)

            } else {
                return null
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API lấy full thông tin cửa hàng ', error);
        }
    }

    return { services, name, detail, menus, tags, getFullStore }
}

export default ConTrollerStore;
