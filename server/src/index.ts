import express from 'express';
import cors from 'cors';
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import { createUser, getUser } from './query/user';
import { addTodo, getTodo, updateTodo } from './query/todo';
import { Todo, todoSchema, userSchema, userdata } from './types';

app.get("/user", (req,res)=>{
    const id = Number(req.body.id)
    getUser(id).then((data)=>{
        res.status(200).json(data)
    }).catch(()=>{
        res.send("something went wrong to get user")
    })
})

app.post("/user",(req,res)=>{
    const user : userdata = req.body
    
    const isSafe = userSchema.safeParse(user)

    if(!isSafe){
        res.status(400).json({message: "Please enter valid data"})
    }

    createUser(user).then(({id})=>{

        // if (id) {
        //     res.status(200).json({id,message: "User already created"})
        //     return
        // }
        
        res.status(200).json({id ,message: "User created"})
    }).catch(err=>{
        throw err
    }) 
})

app.get("/todo", (req,res)=>{
    const id = Number(req.query.id)
    
    getTodo(id).then((data)=>{
        res.status(200).json(data)
    }).catch(()=>{
        res.send("something went wrong to get todos")
    })
})

app.post("/todo", (req,res)=>{
    const todo : Todo = req.body
    todo.userId = Number(req.body.userId)
    const isSafe = todoSchema.safeParse(todo)

    if(!isSafe){
        res.status(400).json({message: "Please enter valid data"})
        return;
    }
    
    
    addTodo(todo).then(()=>{
        res.status(200).json({message: "Todo created"})
    }).catch((err)=>{
        console.log(err);
        
        res.send("something went wrong to create todos")
    })
})

app.patch("/todo", (req,res)=>{
    const id = Number(req.body.id)
    console.log(id);
    
    updateTodo(id).then(()=>{
        res.status(200).json({message: "Updated"})
    }).catch(()=>{
        res.status(401).send("something went wrong to update todos")
    })
})

app.listen(3000, ()=>{
    console.log("running");
    
})