import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const manager = createSlice({
    name: 'manager',
    initialState: {
        info: {
            M_Id: '',
            M_Name: '',
        }
    },
    reducers: {
        login: (state, action) => {
            state.info = action.payload;
        },
        logout: (state, action) => {
        },
    },
    extraReducers: (builder) => {
    },
});

export default manager;
