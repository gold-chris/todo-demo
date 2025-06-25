// backend/server.js (new file)
// Simple Node.js/Express backend for MongoDB CRUD

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/todoapp'; // Replace with your MongoDB connection string (e.g., MongoDB Atlas)

app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Todo Schema
const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Preserve client-provided ID for simplicity
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

// CRUD Endpoints

// GET /todos - Fetch all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

// GET /todo/:id - Fetch a single todo (for completeness)
app.get('/todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
});

// PUT /todo/:id - Update a todo (e.g., toggle completed)
app.put('/todo/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo', error });
  }
});

// DELETE /todo/:id - Delete a todo
app.delete('/todo/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id: req.params.id });
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});