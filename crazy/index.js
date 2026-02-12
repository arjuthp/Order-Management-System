
const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/orderdb')
.then(() => console.log("MongoDB Connected"));

const PORT = 8002;

const app = express();
//Middlewares
app.use(express.static('public'));
app.use(express.json());//parsing JSON BODIES
app.use(express.urlencoded({extended:false}));//parse form data

//routes


app.use("/user", require('./user/user.routes'));
app.use("/products", require('./product/product.routes'));
// app.use("/orders", require('./order/order.routes'));

app.listen(PORT, () => console.log(`Server Started:\n http://localhost:${PORT}`));