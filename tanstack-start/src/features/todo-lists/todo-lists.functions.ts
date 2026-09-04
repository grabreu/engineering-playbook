import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { createTodoList, getTodoLists } from "./todo-lists.server";

export const getTodoListsFn = createServerFn({
  method: "GET",
}).handler(() => {
  return getTodoLists();
});

export const createTodoListFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      name: z.string(),
    }),
  )
  .handler(({ data }) => {
    return createTodoList(data);
  });
