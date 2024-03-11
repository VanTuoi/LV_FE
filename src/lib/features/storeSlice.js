import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const store = createSlice({
    name: 'store',
    initialState: {
        content: '',
        name: '',
        location: '',
        menus: null,
        tags: null,
    },
    reducers: {
        onChangeContent: (state, action) => {
            state.content = action.payload
        },
        onChangeName: (state, action) => {
            state.name = action.payload
        },
        onChangeLocation: (state, action) => {
            state.location = action.payload
        },
        onChangeMenus: (state, action) => {
            state.menus = action.payload
        },
        onChangeTags: (state, action) => {
            state.tags = action.payload
        },
    },
    extraReducers: (builder) => {
    },
});

export default store;
