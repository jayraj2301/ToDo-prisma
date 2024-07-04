import {Route,Routes} from 'react-router-dom';
import Entry from './component/Entry';
import TodoList from './component/TodoList';

export default function App() {

  return (
    <main className='h-screen py-4 text-slate-200 px-10 bg-[#171717]'>
        <Routes>
          <Route path='/sign' element={<Entry />} />
          <Route path='/:id' element={<TodoList />} />
        </Routes>
    </main>
  )
}