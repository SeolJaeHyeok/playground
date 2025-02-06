/* eslint-disable react/prop-types */

function TodoItem({ todo, toggleTodo }) {
  return (
    <li
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer',
      }}
      onClick={() => toggleTodo(todo.id)}
    >
      {todo.text}
    </li>
  );
}

export default TodoItem;
