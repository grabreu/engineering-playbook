import { queryOptions } from "@tanstack/react-query";
import { getTodoListsFn } from "./server";

export const todoListQueries = {
  all: () => ["todo-lists"] as const,
  lists: () => [...todoListQueries.all(), "list"] as const,
  list: () =>
    queryOptions({
      queryKey: todoListQueries.lists(),
      queryFn: () => getTodoListsFn(),
    }),
};
