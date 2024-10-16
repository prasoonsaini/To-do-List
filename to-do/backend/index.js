const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const { TodosModel, UserModel } = require('/Users/prasoonsaini/Desktop/Web Dev Projects/To do List/to-do/db.js');

const app = express();
const SECRET_KEY = "Arijeet"
app.use(express.json());
app.use(cors());

function userAuthMiddleware(req,res,next) {
   const token = req.headers.token
    console.log(token)
    const verifiedToken = jwt.verify(token,SECRET_KEY)
    console.log(verifiedToken)
    if(verifiedToken.id)
    {
        res.username = verifiedToken.username
        next();
    }
    else 
    {
        res.json({message: "invalid username or password"})
    }
}

app.post('/signup', async (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   try {
       const user = await UserModel.findOne({ username });
       if (!user) {
           await UserModel.create({ username, password });
           res.json({ message: "Signed up" });
       } else {
           res.json({ message: "User already exists" });
       }
   } catch (err) {
       res.status(500).json({ message: "Signup failed", error: err.message });
   }
});

app.post('/signin',async (req,res)=>{
   const username = req.body.username;
   const password = req.body.password;

   const user = await UserModel.findOne({
       username: username
   })
   console.log(user)
   if(user){
       if(password === user.password)
       {
           const token = jwt.sign({
               id: user._id.toString()
           },SECRET_KEY)
           res.json({token: token})
       }
       else 
       {
           return res.json("incorrect password")
       }
   }
   else {
       return res.json("User does do exit, please signup first")
   }
})

// app.use(userAuthMiddleware)

app.get('/', async (req, res) => {
   try {
       const todos = await TodosModel.find();
       res.json({ todos });
   } catch (err) {
       res.status(500).json({ message: "Failed to fetch todos", error: err.message });
   }
});

app.post('/', async (req, res) => {
   const todos = await TodosModel.find();
   const { heading, description, priority } = req.body;
   const id = todos.length + 1;
   const state = "todo";

   try {
       await TodosModel.create({ heading, description, priority, id, state });
       const updatedTodos = await TodosModel.find(); // fetch the updated list of todos
       res.json({ todos: updatedTodos });
   } catch (err) {
       res.status(500).json({ message: "Failed to add todo", error: err.message });
   }
});

app.put('/', async (req, res) => {
   console.log("PUT called");
   const { id, title, description, priority, state } = req.body;

   try {
       const updatedTodo = await TodosModel.findOneAndUpdate(
           { id },  // Find by id
           { title, description, priority, state },  // Fields to update
           { new: true }  // Return updated document
       );

       if (!updatedTodo) {
           return res.status(404).json({ message: `Todo with id ${id} not found` });
       }

       const todos = await TodosModel.find();  // Fetch all todos after the update
       res.json({ message: "Todo updated successfully", todos });
   } catch (err) {
       res.status(500).json({ message: "Failed to update todo", error: err.message });
   }
});

app.listen(3003, async () => {
   try {
       await mongoose.connect('mongodb+srv://prasoon:Z68Ypr7A1xDbyIeI@cluster0.re9vc.mongodb.net/pramata', {
           useNewUrlParser: true,
           useUnifiedTopology: true
       });
       console.log("Connected to DB");
   } catch (err) {
       console.error("Failed to connect to DB", err);
   }
});
