import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { api } from "~/lib/api";
import type { MutationConfig } from "~/lib/query";

export const CreateTodoListInputSchema = z.object({
  name: z.string(),
});

const createTodoListFn = createServerFn({ method: "POST" })
  .validator(CreateTodoListInputSchema)
  .handler(async ({ data }) => {
    await api.post("/todo-lists", {
      json: data,
    });
  });

type UseCreateTodoListOptions = {
  mutationConfig?: MutationConfig<typeof createTodoListFn>;
};

export const useCreateTodoList = ({
  mutationConfig,
}: UseCreateTodoListOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ["todo-lists"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTodoListFn,
  });
};
