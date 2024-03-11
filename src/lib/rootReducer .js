// reducers/index.js
import { combineReducers } from 'redux';
import search from './features/searchSlice'
import booking from './features/bookingSlice'
import checkin from './features/checkinSlice'
import user from './features/userSlice'
import manager from './features/managerSlice'
import store from './features/storeSlice'

const rootReducer = combineReducers({
    search: search.reducer,
    booking: booking.reducer,
    checkin: checkin.reducer,
    user: user.reducer,
    manager: manager.reducer,
    store: store.reducer,
});

export default rootReducer;
