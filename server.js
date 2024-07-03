const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const path = require('path');
const app = express();

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/furniture', async(req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
app.get('/furniture/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

app.post('/furniture', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//Update product
app.put('/furniture/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //cant find furniture to update 
        if (!product) {
            return res.status(404).json({message: `cannot find furniture with id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//delete a furniture
app.delete('/furniture/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) { 
            return res.status(404).json({message: `cannot find any furniture with id ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
mongoose.
connect('mongodb+srv://admin:admin@homework3.thidbrs.mongodb.net/Node-APIHW?retryWrites=true&w=majority&appName=Homework3')
.then(() => {
    app.listen(3000, ()=> {
        console.log('Node API is running on port 3000');
    })
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log(error)
})