// reducers/index.js
import { combineReducers } from 'redux';
import search from './features/searchSlice'
import booking from './features/bookingSlice'
import checkin from './features/checkinSlice'


const rootReducer = combineReducers({
    search: search.reducer,
    booking: booking.reducer,
    checkin: checkin.reducer,
});

export default rootReducer;
