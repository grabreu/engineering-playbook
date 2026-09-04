import { api } from "~/lib/api";
import type { TodoList } from "./todo-lists.types";

export const getTodoLists = async () => {
  const response = await api.get("/todo-lists");
  return response.json<TodoList[]>();
};

export const createTodoList = async (input: { name: string }) => {
  const response = await api.post("/todo-lists", {
    json: input,
  });
  return response.json<TodoList>();
};
