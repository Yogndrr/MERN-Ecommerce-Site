const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');

const customerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const customer = new Customer({
            ...req.body,
            password: hashedPass
        });

        const existingcustomerByEmail = await Customer.findOne({ email: req.body.email });

        if (existingcustomerByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await customer.save();
            result.password = undefined;

            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const customerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let customer = await Customer.findOne({ email: req.body.email });
        if (customer) {
            const validated = await bcrypt.compare(req.body.password, customer.password);
            if (validated) {
                customer.password = undefined;

                res.send(customer);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getCustomerDetail = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id)
        if (customer) {
            customer.password = undefined;
            res.send(customer);
        }
        else {
            res.send({ message: "No customer found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getCartDetail = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id)
        if (customer) {
            res.send(customer.cartDetails);
        }
        else {
            res.send({ message: "No customer found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const addToCart = async (req, res) => {
    try {

        let customer = await Customer.findByIdAndUpdate(req.params.id, req.body,
            { new: true })

        return res.send(customer.cartDetails);

    } catch (err) {
        res.status(500).json(err);
    }
}

// const addToCart = async (req, res) => {
//     try {
//         let customer = await Customer.findById(req.params.id)

//         const existingProduct = customer.cartDetails.find(
//             (cardItem) => cardItem.id === req.body.id
//         );

//         if (existingProduct) {
//             existingProduct.quantity += 1;
//         } else {
//             customer.cartDetails.push({ ...req.body, quantity: 1 });
//         }

//         const result = await customer.save();
//         console.log(result.cartDetails);
//         return res.send(result.cartDetails);

//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

const removeFromCart = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id)

        const existingProduct = customer.cartDetails.find(
            (cardItem) => cardItem.id === req.body.id
        );

        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else {
                const index = customer.cartDetails.findIndex(
                    (cardItem) => cardItem.id === req.body.id
                );
                if (index !== -1) {
                    customer.cartDetails.splice(index, 1);
                }
            }
        }
        const result = await customer.save();
        return res.send(result.cartDetails);

    } catch (err) {
        res.status(500).json(err);
    }
}

const removeAllFromCart = async (req, res) => {
    const customerId = req.params.id;

    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $set: { cartDetails: [] } }
        );

        return res.send(result.cartDetails);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    customerRegister,
    customerLogIn,
    getCustomerDetail,
    getCartDetail,
    addToCart,
    removeFromCart,
    removeAllFromCart
};
