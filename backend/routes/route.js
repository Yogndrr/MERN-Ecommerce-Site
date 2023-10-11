const router = require('express').Router();

const {
    adminRegister,
    adminLogIn
} = require('../controllers/adminController.js');

const {
    productCreate,
    getProducts,
    getProductDetail,
    searchProduct,
    searchProductbyCategory,
    searchProductbySubCategory,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
} = require('../controllers/productController.js');

const {
    customerRegister,
    customerLogIn,
    getCustomerDetail,
    getCartDetail,
    cartUpdate
} = require('../controllers/customerController.js');

// Admin
router.post('/AdminRegister', adminRegister);
router.post('/AdminLogin', adminLogIn);

// Product
router.post('/ProductCreate', productCreate);
router.get('/getAdminProducts/:id', getAdminProducts);
router.get('/getProducts', getProducts);
router.get('/getProductDetail/:id', getProductDetail);

router.put('/ProductUpdate/:id', updateProduct);

router.get('/searchProduct/:key', searchProduct);
router.get('/searchProductbyCategory/:key', searchProductbyCategory);
router.get('/searchProductbySubCategory/:key', searchProductbySubCategory);

router.delete('/DeleteProduct/:id', deleteProduct);
router.delete('/DeleteProducts/:id', deleteProducts);
router.delete('/deleteProductReview/:id', deleteProductReview);
router.delete('/deleteAllProductReviews/:id', deleteAllProductReviews);

// Customer
router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCustomerDetail/:id', getCustomerDetail);
router.get('/getCartDetail/:id', getCartDetail);
router.put('/cartUpdate/:id', cartUpdate);

module.exports = router;