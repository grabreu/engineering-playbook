import { mutationOptions } from "@tanstack/react-query";
import { createTodoListFn } from "./server";

export const todoListMutations = {
  create: () =>
    mutationOptions({
      mutationKey: ["todo-lists", "create"],
      mutationFn: (input: { name: string }) =>
        createTodoListFn({
          data: input,
        }),
    }),
};
