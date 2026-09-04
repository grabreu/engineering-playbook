import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import {
  completeTodoItem,
  createTodoItem,
  getTodoItems,
  starTodoItem,
} from "./todo-items.server";

export const starTodoItemFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      todoItemId: z.uuid(),
      isStarred: z.boolean(),
    }),
  )
  .handler(({ data }) => {
    return starTodoItem(data);
  });

export const completeTodoItemFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      todoItemId: z.uuid(),
    }),
  )
  .handler(({ data }) => {
    return completeTodoItem(data);
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
  .handler(({ data }) => {
    return getTodoItems(data);
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
  .handler(({ data }) => {
    return createTodoItem(data);
  });
