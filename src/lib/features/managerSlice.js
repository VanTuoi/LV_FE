import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const manager = createSlice({
    name: 'manager',
    initialState: {
        M_Id: '',
        M_Name: '',
    },
    reducers: {
        login: (state, action) => {
            state = action.payload;
        },
        logout: (state, action) => {
        },
    },
    extraReducers: (builder) => {
    },
});

export default manager;
