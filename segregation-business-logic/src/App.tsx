import React, { useState } from 'react';

interface ITodo {
  text: string;
  completed: boolean;
}

// 계산
const filterTodos = (todos: ITodo[], filter: string) => {
  console.log('filter 외부')

  if (filter === 'completed') {
		return todos.filter((todo: ITodo) => todo.completed);
	}
  
  if (filter === 'incomplete') {
		return todos.filter((todo: ITodo) => !todo.completed);
	}
  return todos;
};
  
// 계산
const makeNewTodo = (input: string) => {
  const newTodo = { text: input, completed: false };
  console.log('make 외부')
  return newTodo;
}

// 계산
const toggleTodo = (todos: ITodo[], index: number) => {
  const newTodos = [...todos];
  newTodos[index].completed = !newTodos[index].completed;
  console.log('toggle 외부')
  return newTodos;
}

  // 계산
const searchTodos = (todos: ITodo[], filter: string, searchQuery: string) => {
  console.log("search 외부")
  return filterTodos(todos, filter).filter((todo:ITodo) => todo.text.includes(searchQuery));
};

/**
 * 1. 계산(순수 함수) 외부로 추출
 * - 암묵적 인자 제거 -> 예측 가능하게 변경
 * - 렌더링마다 선언되지 않으므로 useCallback 등의 처리가 필요하지 않음 -> 부분적으로 이점을 가져갈 수 있을듯 -> makeNewTodo, toggleTodo의 경우 해당 액션을 처리할 때만 호출이 되고 filterTodo, searchTodo의 경우 렌더링 단에서 사용하고 있어서 매번 호출 
 */
const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete
  const [searchQuery, setSearchQuery] = useState('');
  
  console.log('내부')
  
  // 액션
  const addTodo = () => {
    setTodos([...todos, makeNewTodo(input)]);
    setInput('');
  };

  // 액션
  const toggleComplete = (index: number) => {
    setTodos(toggleTodo(todos,index));
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
        {searchTodos(todos, filter, searchQuery).map((todo, index) => (
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
