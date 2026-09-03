import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { MutationConfig } from "~/lib/query";

const SetTodoItemStarredInputSchema = z.object({
  todoItemId: z.uuid(),
  isStarred: z.boolean(),
});

const setTodoItemStarredFn = createServerFn({ method: "POST" })
  .validator(SetTodoItemStarredInputSchema)
  .handler(async ({ data }) => {
    await api.patch(`/todo-items/${data.todoItemId}/star`, {
      json: { isStarred: data.isStarred },
    });
  });

type UseSetTodoItemStarredOptions = {
  mutationConfig?: MutationConfig<typeof setTodoItemStarredFn>;
};

export const useSetTodoItemStarred = ({
  mutationConfig,
}: UseSetTodoItemStarredOptions = {}) => {
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
    mutationFn: setTodoItemStarredFn,
  });
};
