import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const user = createSlice({
    name: 'user',
    initialState: {
        U_Id: null,
        U_Name: '',
        U_PrestigeScore: 0,
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

export default user;
