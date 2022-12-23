const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const productModel = require("./models/ProductModel");
const counterModel = require("./models/CounterModel");
const commentModel = require("./models/CommentModel");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());

mongoose
    .connect(
        process.env.MONGODB_CONNECT_KEY,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/products', async (req, res) => {
    const product = await productModel.find({});
    res.send(product);
});

app.post("/products", async (req, res) => {
    counterModel.findOneAndUpdate(
        {
            id: "product_count"
        },
        {
            "$inc": {"seq": 1}
        },
        {
            new: true
        },
        async (err, cd) => {
            const product = new productModel({
                id: cd.seq,
                imageUrl: req.body.imageUrl,
                name: req.body.name,
                count: req.body.count,
                size: {
                    width: req.body.size.width,
                    height: req.body.size.height
                },
                weight: req.body.weight,
                price: req.body.price
            });
            await product.save();
            res.send(product);
        }
    )
});

app.delete('/products', async (req, res) => {
    const product = await productModel.deleteOne({id: req.body.product_id});
    res.send(product);
})

app.put('/products', async (req, res) => {
    const product = await productModel.findOneAndUpdate({id: req.body.id}, {$set: req.body});
    res.send(product);
})

app.get('/comments', async (req, res) => {
    const comment = await commentModel.find({});
    res.send(comment);
});

app.post('/comments', async (req, res) => {
    counterModel.findOneAndUpdate(
        {
            id: "comment_count"
        },
        {
            "$inc": {"seq": 1}
        },
        {
            new: true
        },
        async (err, cd) => {
            const comment = new commentModel({
                id: cd.seq,
                productId: req.body.productId,
                description: req.body.description,
                date: req.body.date
            });
            await comment.save();
            res.send(comment);
        }
    )
    }
);

app.delete('/comments', async (req, res) => {
    const comment = await commentModel.deleteOne({id: req.body.comm_id});
    res.send(comment);
});

app.listen(process.env.PORT || port, () => console.log(`Server started on port ${port}!`));