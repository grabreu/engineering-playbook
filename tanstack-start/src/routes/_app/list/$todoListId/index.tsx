import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCheckIcon, ListXIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Item, ItemContent, ItemGroup, ItemMedia } from "~/components/ui/item";
import { Skeleton } from "~/components/ui/skeleton";
import { todoItemQueries } from "~/features/todo-items/api/queries";
import { TodoItemCard } from "~/features/todo-items/components/todo-item-card";
import { TodoItemCreateDialog } from "~/features/todo-items/components/todo-item-create-dialog";
import { todoListQueries } from "~/features/todo-lists/api/queries";

const RouteComponent = () => {
  const params = Route.useParams();

  const todoListQuery = useSuspenseQuery({
    ...todoListQueries.list(),
    select: (data) => data.find((list) => list.id === params.todoListId),
  });

  const todoItemsQuery = useSuspenseQuery(
    todoItemQueries.list({
      todoListId: params.todoListId,
      isCompleted: false,
    }),
  );

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{todoListQuery.data?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoItemCreateDialog todoListId={params.todoListId} />
      </CardContent>
      <CardContent>
        {todoItemsQuery.data.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CheckCheckIcon />
              </EmptyMedia>
              <EmptyTitle>No tasks yet</EmptyTitle>
              <EmptyDescription>
                Add your to-dos and keep track of them across Google Workspace
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {todoItemsQuery.data.length > 0 && (
          <ItemGroup>
            {todoItemsQuery.data.map((item) => (
              <TodoItemCard key={item.id} item={item} />
            ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
};

const RoutePendingComponent = () => {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-40" />
      </CardContent>
      <CardContent>
        <ItemGroup>
          {Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((key) => (
            <Item key={key} variant="outline">
              <ItemMedia variant="icon">
                <Skeleton className="size-6 rounded-sm" />
              </ItemMedia>
              <ItemContent>
                <Skeleton className="h-4 w-40" />
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

const RouteNotFoundComponent = () => {
  return (
    <Card className="max-w-2xl">
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListXIcon />
            </EmptyMedia>
            <EmptyTitle>List not found</EmptyTitle>
            <EmptyDescription>
              We couldn't find the list you're looking for. Select one of your
              lists from the sidebar or create a new list.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/_app/list/$todoListId/")({
  loader: async ({ context, params }) => {
    const todoLists = await context.queryClient.query(todoListQueries.list());
    const todoList = todoLists.find((list) => list.id === params.todoListId);

    if (!todoList) {
      throw notFound();
    }

    return context.queryClient.query(
      todoItemQueries.list({
        todoListId: params.todoListId,
        isCompleted: false,
      }),
    );
  },
  pendingComponent: RoutePendingComponent,
  notFoundComponent: RouteNotFoundComponent,
  component: RouteComponent,
});
