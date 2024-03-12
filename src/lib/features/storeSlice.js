import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const store = createSlice({
    name: 'store',
    initialState: {
        name: '',
        content: '',
        location: '',
        menus: [],
        services: [],
        tags: [],
    },
    reducers: {
        onChangeName: (state, action) => {
            // console.log('run');
            state.name = action.payload
        },
        onChangeContent: (state, action) => {
            state.content = action.payload
        },
        onChangeLocation: (state, action) => {
            state.location = action.payload
        },
        onChangeMenus: (state, action) => {
            state.menus = action.payload
        },
        onChangeServices: (state, action) => {
            state.services = action.payload
        },
        onChangeTags: (state, action) => {
            state.tags = action.payload
        },
    },
    extraReducers: (builder) => {
    },
});

export default store;
