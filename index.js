const express = require("express");

const mongoose = require("mongoose");

const model = require("./model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/prac")
.then(()=>{
    console.log("DB connected");
})

app.get("/",(req,res)=>{
    res.send("hello");
})

app.post("/signup", async (req,res)=>{
    const {username, email , password } = req.body;
   await model.create({
        username,
        email,
        password
    })
    res.status(201).json({message : "Success"});
})

app.post("/signin",async (req,res)=>{
    const { email , password } = req.body;

    try{
    const user = await model.findOne({email});
    // console.log(user.password);
    if(user.password == password){
       return res.status(200).json({message : user});
    }
    return res.status(404).json({ message : "not found" });
}
catch(err){
    console.log(err);
    return res.status(404).json({ message : "not found" });
}
})

app.listen(5000,()=>{
    console.log("Server Started");
})