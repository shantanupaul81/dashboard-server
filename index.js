const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config')
const user = require('./db/User')
const Product = require('./db/Product')
const app = express();


// *Middleware
app.use(cors())
app.use(express.json())

//* Register
app.post('/register', async (req, res) => {
    let data = new user(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

//! Login
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let data = await user.findOne(req.body).select("-password");
        if (data) {
            res.send(data)
        } else {
            res.send({ result: "User not found" })
        }
    } else {
        res.send({ result: "User not found" })
    }

});

// * AddProduct
app.post('/addproduct', async (req, res) => {
    let data = new Product(req.body);
    let result = await data.save();
    res.send(result);
})


// ! Product Get
app.get('/product',async (req, res) => {
   let data = await Product.find();
   if(data.length >0){
    res.send(data);
   }else{
    res.send({result:"Product Not Found!"})
   }
})


app.delete('/product/:id',async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);

})


app.get('/product/:id',async(req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"Record not found"})
    }

})


app.put('/product/:id', async(req,res)=>{
    const result = await Product.updateOne({_id:req.params.id},{$set:req.body});
    res.send(result)
})


app.get('/search/:key',async(req,res)=>{
    let result= await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    res.send(result)
})











// * A sample test
app.get('/', (req, res) => {
    res.send('Welcome to backend')
})
//! Port is listen on 8000;
app.listen(8000, () => {
    console.log("Backend is conneceted");
})