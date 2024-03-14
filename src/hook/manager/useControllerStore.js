import { useState, useCallback } from "react";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'
import axios from "@/utils/axios";

const ConTrollerStore = () => {

    const dispatch = useAppDispatch()

    let [haveStore, setHaveStore] = useState(false)          // Kiểm tra xem có cửa hàng

    let infoToRedux = useAppSelector((state) => state.reducer.manager.info)

    const [nameToDB, setNameToDB] = useState('');
    const [detailToDB, setDetailToDB] = useState('');
    const [locationToDB, setLocationToDB] = useState('');
    const [menusToDB, setMenusToDB] = useState([]);
    const [servicesToDB, setServicesToDB] = useState([]);
    const [tagsToDB, setTagsToDB] = useState([]);

    const nameToRedux = useAppSelector((state) => state.reducer.store.name)
    const locationToRedux = useAppSelector((state) => state.reducer.store.location)
    const contentToRedux = useAppSelector((state) => state.reducer.store.content)
    const menusToRedux = useAppSelector((state) => state.reducer.store.menus)
    const servicesToRedux = useAppSelector((state) => state.reducer.store.services)
    const tagsToRedux = useAppSelector((state) => state.reducer.store.tags)


    // let idToRedux = useAppSelector((state) => state.reducer.store.id)
    // let nameToRedux = useAppSelector((state) => state.reducer.store.name)
    // let locationToRedux = useAppSelector((state) => state.reducer.store.location)
    // let contentToRedux = useAppSelector((state) => state.reducer.store.content)
    // let menusToRedux = useAppSelector((state) => state.reducer.store.menus)
    // let servicesToRedux = useAppSelector((state) => state.reducer.store.services)
    // let tagsToRedux = useAppSelector((state) => state.reducer.store.tags)

    const checkHaveStore = async () => {
        if (infoToRedux && infoToRedux.M_Id !== null && infoToRedux.M_Id !== '') {
            try {
                const response = await axios.post('/api/v1/store/check-store', {
                    M_Id: infoToRedux.M_Id,
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
        else {
            setHaveStore(false)
        }
    }

    const getFullStore = async (id) => {
        if (infoToRedux && infoToRedux.M_Id !== null && infoToRedux.M_Id !== '') {
            try {
                const response = await axios.post('/api/v1/store/m-store-full', {
                    M_Id: infoToRedux.M_Id,
                });
                if (response && response.status === 0) {
                    // dispatch(store.actions.onChangeId(response.data.CS_Id))
                    // dispatch(store.actions.onChangeName(response.data.CS_Name))
                    // dispatch(store.actions.onChangeLocation(response.data.CS_Location))
                    // dispatch(store.actions.onChangeContent(response.data.CS_Detail))
                    // dispatch(store.actions.onChangeMenus(response.data.Menus))
                    // dispatch(store.actions.onChangeServices(response.data.Services))
                    // dispatch(store.actions.onChangeTags(response.data.Tags))

                } else {
                    return null
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gọi API lấy full thông tin cửa hàng ', error);
            }
        } else {
            console.error('Không có thông tin id manager')
        }

    }

    const createStore = async () => {
        if (infoToRedux && infoToRedux.M_Id !== null && infoToRedux.M_Id !== '') {
            try {
                const response = await axios.post('/api/v1/store/m-store', {
                    M_Id: infoToRedux.M_Id,
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
        } else {
            return false
        }
    }

    const updateStore = async () => {
        if (infoToRedux && infoToRedux.M_Id !== null && infoToRedux.M_Id !== '') {
            try {
                const response = await axios.patch('/api/v1/store/m-store', {
                    M_Id: infoToRedux.M_Id,
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
        } else {
            return false
        }
    }


    return {
        setNameToDB, setDetailToDB, setLocationToDB, setMenusToDB, setServicesToDB,
        nameToDB, detailToDB, locationToDB, menusToDB, servicesToDB, getFullStore, updateStore,
        haveStore, createStore, checkHaveStore
    }
}

export default ConTrollerStore;
