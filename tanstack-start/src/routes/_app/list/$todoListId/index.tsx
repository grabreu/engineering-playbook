import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon, SquareIcon, StarIcon, StarPlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { Skeleton } from "~/components/ui/skeleton";
import { useCompleteTodoItem } from "~/features/todo-items/api/complete-todo-item";
import {
  CreateTodoItemInputSchema,
  useCreateTodoItem,
} from "~/features/todo-items/api/create-todo-item";
import {
  getTodoItemsQueryOptions,
  useTodoItems,
} from "~/features/todo-items/api/get-todo-items";
import { useSetTodoItemStarred } from "~/features/todo-items/api/set-todo-item-starred";
import { useTodoList } from "~/features/todo-lists/api/get-todo-lists";

const RouteComponent = () => {
  const params = Route.useParams();

  const todoListQuery = useTodoList({ todoListId: params.todoListId });

  const todoItemsQuery = useTodoItems({
    input: { todoListId: params.todoListId, isCompleted: false },
  });

  const completeTodoItemMutation = useCompleteTodoItem();
  const setTodoItemStarredMutation = useSetTodoItemStarred();

  const [isCreateTodoItemOpen, setIsCreateTodoItemOpen] = useState(false);

  const createTodoItemMutation = useCreateTodoItem({
    mutationConfig: {
      onSuccess: () => {
        setIsCreateTodoItemOpen(false);
        createTodoItemForm.reset();
      },
    },
  });

  const createTodoItemForm = useForm({
    defaultValues: {
      todoListId: params.todoListId,
      title: "",
    },
    validators: {
      onSubmit: CreateTodoItemInputSchema,
    },
    onSubmit: ({ value }) => {
      createTodoItemMutation.mutate({
        data: {
          todoListId: value.todoListId,
          title: value.title,
        },
      });
    },
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{todoListQuery.data?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog
          open={isCreateTodoItemOpen}
          onOpenChange={(open) => {
            setIsCreateTodoItemOpen(open);
            if (!open) {
              createTodoItemForm.reset();
            }
          }}
        >
          <DialogTrigger render={<Button variant="outline" />}>
            <PlusIcon /> Add a task
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                createTodoItemForm.handleSubmit();
              }}
            >
              <DialogHeader>
                <DialogTitle>Add a task</DialogTitle>
              </DialogHeader>
              <FieldGroup className="text-sm gap-4">
                <createTodoItemForm.Field name="title">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </createTodoItemForm.Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <Button type="submit">Done</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardContent>
        <ItemGroup>
          {todoItemsQuery.data.map((item) => (
            <Item key={item.id} variant="outline">
              <ItemMedia variant="icon">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    completeTodoItemMutation.mutate({
                      data: { todoItemId: item.id },
                    })
                  }
                >
                  <SquareIcon />
                </Button>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setTodoItemStarredMutation.mutate({
                      data: { todoItemId: item.id, isStarred: !item.isStarred },
                    })
                  }
                >
                  {item.isStarred ? <StarIcon /> : <StarPlusIcon />}
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

export const Route = createFileRoute("/_app/list/$todoListId/")({
  loader: ({ context, params }) => {
    return context.queryClient.query(
      getTodoItemsQueryOptions({
        todoListId: params.todoListId,
        isCompleted: false,
      }),
    );
  },
  pendingComponent: RoutePendingComponent,
  component: RouteComponent,
});
