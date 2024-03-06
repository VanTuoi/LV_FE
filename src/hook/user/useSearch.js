import { useState } from "react";

import axios from "axios";
import { treeData } from '@/utils/dsQuanHuyen'
import getCurrentDateTime from "@/utils/getCurrentDateTime";

import { useAppDispatch } from "@/lib/hooks";

import searchSlice, { findLocation, notAccectLocate, selectLocateToMenu } from '@/lib/features/searchSlice'

const useSearch = () => {

    const dispatch = useAppDispatch()

    const currentDate = new Date();

    const [time, setTime] = useState(getCurrentDateTime)
    const [date, setDate] = useState(currentDate.getDate())
    const [people, setPeople] = useState(0)
    const [searchContent, setSearchContent] = useState('')

    const getTime = (value) => {
        setTime(value)
        // console.log('time: ', time);
    }
    const getPeople = (value) => {
        setPeople(value)
        console.log('people....', people);
        // console.log('people: ', people);
    }
    const getSearchContent = (value) => {
        setSearchContent(value)
        // console.log('search: ', searchContent);
    }


    const search = () => {
        console.log('handle search', searchContent);
    }

    const getListLocation = () => {
        let list = null
        list = treeData

        // function delay(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }
        // await delay(2000) // debug delay

        return list
    }

    const setLocationBySelect = (nameLocation) => {
        console.log('handle search', nameLocation);
        dispatch(searchSlice.actions.selectLocateToMenu(nameLocation))
    }

    const successCallback = (position) => {
        dispatch(findLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }))
    };
    const errorCallback = (error) => {
        dispatch(searchSlice.actions.notAccectLocate())
        console.log('Error get locate', error);
    };
    const setLocationToBrowser = async () => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 10000 });
    }


    return { getTime, getPeople, getSearchContent, search, setLocationToBrowser, setLocationBySelect, getListLocation, searchContent }
}

export default useSearch
