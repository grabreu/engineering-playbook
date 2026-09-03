import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { MutationConfig } from "~/lib/query";

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
        queryKey: ["todo-items"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: completeTodoItemFn,
  });
};
