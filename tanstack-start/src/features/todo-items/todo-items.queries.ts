import { queryOptions } from "@tanstack/react-query";
import { getTodoItemsFn } from "./todo-items.functions";

export const todoItemQueries = {
  all: () => ["todo-items"] as const,
  lists: () => [...todoItemQueries.all(), "list"] as const,
  list: (
    input: {
      todoListId?: string;
      isCompleted?: boolean;
      isStarred?: boolean;
    } = {},
  ) =>
    queryOptions({
      queryKey: [...todoItemQueries.lists(), input] as const,
      queryFn: () => getTodoItemsFn({ data: input }),
    }),
};
