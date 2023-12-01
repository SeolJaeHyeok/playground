import { ChangeEvent, FormEvent, useReducer, useState } from 'react';

interface ITodo {
  id: number;
  desc: string;
  isFinish: boolean;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo.id !== action.payload.id),
      };
    case 'UPDATE_TODO':
      return { ...state };
  }
};

const initialState = {
  todos: [{ id: 1, desc: '예시입니다.', isFinish: false }],
};

function App() {
  const [value, setValue] = useState('');
  const [id, setId] = useState(2);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: 'ADD_TODO', payload: { id, desc: value, isFinish: false } });
    setValue('');
    setId((prev) => prev + 1);
  };

  const handleDeleteTodo = (id: number) => () => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center'>
      <header className='text-6xl'>TO-DO LIST</header>
      <section className='mt-12 w-[500px] shadow-2xl'>
        <article className='relative rounded-lg bg-white p-5'>
          <form onSubmit={handleAddTodo}>
            <input
              value={value}
              onChange={handleAddTodoInput}
              className='h-full w-full p-1 text-black'
              placeholder='what you want to do'
            />
            <button className='absolute right-3 top-[16px] w-[100px] rounded bg-blue-500 pb-1 pt-1  text-xl text-white'>
              ADD
            </button>
          </form>
        </article>
      </section>
      <section className='mt-16 w-[500px]'>
        <article className='flex flex-col rounded bg-white p-7 shadow-2xl'>
          {state.todos.map((todo: ITodo) => (
            <div key={todo.id} className='relative rounded-lg bg-white p-1'>
              <input
                className='mb-2 h-10 w-full border-b-2 p-1 text-black'
                placeholder='여기에 TODO가 들어가'
                defaultValue={todo.desc}
              />
              <button
                onClick={handleDeleteTodo(todo.id)}
                className='absolute right-5 top-[17px] pb-1 pt-1 font-semibold text-red-600'
              >
                Delete
              </button>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}

export default App;
