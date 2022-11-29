const mongoose = require("mongoose");

const CommentScheme = new mongoose.Schema({
        id: {type: Number},
        productId: {type: Number},
        description: {type: String},
        date: {type: String}
    }
);
const Comment = mongoose.model('comments', CommentScheme);
module.exports = Comment;