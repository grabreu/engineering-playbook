import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { TodoList } from "../types/todo-list";

export const getTodoListsFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const response = await api.get<TodoList[]>("/todo-lists");
  return response.data;
});

export const createTodoListFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      name: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const response = await api.post<TodoList>("/todo-lists", data);
    return response.data;
  });
