import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { QueryConfig } from "~/lib/query";
import type { TodoItem } from "~/types/api";

const GetTodoItemsInputSchema = z.object({
  todoListId: z.string().optional(),
  isCompleted: z.boolean().optional(),
  isStarred: z.boolean().optional(),
});

type GetTodoItemsInput = z.infer<typeof GetTodoItemsInputSchema>;

const getTodoItemsFn = createServerFn({ method: "GET" })
  .validator(GetTodoItemsInputSchema)
  .handler(async ({ data }) => {
    const response = await api.get("todo-items", {
      searchParams: data,
    });

    return response.json<TodoItem[]>();
  });

export const getTodoItemsQueryOptions = (input: GetTodoItemsInput = {}) => {
  return queryOptions({
    queryKey: ["todo-items", input],
    queryFn: () => {
      return getTodoItemsFn({ data: input });
    },
  });
};

type UseTodoItemsOptions = {
  input?: GetTodoItemsInput;
  queryConfig?: QueryConfig<typeof getTodoItemsQueryOptions>;
};

export const useTodoItems = ({
  input,
  queryConfig,
}: UseTodoItemsOptions = {}) => {
  return useSuspenseQuery({
    ...getTodoItemsQueryOptions(input),
    ...queryConfig,
  });
};
