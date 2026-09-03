import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { MutationConfig } from "~/lib/query";

export const CreateTodoItemInputSchema = z.object({
  todoListId: z.string(),
  title: z.string(),
});

const createTodoItemFn = createServerFn({ method: "POST" })
  .validator(CreateTodoItemInputSchema)
  .handler(async ({ data }) => {
    await api.post("/todo-items", {
      json: data,
    });
  });

type UseCreateTodoItemOptions = {
  mutationConfig?: MutationConfig<typeof createTodoItemFn>;
};

export const useCreateTodoItem = ({
  mutationConfig,
}: UseCreateTodoItemOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ["todo-items"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTodoItemFn,
  });
};
