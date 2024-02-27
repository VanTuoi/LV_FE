// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import rootReducer from './rootReducer ';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const makeStore = () => {
    return configureStore({
        reducer: {
            reducer: rootReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
};
