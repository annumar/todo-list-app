const express = require('express');
const bodyParser = require('body-parser');

const { getStoredTodo, storeTodo } = require('./data/todo');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/todos', async (req, res) => {
  const storedTodos = await getStoredTodo();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ todos: storedTodos });
});

app.get('/todos/:id', async (req, res) => {
  const storedTodos = await getStoredTodo();
  const todo = storedTodos.find((todo) => todo.id === req.params.id);
  res.json({ todo });
});

app.post('/todos', async (req, res) => {   
  const existingPosts = await getStoredTodo();
  const todosData = req.body;
  const newTodo = {
    ...todosData,
    id: Math.random().toString(),
    status: 'incomplete'
  };
  const updatedTodos = [newTodo, ...existingPosts];
  await storeTodo(updatedTodos);
  res.status(201).json({ message: 'Stored new todo.', todo: newTodo });
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const storedTodos = await getStoredTodo();
  const todoIndex = storedTodos.findIndex((todo) => todo.id === id); // Compare strings

  if (todoIndex > -1) {
    storedTodos[todoIndex] = { ...storedTodos[todoIndex], ...updatedTodo };

    await storeTodo(storedTodos);

    res.status(200).json(storedTodos[todoIndex]);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  const storedTodos = await getStoredTodo();

  const updatedTodos = storedTodos.filter((todo) => todo.id !== id);

  if (storedTodos.length === updatedTodos.length) {
    return res.status(404).send("Todo not found");
  }

  await storeTodo(updatedTodos);

  res.status(200).json({ message: 'Todo deleted successfully.' });
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const todos = await getStoredTodo();
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'Todo not found.' });
    return;
  }

  todos[todoIndex].status = status; // Update the status
  await storeTodo(todos);

  res.status(200).json({ message: 'Todo status updated.', todo: todos[todoIndex] });
});

app.listen(8080);
