// reducers/index.js
import { combineReducers } from 'redux';
import search from './features/search/searchSlice'
import booking from './features/booking/bookingSlice'
import checkin from './features/checkin/checkinSlice'


const rootReducer = combineReducers({
    search: search.reducer,
    booking: booking.reducer,
    checkin: checkin.reducer,
});

export default rootReducer;
