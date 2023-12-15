import React, { useState } from 'react';

interface ITodo {
  text: string;
  completed: boolean;
}
 
type TFilter = 'completed' | 'incomplete' | 'all'

/**
 * 1. 계산(순수 함수) 컴포넌트 외부로 추출
 * - 재사용이 가능, 단 이름 충돌의 가능성 높아진다.
 * - 암묵적 인자 제거 -> 예측 가능하게 변경
 * - 렌더링마다 생성되지 않으므로 메모이제이션 처리가 필요하지 않음 -> 컴포넌트 내부에서 사용하는 경우 리렌더가 발생할 때마다 매번 생성, 호출 발생하지만 외부로 추출하게 되면 한 번만 생성되어 호출된다.
 *   - 렌더링마다 다시 생성될 필요가 없는 기능의 경우 이점을 가져갈 수 있을듯
 * 2. View Model을 구성하여 컴포넌트 외부로 추출
 * - 위의 장점을 가져가면서 로직을 한 공간(Controller)에 모아두어 응집도가 올라간다.
 */

const TodosController = (todos: ITodo[]) => {
  return {
    get: () => todos,
    add: (todo: ITodo) => ([...todos, todo]),
    toggle: (index: number) => {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed
      return todos;
    },
    filter: (filter: TFilter) => {
      if(filter === 'completed') {
        return todos.filter((todo: ITodo) => todo.completed)
      }

      if(filter === 'incomplete') {
        return todos.filter((todo: ITodo) => !todo.completed)

      }
      return todos;
    },
    search: (searchWord: string) => todos.filter((todo: ITodo) => todo.text.includes(searchWord))
  }
  
}

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<TFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const addTodo = () => {
    const add = TodosController(todos).add({text: input, completed: false});
    const newTodo = TodosController(add).get();
    setTodos(newTodo);
    setInput('');
  };

  const toggleComplete = (index: number) => {
    const newTodos = TodosController(todos).toggle(index)
    setTodos([...newTodos]);
  };
    

  const searchTodos = () => {
    const filteredTodo = TodosController(todos).filter(filter); 
    return filteredTodo.filter((todo) => todo.text.includes(searchQuery));
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
