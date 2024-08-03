
import { ROLE } from '@prisma/client';
import * as z from 'zod';


export const pentestFormSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  email: z.string().email(),
  
});

 export const editUserSchema= z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    role: z.enum([ ROLE.USER, ROLE.ADMIN]),

  });


  export const deleteUserSchema = z.object({
    id: z.string().uuid(),
  });