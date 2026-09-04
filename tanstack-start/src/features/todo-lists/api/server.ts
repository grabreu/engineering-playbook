import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { TodoList } from "../types/todo-list";

export const getTodoListsFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const response = await api.get("/todo-lists");
  return response.json<TodoList[]>();
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
    const response = await api.post("/todo-lists", {
      json: data,
    });
    return response.json<TodoList>();
  });
