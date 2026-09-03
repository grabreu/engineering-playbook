import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { api } from "~/lib/api";
import type { QueryConfig } from "~/lib/query";
import type { TodoList } from "~/types/api";

const getTodoListsFn = createServerFn({ method: "GET" }).handler(async () => {
  const response = await api.get("/todo-lists");
  return response.json<TodoList[]>();
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

type UseTodoListOptions = {
  todoListId: string;
  queryConfig?: QueryConfig<typeof getTodoListsQueryOptions>;
};

export const useTodoList = ({
  todoListId,
  queryConfig,
}: UseTodoListOptions) => {
  return useSuspenseQuery({
    ...getTodoListsQueryOptions(),
    ...queryConfig,
    select: (data) => data.find((list) => list.id === todoListId),
  });
};
