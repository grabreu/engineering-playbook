import { mutationOptions } from "@tanstack/react-query";
import { completeTodoItemFn, createTodoItemFn, starTodoItemFn } from "./server";

export const todoItemMutations = {
  star: () =>
    mutationOptions({
      mutationKey: ["todo-items", "star"],
      mutationFn: (input: { todoItemId: string; isStarred: boolean }) =>
        starTodoItemFn({
          data: input,
        }),
    }),
  complete: () =>
    mutationOptions({
      mutationKey: ["todo-items", "complete"],
      mutationFn: (input: { todoItemId: string }) =>
        completeTodoItemFn({
          data: input,
        }),
    }),
  create: () =>
    mutationOptions({
      mutationKey: ["todo-items", "create"],
      mutationFn: (input: { todoListId: string; title: string }) =>
        createTodoItemFn({
          data: input,
        }),
    }),
};
