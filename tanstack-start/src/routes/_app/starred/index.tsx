import { createFileRoute } from "@tanstack/react-router";
import {
  EllipsisVerticalIcon,
  PlusIcon,
  SquareIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { Skeleton } from "~/components/ui/skeleton";
import {
  getTodoItemsQueryOptions,
  useTodoItems,
} from "~/features/todo-items/api/get-todo-items";

const RouteComponent = () => {
  const todoItemsQuery = useTodoItems({
    input: { isStarred: true, isCompleted: false },
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Starred tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {todoItemsQuery.data.map((item) => (
            <Item key={item.id} variant="outline">
              <ItemMedia variant="icon">
                <Button variant="ghost" size="icon-sm">
                  <SquareIcon />
                </Button>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-sm">
                  <StarIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
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
          {Array.from({ length: 3 }, (_, index) => (
            <Item key={index} variant="outline">
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
  loader: ({ context }) => {
    return context.queryClient.query(
      getTodoItemsQueryOptions({ isStarred: true, isCompleted: false }),
    );
  },
  pendingComponent: RoutePendingComponent,
  component: RouteComponent,
});
