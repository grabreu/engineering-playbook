import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { TodoItem } from "../types/todo-item";

export const starTodoItemFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      todoItemId: z.uuid(),
      isStarred: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await api.patch(`/todo-items/${data.todoItemId}/star`, {
      isStarred: data.isStarred,
    });
  });

export const completeTodoItemFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      todoItemId: z.uuid(),
    }),
  )
  .handler(async ({ data }) => {
    await api.patch(`/todo-items/${data.todoItemId}/complete`);
  });

export const getTodoItemsFn = createServerFn({
  method: "GET",
})
  .validator(
    z.object({
      todoListId: z.uuid().optional(),
      isCompleted: z.boolean().optional(),
      isStarred: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const response = await api.get<TodoItem[]>("/todo-items", {
      params: data,
    });
    return response.data;
  });

export const createTodoItemFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      todoListId: z.uuid(),
      title: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const response = await api.post<TodoItem>("/todo-items", data);
    return response.data;
  });
