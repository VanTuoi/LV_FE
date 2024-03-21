// reducers/index.js
import { combineReducers } from 'redux';
import search from '@/lib/features/checkinSlice'
import booking from '@/lib/features/bookingSlice'
import checkin from '@/lib/features/checkinSlice'
import user from '@/lib/features/userSlice'
import manager from '@/lib/features/managerSlice'
import store from '@/lib/features/storeSlice'

const rootReducer = combineReducers({
    search: search.reducer,
    booking: booking.reducer,
    checkin: checkin.reducer,
    user: user.reducer,
    manager: manager.reducer,
    store: store.reducer,
});

export default rootReducer;
