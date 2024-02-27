import { useState } from "react";

import axios from "axios";
import { treeData } from '@/utils/DSQuanHuyen'
import getCurrentDateTime from "@/utils/getCurrentDateTime";

import { useAppDispatch } from "@/lib/hooks";
import { useDispatch } from 'react-redux';

import bookSlice, { } from '@/lib/features/book/bookSlice'

import { userServices } from '@/services/index'
import { useRouter } from 'next/navigation'
const useSearch = () => {

    const dispatch = useDispatch()

    const currentDate = new Date();

    const [time, setTime] = useState()
    const [date, setDate] = useState()
    const [people, setPeople] = useState(0)

    const getTime = (value) => {
        setTime(value)
        dispatch(bookSlice.actions.setTime(value))
        // console.log('time: ', time);
    }
    const getPeople = (value) => {
        setPeople(value)
        dispatch(bookSlice.actions.setPeoPle(value))
        // console.log('people: ', people);
    }
    const getDate = (value) => {
        dispatch(bookSlice.actions.setDate(value))
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

    return { getDate, getTime, getPeople }
}

export default useSearch
