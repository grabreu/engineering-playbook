import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { MutationConfig, QueryConfig } from "~/lib/query";

type TodoItem = {
  id: string;
  todoListId: string;
  title: string;
  isCompleted: boolean;
};

const todoItemsKeys = {
  all: ["todo-items"] as const,
  list: (input: GetTodoItemsInput = {}) =>
    [...todoItemsKeys.all, input] as const,
};

const GetTodoItemsInputSchema = z.object({
  todoListId: z.string().optional(),
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
    queryKey: todoItemsKeys.list(input),
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

const CompleteTodoItemInputSchema = z.object({
  todoItemId: z.uuid(),
});

const completeTodoItemFn = createServerFn({ method: "POST" })
  .validator(CompleteTodoItemInputSchema)
  .handler(async ({ data }) => {
    await api.patch(`/todo-items/${data.todoItemId}/complete`);
  });

type UseCompleteTodoItemOptions = {
  mutationConfig?: MutationConfig<typeof completeTodoItemFn>;
};

export const useCompleteTodoItem = ({
  mutationConfig,
}: UseCompleteTodoItemOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: todoItemsKeys.all,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: completeTodoItemFn,
  });
};
