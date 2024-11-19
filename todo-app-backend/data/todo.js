const fs = require('node:fs/promises');

async function getStoredTodo() {
  const rawFileContent = await fs.readFile('todos.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedTodo = data.todos ?? [];
  return storedTodo;
}

function storeTodo(todos) {
  return fs.writeFile('todos.json', JSON.stringify({ todos: todos || [] }));
}

exports.getStoredTodo = getStoredTodo;
exports.storeTodo = storeTodo; 