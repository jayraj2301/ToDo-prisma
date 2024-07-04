export type Todo = {
  userId: number;
  title: string;
  description: string;
};
export type userdata = {
  username: string;
  email: string;
  password: string;
};

import z from 'zod';

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password:z.string()
})
export const todoSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string()
})