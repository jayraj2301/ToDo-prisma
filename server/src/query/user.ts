import { PrismaClient } from '@prisma/client'
import { userdata } from '../types'

const prisma = new PrismaClient()

export async function getUser(userId: number) {
  return await prisma.user.findMany({
    where:{
        id: userId
    }
  })
}



export async function createUser({username,email,password}:userdata) {
    const exist = await prisma.user.findUnique({
      where:{
        email
      },
      select: {
        id:true
      }
    })
    if (exist) {
      return exist;
    }
    const d = await prisma.user.create({
        data:{
            username,
            email,
            password
        },
        select:{
          id: true
        }
    })
    return d;
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })