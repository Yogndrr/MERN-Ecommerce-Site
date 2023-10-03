// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     customerDetails: [],
//     cartDetails: [],
//     loading: false,
//     error: null,
//     response: null,
// };

// const customerSlice = createSlice({
//     name: 'customer',
//     initialState,
//     reducers: {
//         getRequest: (state) => {
//             state.loading = true;
//         },
//         cartSuccess: (state, action) => {
//             state.cartDetails = action.payload;
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         },
//         customerSuccess: (state, action) => {
//             state.customerDetails = action.payload;
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         },
//         getFailed: (state, action) => {
//             state.response = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         getError: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.response = null;
//         }
//     },
// });

// export const {
//     getRequest,
//     cartSuccess,
//     customerSuccess,
//     getFailed,
//     getError
// } = customerSlice.actions;

// export const customerReducer = customerSlice.reducer;