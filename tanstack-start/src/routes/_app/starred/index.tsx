import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CircleStarIcon } from "lucide-react";
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
import { seo } from "~/utils/seo";

const RouteComponent = () => {
  const todoItemsQuery = useSuspenseQuery(
    todoItemQueries.list({
      isCompleted: false,
      isStarred: true,
    }),
  );

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Starred tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {todoItemsQuery.data.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleStarIcon />
              </EmptyMedia>
              <EmptyTitle>No starred tasks</EmptyTitle>
              <EmptyDescription>
                Mark important tasks with a star so you can easily find them
                here
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {todoItemsQuery.data.length > 0 && (
          <ItemGroup>
            {todoItemsQuery.data.map((item) => (
              <TodoItemCard key={item.id} item={item} showUndoOnUnstar />
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
        <CardTitle>Starred tasks</CardTitle>
      </CardHeader>
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

export const Route = createFileRoute("/_app/starred/")({
  head: () => ({
    meta: seo({ title: "Starred · Tasks" }),
  }),
  loader: ({ context }) => {
    return context.queryClient.query(
      todoItemQueries.list({
        isCompleted: false,
        isStarred: true,
      }),
    );
  },
  pendingComponent: RoutePendingComponent,
  component: RouteComponent,
});
