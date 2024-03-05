import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const checkin = createSlice({
  name: 'checkin',
  initialState: {
    details: null,
  },
  reducers: {
    setQrcheckin: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  }
})
export default checkin;