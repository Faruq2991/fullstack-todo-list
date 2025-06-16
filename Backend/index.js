import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// import initApp from "./src/modules/index.router.js";
// import "dotenv/config";

// const app = express();
// const PORT = process.env.PORT || 6005;

// initApp(app, express);

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });


//const express = require('express');
//const mongoose = require('mongoose');
//const cors = require('cors'); // Import CORS

const app = express();
const PORT = 5000;

// Use CORS Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://fullstack-todolist-upnv.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON data
app.use(express.json());

// MongoDB Connection URI
// MongoDB Connection URI - use environment variable with fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/todos';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Using MongoDB URI:', MONGO_URI); // For debugging
  })
  .catch((error) => console.error('MongoDB connection error:', error));
// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, default: 18 },
});

const todoSchema = new mongoose.Schema({
  title: { type: String, },
  date: { type: String, },
  activity: { type: String, },
  description: { type: String, },
  strStatus: { type: String, }
});



const User = mongoose.model('User', userSchema);
const Todos = mongoose.model('Todos', todoSchema);

// Route: Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route: Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todoList = await Todos.find();
    return res.status(200).json({ todos: todoList, numOfPages: Math.ceil(todoList.length / 5) });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Create new todo
app.post('/api/todos', async (req, res) => {
  const { title, description, activity, date, strStatus } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ 
        message: "Title and description are required fields" 
      });
    }

    const todo = new Todos({
      title,
      description,
      activity,
      date,
      strStatus
    });
    await todo.save();

    return res.status(201).json({ todo });
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
});

// Route: Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ todo: updatedTodo });
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Routes
app.get('/', async (req, res) => {
  try {
    //const Todo = await TodoModel.find();
    res.send("Todo");
  }
  catch (e) {
    console.log(e);
  }

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

