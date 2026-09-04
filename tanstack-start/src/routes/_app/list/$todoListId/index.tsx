import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCheckIcon } from "lucide-react";
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
import {
  TodoItemCard,
  TodoItemCreateDialog,
} from "~/features/todo-items/todo-items.components";
import { todoItemQueries } from "~/features/todo-items/todo-items.queries";
import { todoListQueries } from "~/features/todo-lists/todo-lists.queries";

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

export const Route = createFileRoute("/_app/list/$todoListId/")({
  loader: ({ context, params }) => {
    return context.queryClient.query(
      todoItemQueries.list({
        todoListId: params.todoListId,
        isCompleted: false,
      }),
    );
  },
  pendingComponent: RoutePendingComponent,
  component: RouteComponent,
});
