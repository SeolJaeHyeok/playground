import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState<{text: string, completed: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete
  const [searchQuery, setSearchQuery] = useState('');

  const addTodo = () => {
    const newTodo = { text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filterTodos = () => {
    if (filter === 'completed') {
			return todos.filter((todo) => todo.completed);
		}
    if (filter === 'incomplete') {
			return todos.filter((todo) => !todo.completed);
		}
    return todos;
  };

  const searchTodos = () => {
    return filterTodos().filter((todo) => todo.text.includes(searchQuery));
  };

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <button onClick={() => setFilter('all')}>Show All</button>
      <button onClick={() => setFilter('completed')}>Show Completed</button>
      <button onClick={() => setFilter('incomplete')}>Show Incomplete</button>
      <input
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {searchTodos().map((todo, index) => (
          <li key={index}>
            {todo.text}{' '}
            <button onClick={() => toggleComplete(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
