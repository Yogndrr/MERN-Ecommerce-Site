const Product = require("../models/productSchema");
const Customer = require("../models/customerSchema");

const productCreate = async (req, res) => {
    try {
        const product = new Product(req.body)

        let result = await product.save();

        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProducts = async (req, res) => {
    try {
        let products = await Product.find().populate("seller", "shopName");
        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAdminProducts = async (req, res) => {
    try {
        let products = await Product.find({ seller: req.params.id })
        if (products.length > 0) {
            res.send(products)
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProductDetail = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).populate("seller", "shopName");
        if (product) {
            res.send(product);
        }
        else {
            res.send({ message: "No product found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const updateProduct = async (req, res) => {
    try {
        let result = await Product.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const searchProduct = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            $or: [
                { productName: { $regex: key, $options: 'i' } },
                { category: { $regex: key, $options: 'i' } },
                { subcategory: { $regex: key, $options: 'i' } }
            ]
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const searchProductbyCategory = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            $or: [
                { category: { $regex: key, $options: 'i' } },
            ]
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const searchProductbySubCategory = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            $or: [
                { subcategory: { $regex: key, $options: 'i' } }
            ]
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        await Customer.updateMany(
            { "cartDetails._id": deletedProduct._id },
            { $pull: { cartDetails: { _id: deletedProduct._id } } }
        );

        res.send(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteProducts = async (req, res) => {
    try {
        const deletionResult = await Product.deleteMany({ seller: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No products found to delete" });
            return;
        }

        const deletedProducts = await Product.find({ seller: req.params.id });

        await Customer.updateMany(
            { "cartDetails._id": { $in: deletedProducts.map(product => product._id) } },
            { $pull: { cartDetails: { _id: { $in: deletedProducts.map(product => product._id) } } } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    productCreate,
    getProducts,
    getAdminProducts,
    getProductDetail,
    updateProduct,
    searchProduct,
    searchProductbyCategory,
    searchProductbySubCategory,
    deleteProduct,
    deleteProducts,
};