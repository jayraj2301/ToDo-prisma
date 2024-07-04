import { PrismaClient } from '@prisma/client'
import { Todo } from '../types'

const prisma = new PrismaClient()

export async function getTodo(userId: number) {
  return await prisma.todo.findMany({
    where:{
        userId
    }
  })
}

export async function addTodo(todo:Todo) {
    await prisma.todo.create({
        data:{
            title: todo.title,
            description:todo.description,
            userId:todo.userId,
            done:false
        }
    })
}

export async function updateTodo(todoId: number) {
    await prisma.todo.update({
        where:{
            id:todoId
        },
        data:{
            done: true 
        }
    })
}