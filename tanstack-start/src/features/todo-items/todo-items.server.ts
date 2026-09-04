import { api } from "~/lib/api";
import type { TodoItem } from "./todo-items.types";

export const starTodoItem = async (input: {
  todoItemId: string;
  isStarred: boolean;
}) => {
  await api.patch(`/todo-items/${input.todoItemId}/star`, {
    json: { isStarred: input.isStarred },
  });
};

export const completeTodoItem = async (input: { todoItemId: string }) => {
  await api.patch(`/todo-items/${input.todoItemId}/complete`);
};

export const getTodoItems = async (input: {
  todoListId?: string;
  isCompleted?: boolean;
  isStarred?: boolean;
}) => {
  const response = await api.get("/todo-items", {
    searchParams: input,
  });
  return response.json<TodoItem[]>();
};

export const createTodoItem = async (input: {
  todoListId: string;
  title: string;
}) => {
  const response = await api.post("/todo-items", {
    json: input,
  });
  return response.json<TodoItem>();
};
