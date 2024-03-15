import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const user = createSlice({
    name: 'user',
    initialState: {
        info: {
            U_Id: null,
            U_Name: '',
            U_PrestigeScore: 0,
        }
    },
    reducers: {
        login: (state, action) => {
            state.info = action.payload;
        },
        logout: (state, action) => {
            state.info.U_Id = null
            state.info.U_Name = null
            state.info.U_PrestigeScore = 0
        },
    },
    extraReducers: (builder) => {
    },
});

export default user;
