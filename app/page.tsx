'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    // Get todos from backend
    fetch('http://localhost:3000/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data.map((todo: any) => todo.task)));
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    // Post new todo to backend
    await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTodo }),
    });

    // Update local state
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="text-xl">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
