import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, SquareIcon, StarIcon } from "lucide-react";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { FormModal } from "~/components/ui/form-modal";
import { Input } from "~/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { toast } from "~/components/ui/toast";
import { cn } from "~/utils/cn";
import { todoItemMutations } from "./todo-items.mutations";
import { todoItemQueries } from "./todo-items.queries";
import type { TodoItem } from "./todo-items.types";

type TodoItemCardProps = {
  item: TodoItem;
  showUndoOnUnstar?: boolean;
};

export const TodoItemCard = ({ item, showUndoOnUnstar }: TodoItemCardProps) => {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <TodoItemCompleteButton todoItemId={item.id} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item.title}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <TodoItemStarredButton
          todoItemId={item.id}
          isStarred={item.isStarred}
          showUndoOnUnstar={showUndoOnUnstar}
        />
      </ItemActions>
    </Item>
  );
};

type TodoItemStarredButtonProps = {
  todoItemId: string;
  isStarred: boolean;
  showUndoOnUnstar?: boolean;
};

const TodoItemStarredButton = ({
  todoItemId,
  isStarred,
  showUndoOnUnstar,
}: TodoItemStarredButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.star(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });

      if (showUndoOnUnstar && !variables.isStarred) {
        const toastId = toast.add({
          title: "Task removed from Starred",
          actionProps: {
            children: "Undo",
            onClick() {
              toast.close(toastId);
              mutation.mutate({
                todoItemId: variables.todoItemId,
                isStarred: true,
              });
            },
          },
        });
      }
    },
  });

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() =>
        mutation.mutate({
          todoItemId: todoItemId,
          isStarred: !isStarred,
        })
      }
    >
      <StarIcon
        className={cn(
          isStarred
            ? "fill-foreground text-foreground"
            : "text-muted-foreground",
        )}
      />
    </Button>
  );
};

type TodoItemCompleteButtonProps = {
  todoItemId: string;
};

const TodoItemCompleteButton = ({
  todoItemId,
}: TodoItemCompleteButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.complete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });
      toast.add({
        title: "Task completed",
      });
    },
  });

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() =>
        mutation.mutate({
          todoItemId: todoItemId,
        })
      }
    >
      <SquareIcon />
    </Button>
  );
};

type TodoItemCreateDialogProps = {
  todoListId: string;
};

export const TodoItemCreateDialog = ({
  todoListId,
}: TodoItemCreateDialogProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: z.object({
        title: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate({
        todoListId: todoListId,
        title: value.title,
      });
    },
  });

  return (
    <FormModal
      title="Add a task"
      trigger={
        <Button variant="outline">
          <PlusIcon />
          Add a task
        </Button>
      }
      isDone={mutation.isSuccess}
      onClose={() => form.reset()}
      submit={
        <Button type="submit" form={form.formId} disabled={mutation.isPending}>
          Done
        </Button>
      }
    >
      <form
        id={form.formId}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4 text-sm">
          <form.Field name="title">
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </FormModal>
  );
};
