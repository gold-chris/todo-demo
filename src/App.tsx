import { useState } from 'react'
import './App.css'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new todo..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
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

        <section className="features-section">
          <h2>Project Features</h2>
          <ul className="features-list">
            <li>✅ TypeScript for type safety</li>
            <li>⚡ Vite for fast development</li>
            <li>⚛️ React 18 with hooks</li>
            <li>🎨 CSS modules ready</li>
            <li>📱 Mobile-responsive design</li>
            <li>🔧 ESLint & Prettier configured</li>
            <li>🚀 Ready for mobile deployment</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
