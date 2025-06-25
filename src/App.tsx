import { useState, useEffect } from 'react'
import './App.css'

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data); // Replace local state with server data (server wins)
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Optional: Add user notification here (e.g., toast)
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch on component mount (page load)
    
    const intervalId = setInterval(fetchTodos, 300000); // Every 5 minutes
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo]);
      setInputValue('');
           // Async sync to backend (new)
      try {
        await fetch(`${API_BASE_URL}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTodo),
        });
        // After sync, optionally re-fetch to ensure consistency (but keeping it async as per request)
      } catch (error) {
        console.error('Error adding todo:', error);
        // On next fetch, server will correct if needed
      }
    }
  }

  const toggleTodo = async (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); // Optimistic local update
    
    // Async sync to backend (new)
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);
    if (todoToUpdate) {
      try {
        await fetch(`${API_BASE_URL}/todo/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todoToUpdate),
        });
      } catch (error) {
        console.error('Error updating todo:', error);
        // On next fetch, server will correct
      }
    }
  }

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // Optimistic local update
    
    // Async sync to backend (new)
    try {
      await fetch(`${API_BASE_URL}/todo/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      // If delete fails, next fetch will restore from server if needed
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>TypeScript Web & Mobile App</h1>
        <p>A modern React + TypeScript starter project</p>
      </header>

      <main className="app-main">
        <section className="todo-section">
          <h2>Todo List Demo</h2>
          <div className="todo-input">
            <input
              type="text"
              id="todo-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new todo..."
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add</button>
          </div>

          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
