import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
// import { customerReducer } from './customerRelated/customerSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        // customer: customerReducer,
    }
});

export default store;