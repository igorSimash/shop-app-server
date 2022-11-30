const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
    name: {
        type: String,
    },
    count: {
        type: String,
    },
    size: {
        width: {
            type: String,
        },
        height: {
            type: String,
        }
    },
    weight: {
        type: String,
    },
    price: {
        type: String,
    },
});
const Product = mongoose.model("products", ProductSchema);
module.exports = Product;