import * as z from 'zod';

export const UserCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const UserUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});

export const UserResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const UserLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AuthSchema = z.object({
    token: z.string(),
});


export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type AuthResponse = z.infer<typeof AuthSchema>;