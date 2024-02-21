const port = 4000;

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://gagurekobe:ZekiKobe5580@cluster0.wtkblfk.mongodb.net/e-commerce", {

})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error", err));

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

//Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name: {
    type:String,
    required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:String,
        required:true,
    },
    old_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },


})


app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Product saved..");
    res.json({
        success:true,
        name:req.body.name,
    })
})


//Creating API for deleting products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("product removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for getting all products

app.get('/allproducts',async (req,res)=>{
    let productsAll = await Product.find({});
    console.log("All products fetched");
    res.send(productsAll);
})


//Schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type: String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,

    }
})

//Creating endpoint for registering user

app.post('/signup', async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"E-mail address already used!"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;  
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        use:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})


//creating endpoint for login

app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }else{
            res.json({success:false,error:"Incorrect password!"});
        }
    }else{
        res.json({success:false,error:"Email address does not fouund!"})
    }
})

//Creating endpoint for new collection data

app.get('/newcollections',async (req,res)=>{
    let products =await Product.find({});

    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched..")
    res.send(newcollection);
})

//Creating endpoint for popuplar in women

app.get('/popularinwomen', async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");

    res.send(popular_in_women);
})

//Creating middleware to fetch user
const fetchUser = ((req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate valid token"})
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
})

//Creating endpoint for add to cart
app.post('/addtocart',fetchUser, async (req,res) =>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//Creating endpoint to remove product from cart data

app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData =  await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//Creating endpoint for getting cart data
app.post('/getcart',fetchUser, async (req,res)=>{
    console.log('Get cart');
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
