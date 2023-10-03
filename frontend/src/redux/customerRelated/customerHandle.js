// import axios from 'axios';
// import {
//     getRequest,
//     cartSuccess,
//     customerSuccess,
//     getError
// } from './customerSlice';

// export const getCustomerDetails = (id) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Customer/${id}`);

//         dispatch(customerSuccess(result.data));

//     } catch (error) {
//         dispatch(getError(error));
//     }
// }

// export const getCartDetails = (id) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getCartDetail/${id}`);

//         dispatch(cartSuccess(result.data));

//     } catch (error) {
//         dispatch(getError(error));
//     }
// }

// export const updateCustomer = (fields, id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
//             headers: { 'Content-Type': 'application/json' },
//         });

//         dispatch(cartSuccess(result.data));

//     } catch (error) {
//         dispatch(getError(error));
//     }
// }

// export const removeStuff = (id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);

//         dispatch(cartSuccess(result.data));

//     } catch (error) {
//         dispatch(getError(error));
//     }
// }