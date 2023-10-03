const router = require('express').Router();

const {
    adminRegister,
    adminLogIn
} = require('../controllers/adminController.js');

const {
    customerRegister,
    customerLogIn,
    getCustomerDetail,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getCartDetail
} = require('../controllers/customerController.js');

// Admin
router.post('/AdminRegister', adminRegister);
router.post('/AdminLogin', adminLogIn);

// Customer
router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCustomerDetail/:id', getCustomerDetail);
router.get('/getCartDetail/:id', getCartDetail);
router.put('/addToCart/:id', addToCart);
router.put('/removeFromCart/:id', removeFromCart);
router.delete('/removeAllFromCart/:id', removeAllFromCart);

module.exports = router;