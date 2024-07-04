import { useEffect, useState } from "react";
import Todo from "./Todo";
import {useParams} from 'react-router-dom';
import axios from 'axios';

function TodoList() {
  const [ipVal, setIpVal] = useState("");
  const [todos, setTodos] = useState([]);
  const { id } = useParams();
  
  useEffect(()=>{
    getTodo()
  },[])

  const addTodo = ()=>{
    axios.post("http://localhost:3000/todo",{userId:id,title:ipVal,description:"None"})
    .then(()=>{
      getTodo()
    }).catch((err)=>{
      console.log(err);
    })
  }

  const getTodo = async()=>{
    const data = await axios.get("http://localhost:3000/todo",{params:{id}})
    if(data){
        setTodos(data.data)
    }
  }

  return (
    <div>
      <h1 className="m-4 text-3xl text-center">Todo List</h1>
      <div className="flex gap-2 w-full flex-1 mb-8">
        <input
          className="w-full rounded text-lg placeholder:text-gray-700 h-9 px-3 text-gray-900"
          type="text"
          value={ipVal}
          placeholder="todo"
          name="todo"
          onChange={(e)=> setIpVal(e.target.value)}
        />
        <button 
        className="rounded px-4 border bg-green-500" 
        type="submit"
        onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div>
        { !todos ? "hello" : todos.map((todo,key) => <Todo key={key} {...todo} />)}
      </div>
    </div>
  );
}

export default TodoList;
