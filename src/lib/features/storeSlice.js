import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const store = createSlice({
  name: 'store',
  initialState: {
    maxPeople: 5,
    timeOpen: null,
    timeClose: null,
  },
  reducers: {
    setMaxPeople: (state, action) => {
      state.maxPeople = action.payload;
    },
    setTimeOpen: (state, action) => {
      state.timeOpen = action.payload;
    },
    setTimeClose: (state, action) => {
      state.timeClose = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  }
})
export default store;