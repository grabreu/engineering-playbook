import { createFileRoute } from "@tanstack/react-router";
import { toast } from "~/components/toast";
import {
  getTodoItemsQueryOptions,
  useCompleteTodoItem,
  useTodoItems,
} from "~/features/todo-items";

const RouteComponent = () => {
  const todoItemsQuery = useTodoItems();

  const completeTodoItemMutation = useCompleteTodoItem({
    mutationConfig: {
      onSuccess: () => {
        toast.add({
          title: "Completed todo item, refetching todo items...",
        });
      },
    },
  });

  return (
    <div>
      <h1>My Day</h1>
      <ul>
        {todoItemsQuery.data.map((todoItem) => (
          <li key={todoItem.id}>
            <input
              type="checkbox"
              checked={todoItem.isCompleted}
              onChange={() => {
                completeTodoItemMutation.mutate({
                  data: { todoItemId: todoItem.id },
                });
              }}
            />
            <span>{todoItem.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute("/_app/")({
  loader: async ({ context }) => {
    await context.queryClient.query(getTodoItemsQueryOptions());
  },
  component: RouteComponent,
});
