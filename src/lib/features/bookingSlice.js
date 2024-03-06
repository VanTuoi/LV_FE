import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const booking = createSlice({
  name: 'booking',
  initialState: {
    time: '',
    people: 1,
    date: dayjs(),
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setPeoPle: (state, action) => {
      state.people = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  }
})
export default booking;