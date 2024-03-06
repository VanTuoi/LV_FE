import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const search = createSlice({
  name: 'search',
  initialState: {
    searchContent: '',
    time: '',
    people: '',
    date: '',
    locate: null,
    status: 'notSelect'
  },
  reducers: {
    selectLocateToMenu: (state, action) => {
      state.status = 'Thành công';
      state.locate = action.payload;
    },
    notAccectLocate: (state, action) => {
      state.status = 'Quyền truy cập vị trí bị từ chối';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findLocation.pending, (state, action) => {
        state.status = 'Đang tải ...';
      })
      .addCase(findLocation.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'Thành công'
          state.locate = action.payload.city.toString() + ' - ' + action.payload.locality.toString()
        } else {
          state.status = 'Thất bại';
        }
      })
      .addCase(findLocation.rejected, (state, action) => {
        state.status = 'Lỗi';
      })
  },
});

export const findLocation = createAsyncThunk('search/loginsuccess', async (locate) => {

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await delay(2000) // debug delay

  let response = null
  const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
  try {
    response = await axios.get(url, {
      params: {
        latitude: locate.latitude.toString(),
        longitude: locate.longitude.toString(),
        localityLanguage: 'en'
      }
    })
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return response.data
});

export default search;
