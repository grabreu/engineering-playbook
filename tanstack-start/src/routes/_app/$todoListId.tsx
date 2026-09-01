import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getTodoItemsQueryOptions } from "~/features/todo-items";

const RouteComponent = () => {
  const params = Route.useParams();

  const todoItemsQuery = useSuspenseQuery(
    getTodoItemsQueryOptions({
      todoListId: params.todoListId,
    }),
  );

  return (
    <div>
      <h1>Todo Items</h1>
      <ul>
        {todoItemsQuery.data.map((todoItem) => (
          <li key={todoItem.id}>
            <h2>{todoItem.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute("/_app/$todoListId")({
  loader: async ({ context, params }) => {
    await context.queryClient.query(
      getTodoItemsQueryOptions({
        todoListId: params.todoListId,
      }),
    );
  },
  component: RouteComponent,
});
