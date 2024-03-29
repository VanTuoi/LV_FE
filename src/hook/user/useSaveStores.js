import { useState } from "react";
import axios from "@/utils/axios";
import dayjs from "dayjs";
import useSessionStorage from "../useSessionStorage/useSessionStorage";

const useSaveStores = () => {

    const [statusSave, setStatusSave] = useState(false)
    const [listSaveStore, setListSaveStore] = useState([])

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
    const getStatusSaveAllStore = async (id) => {
        try {
            const response = await axios.post('/api/v1/user/status-save-all-store')
            console.log('response', response);
            if (response && response.status === 0) {
                setListSaveStore(response.data)
                return true
            } else {
                setListSaveStore(null)
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
        statusSave, listSaveStore, getStatusSaveStore, saveStore, unSaveStore, getStatusSaveAllStore, setListSaveStore
    }
}

export default useSaveStores
