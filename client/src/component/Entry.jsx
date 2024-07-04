import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Entry() {
  const [uName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/user", {username:  uName,email,password})
         .then((data)=>{
          // console.log(data);
          navigate(`/${data.data.id}`)
         }).catch((err)=>{
          console.log(err);
         })
  }

  return (
    <form className="bg-[#171717] ">
      <div className="flex h-full justify-center items-center text-lg text-slate-400">
        <div className="flex flex-1 flex-col  p-4 rounded min-h-52 border max-w-xl w-[6rem] mx-10">
          <h2 className="">Please enter details</h2>
          <div className="flex flex-col flex-1 justify-around">
            <input
              value={uName}
              className="rounded text-[#241f1f] px-2"
              type="text"
              name="username"
              placeholder="name"
              onChange={(e)=> setName(e.target.value)}
            />
            <input
              value={email}
              type="email"
              name="email"
              placeholder="email"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              value={password}
              type="password"
              name="password"
              placeholder="password"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-300 w-1/3 text-black rounded"
              onClick={(e)=>handleSubmit(e)}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Entry;
