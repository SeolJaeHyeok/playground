
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Todos from './Todos';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Todos2 from './Todos2';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Todos />}/>
            <Route path='/todo' element={<Todos2 />}/>
          </Routes>
        </BrowserRouter>
        
      </QueryClientProvider>
    </>
  )
}

export default App
