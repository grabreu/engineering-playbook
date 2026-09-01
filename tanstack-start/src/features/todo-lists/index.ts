import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { api } from "~/lib/api";
import type { QueryConfig } from "~/lib/query";

type TodoList = {
  id: string;
  name: string;
};

const getTodoListsFn = createServerFn({ method: "GET" }).handler(async () => {
  const response = await api.get<TodoList[]>("/todo-lists");
  return response.data;
});

export const getTodoListsQueryOptions = () => {
  return queryOptions({
    queryKey: ["todo-lists"],
    queryFn: () => getTodoListsFn(),
  });
};

type UseTodoListsOptions = {
  queryConfig?: QueryConfig<typeof getTodoListsQueryOptions>;
};

export const useTodoLists = ({ queryConfig }: UseTodoListsOptions = {}) => {
  return useSuspenseQuery({
    ...getTodoListsQueryOptions(),
    ...queryConfig,
  });
};
