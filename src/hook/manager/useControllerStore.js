import dayjs from 'dayjs';
import { useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import managerSlice from '@/lib/features/managerSlice'
import axios from "@/utils/axios";

const ConTrollerStore = () => {

    let dispatch = useAppDispatch()

    let Manager_ID = useAppSelector((state) => state.reducer.manager.info.M_Id)     // Lấy ID Manager

    let [haveStore, setHaveStore] = useState(false)          // Kiểm tra xem có cửa hàng

    const [idToDB, setIdToDB] = useState('');
    const [nameToDB, setNameToDB] = useState('');
    const [detailToDB, setDetailToDB] = useState('');
    const [locationToDB, setLocationToDB] = useState('');
    const [maxPeopleToDB, setMaxPeopleToDB] = useState(1);
    const [timeOpenToDB, setTimeOpenToDB] = useState(dayjs("07:00:00", "HH:mm:ss"));
    const [timeCloseToDB, setTimeCloseToDB] = useState(dayjs("22:00:00", "HH:mm:ss"));
    const [menusToDB, setMenusToDB] = useState([]);
    const [servicesToDB, setServicesToDB] = useState([]);
    const [tagsToDB, setTagsToDB] = useState([]);

    const checkHaveStore = async () => {
        console.log('Manager_ID', Manager_ID);
        if (Manager_ID !== null && Manager_ID !== '') {
            try {
                const response = await axios.post('/api/v1/store/check-store', {
                    M_Id: Manager_ID,
                });
                console.log('Successfully checked store:', response); // Thay đổi nội dung console.log
                if (response && response.status === 0) {
                    setHaveStore(true);
                } else {
                    setHaveStore(false);
                }
            } catch (error) {
                setHaveStore(false);
                console.error('Error occurred while checking store:', error); // Thay đổi nội dung console.error
            }
        } else {
            setHaveStore(false);
        }
    };
    const getFullStore = async () => {
        if (Manager_ID && Manager_ID !== null && Manager_ID !== '') {
            try {
                const response = await axios.post('/api/v1/store/m-store-full', {
                    M_Id: Manager_ID,
                });
                console.log('Successfully fetched full store information:', response);
                if (response && response.status === 0) {
                    setIdToDB(response.data.CS_Id);
                    setNameToDB(response.data.CS_Name);
                    setDetailToDB(response.data.CS_Detail);
                    setMaxPeopleToDB(response.data.CS_MaxPeople);
                    setTimeOpenToDB(dayjs(response.data.CS_TimeOpen, "HH:mm:ss"));
                    setTimeCloseToDB(dayjs(response.data.CS_TimeClose, "HH:mm:ss"));
                    setLocationToDB(response.data.CS_Location);
                    setMenusToDB(response.data.Menus);
                    setServicesToDB(response.data.Services);
                    setTagsToDB(response.data.Tags);
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Error occurred while fetching full store information:', error);
            }
        } else {
            console.error('No manager ID information available');
        }
    };
    const createStore = async () => {
        console.log('detailToDB', detailToDB);
        try {
            const response = await axios.post('/api/v1/store/m-store', {
                M_Id: Manager_ID,
                CS_Name: nameToDB,
                CS_Location: locationToDB,
                CS_Detail: detailToDB,
                CS_MaxPeople: maxPeopleToDB,
                CS_TimeOpen: timeOpenToDB,
                CS_TimeClose: timeCloseToDB,
                CS_ListMenus: menusToDB,
                CS_ListServices: servicesToDB,
                // Tag ?
            });
            console.log('Create store response', response);
            if (response && response.status === 0) {
                setIsError('Thành công');
                return true;
            } else {
                setIsError('Lỗi tạo cửa hàng');
                return '55';
            }
        } catch (error) {
            console.error('Error occurred while calling API to create store:', error);
            return false;
        }
    };
    const updateStore = async () => {
        console.log('menusToDB', menusToDB);
        if (Manager_ID && Manager_ID !== null && Manager_ID !== '') {
            try {
                const response = await axios.patch('/api/v1/store/m-store', {
                    M_Id: Manager_ID,
                    CS_Name: nameToDB,
                    CS_Location: locationToDB,
                    CS_Detail: detailToDB,
                    CS_MaxPeople: maxPeopleToDB,
                    CS_TimeOpen: timeOpenToDB,
                    CS_TimeClose: timeCloseToDB,
                    CS_ListMenus: menusToDB,
                    CS_ListServices: servicesToDB,
                });
                console.log('Update store response:', response);
                if (response && response.status === 0) {
                    console.log('Update store success:', response);
                    getFullStore()      // load dữ liệu mới
                    return true;
                } else {
                    console.log('Invalid response found:', response); g
                    return false;
                }
            } catch (error) {
                console.error('Error occurred while calling API to update store:', error);
            }
        } else {
            return false;
        }
    };

    return {
        idToDB, nameToDB, detailToDB, locationToDB, maxPeopleToDB, timeOpenToDB, timeCloseToDB, menusToDB, servicesToDB, haveStore,
        setNameToDB, setDetailToDB, setLocationToDB, setMaxPeopleToDB, setTimeOpenToDB, setTimeCloseToDB, setMenusToDB, setServicesToDB,
        checkHaveStore, getFullStore, createStore, updateStore
    }
}

export default ConTrollerStore;
