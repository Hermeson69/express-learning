import { is } from "drizzle-orm";
import * as z from "zod";

export const TodoListCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deliverySchedule: z.string().min(1, "Delivery Schedule is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const TodoListUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  deliverySchedule: z.string().min(1, "Delivery Schedule is required").optional(),
  isCompleted: z.boolean().optional(),
  updatedAt: z.string().optional(),
});

export const TodoListResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  deliverySchedule: z.string(),
  isCompleted: z.boolean(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TodoListCreateInput = z.infer<typeof TodoListCreateSchema>;
export type TodoListUpdateInput = z.infer<typeof TodoListUpdateSchema>;
export type TodoListResponse = z.infer<typeof TodoListResponseSchema>;