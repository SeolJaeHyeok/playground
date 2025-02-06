import { useState } from 'react';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '개인과제', completed: false },
    { id: 2, text: '개인과제 리뷰', completed: false },
    { id: 3, text: '리팩토링', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
