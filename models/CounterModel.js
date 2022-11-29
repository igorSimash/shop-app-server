const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    id: {
        type: String
    },
    seq: {
        type: Number
    }
});

const Counter = mongoose.model("counters", ProductSchema);
module.exports = Counter;