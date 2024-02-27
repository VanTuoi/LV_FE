// reducers/index.js
import { combineReducers } from 'redux';
import search from './features/search/searchSlice'
import book from './features/book/bookSlice'

const rootReducer = combineReducers({
    search: search.reducer,
    book: book.reducer,
});

export default rootReducer;
