const port = 4000;

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51OnGlMKW10USdtx6z9Q3C3Z7PdrcXm8tC8LP9NcsIkR8RZwuKMAWm3XGU0KrTtQKQGHKv1vnCmRm1ZDyh13zU7wZ00hjk9f4Uk');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express();
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
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
    description:{
        type:String,
        required:false
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
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
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
        description:req.body.description,
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
});


//Creating API for removing user
app.post('/removeuser',async (req,res)=>{
    await Users.findOneAndDelete({id:req.body.id});
    console.log("user removed");
    res.json({
        success:true,
        name:req.body.name,
    })
});
//Creating API for getting all products

app.get('/allproducts',async (req,res)=>{
    let productsAll = await Product.find({});
    console.log("All products fetched");
    res.send(productsAll);
})

//Creating API for Fetcing all users
app.get('/allusers',async (req,res)=>{
    let usersAll = await Users.find({});
    console.log("All users fetched");
    res.send(usersAll);
})


//Schema creating for user model

const Users = mongoose.model('Users',{
    fullName:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
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

app.post('/signup', async (req, res) => {
    try {
        // Check if the email is already in use
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email address already in use!" });
        }

        // Check if password and confirm password match
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ success: false, error: "Password and confirm password do not match" });
        }

        // Create a cart with 300 items
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new Users({
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            cartData: cart
        });
        
        // Save the user to the database
        await user.save();

        const data ={
            user: {
                id: user.id
            }
        }

        // Generate JWT token for the newly registered user
        const token = jwt.sign(data, 'secret_ecom');

        // Respond with success and token
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});



//creating endpoint for login
app.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await Users.findOne({ email: req.body.email });
        
        // If user with the provided email exists
        if (user) {
            // Compare hashed passwords
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                // Passwords match, create JWT token
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                // Passwords don't match
                res.json({ success: false, error: "Wrong Password!" });
            }
        } else {
            // User with provided email not found
            res.json({ success: false, error: "Wrong email ID!" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//Creating endpoint for new collection data

app.get('/newcollections',async (req,res)=>{
    let products =await Product.find({});

    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched..")
    res.send(newcollection);
})

//Creating endpoint for popuplar in women

app.get('/popularinsofa', async (req,res)=>{
    let products = await Product.find({category:"sofa"});
    let popular_in_sofa = products.slice(0,4);

    res.send(popular_in_sofa);
})

//Creating middleware to fetch user
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authenticate"})
        }
    }
};



//Creating endpoint for add to cart
app.post('/addtocart',fetchUser, async (req, res) => {
   //console.log(req.body,req.user);
   let userData = await Users.findOne({_id:req.user.id});
   userData.cartData[req.body.itemId] += 1;
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
});


//Creating endpoint to remove product from cart data

app.post('/removefromcart',fetchUser, async (req,res)=>{
    let userData =  await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
})

//Creating endpoint for getting cart data
//Creating endpoint for getting cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log('Get cart');
        // Find the user by their ID
        let userData = await Users.findOne({ _id: req.user.id });

        // Check if user data is available
        if (!userData) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Respond with user's cart data
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error while getting cart data:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


app.post('/create-checkout-session', async (req, res) => {
    const cartItems = req.body.cartItems;
    const line_items = [];

    req.body.all_product.forEach((product) => {
        const quantity = cartItems[product.id];
        if (quantity > 0) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    unit_amount: product.new_price * 100, // Amount in cents
                    product_data: {
                        name: product.name,
                        description:product.description,
                        //images:[product.image] // Replace with your actual product name
                        // Other optional parameters like images, metadata, etc. can be added here
                    }
                },
                quantity: quantity,
            });
        }
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: 'http://localhost:4000/success', // Redirect URL after successful payment
            cancel_url: 'http://localhost:4000/cancel', // Redirect URL if payment is canceled
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});



  

app.get("/success", (req,res)=>{
    res.send("Payment Successful, Thank you");
});

app.get("/cancel", (req,res)=>{
    res.send("Payment failed, Sorry");
});

  



app.listen(port, () => {
  console.log("Server running on port: " + port);
});
